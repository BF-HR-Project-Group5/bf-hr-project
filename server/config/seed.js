const path = require('path');
require('dotenv').config(path.join(__dirname, '../.env'));

const mongoose = require('mongoose');
const { MONGO_URL } = process.env;
const User = require('../models/User');
const Artist = require('../models/Artist');
const Song = require('../models/Song');

const GENRES = ['Rock', 'EDM', 'Country', 'Jazz', 'Metal'];

const LANGUAGES = ['en', 'zh', 'fr', 'es', 'de'];

const USER_COUNT = 5; // and artist count
const SONG_COUNT = 5; // per artist

function getRng(multiplier, additional = 0) {
	return Math.floor(Math.random() * multiplier) + additional;
}

function getRngStartEnd(multiplier, additional = 0) {
	const start = getRng(multiplier, additional);
	const end = getRng(multiplier, additional);
	console.log({ start, end });

	if (start <= end) return [start, end];
	return [end, start];
}

async function run() {
	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect(MONGO_URL);
		console.log('Seed - Connected to DB');

		// clear previous datas:
		await Promise.all(
			[User, Artist, Song].map(async (collection) => await collection.deleteMany({}))
		);

		let allSongIds = [];

		// create datas? user? song? artist?
		for (let i = 0; i < USER_COUNT; i++) {
			console.log(
				`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n    Loop #${i} \n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n`
			);
			// create ARTIST first! Then songs can have artist ID
			const createArtist = await Artist.create({
				name: `Artist${i}`,
			});
			console.log({ createArtist, id: createArtist._id });

			// creating songs for this artist
			const songs = [];
			for (let j = 0; j < SONG_COUNT; j++) {
				let [langNum, genreNum, ...extra] = String(getRng(89999, 10000))
					.split('')
					.map((digit) => {
						digit = Number(digit);
						if (digit > 10) return digit;
						while (digit > 4) digit -= 5;
						return digit;
					});

				// push objects
				songs.push({
					title: `Title${j}`,
					artist: createArtist._id,
					artistName: createArtist.name,
					language: LANGUAGES[langNum],
					genre: GENRES[genreNum],
					likedBy: [],
				});
			}
			// console.log({songs});

			// Now create the user and create all the songs
			const SongPromise = Song.insertMany(songs);
			const UserPromise = User.create({
				username: `User${i}`,
				email: `User${i}@email.com`,
				password: `P4$$w0rd${i}`,
			});

			let [insertManySongs, createUser] = await Promise.allSettled([SongPromise, UserPromise]).then(
				(r) =>
					r.map((each) => {
						console.log({ each });
						return each.value;
					})
			);
			console.log('Songs/User insert/create promise results:', { insertManySongs, createUser });

			// now we have artist, user, and songs

			// updating artist to add the songs
			const songsIds = insertManySongs.map((song) => song._id);
			allSongIds = allSongIds.concat(songsIds);

			const updatedArtist = await Artist.findByIdAndUpdate(
				createArtist._id,
				{ songs: songsIds },
				{ new: true }
			);

			console.log('~~~~~ Artist, ManySongs, and User are created!:', { updatedArtist });
		}

		console.log(
			`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n`
		);
		console.log(
			`Completed creating everything! Now need to update the user and the artists/songs with likes and followedBy!`
		);
		console.log(
			`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n`
		);

		// for the user, we should add likedSongs and followedArtists. Can do this in a separate loop so it's not limited to this artist iteration
		for (let i = 0; i < USER_COUNT; i++) {
			console.log(
				`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n User${i} update - likes/follows \n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n`
			);
			// we have users, need to add songs and artists to the user
			// so want to pick a random artist and some random songs, and update the user with them
			const [artistStart, artistEnd] = getRngStartEnd(USER_COUNT);
			console.log('start should be < end', { artistStart, artistEnd });
			const artistNames = [];
			for (let j = artistStart; j < artistEnd; j++) {
				console.log('artist RNG loop runs:', j);
				artistNames.push(`Artist${j}`);
			}

			// we also need our random songs for this user
			const [songStart, songEnd] = getRngStartEnd(USER_COUNT * SONG_COUNT);
			console.log('start should be < end', { songStart, songEnd });
			const songIds = [];
			for (let j = songStart; j < songEnd; j++) {
				console.log('song RNG loop runs:', j);
				songIds.push(allSongIds[j]);
			}

			console.log(
				'\nRNG for artists/songs:',
				{
					artistNames,
					songIds,
				},
				'\n'
			);

			// trying to find the songs and artists that our RNG points us to:
			const artistsPromise = Artist.find().where('name').in(artistNames);
			const songsPromise = Song.find().where('_id').in(songIds);
			const thisUserPromise = User.findOne({ username: `User${i}` });

			const [foundArtists, foundSongs, foundThisUser] = await Promise.allSettled([
				artistsPromise,
				songsPromise,
				thisUserPromise,
			]).then(([a, s, u]) => {
				// console.log({u});
				return [a.value, s.value, u.value];
			});
			console.log({ foundArtists, foundSongs, foundThisUser });

			// update user with likedSongs and followedArtists
			const updatedThisUserPromise = User.findByIdAndUpdate(
				foundThisUser._id,
				{
					likedSongs: foundSongs,
					followedArtists: foundArtists,
				},
				{ new: true }
			);

			// update list of songs with likes, and likedBy
			const updatedSongPromiseArr = foundSongs.map((song) => {
				const updatedSongPromise = Song.findByIdAndUpdate(
					song._id,
					{
						$push: {
							likedBy: foundThisUser._id,
						},
					},
					{ new: true }
				);
				return updatedSongPromise;
			});

			const updatedArtistPromiseArr = foundArtists.map((artist) => {
				const updatedArtistPromise = Artist.findByIdAndUpdate(
					artist._id,
					{
						$push: { followedBy: foundThisUser },
					},
					{ new: true }
				);
				return updatedArtistPromise;
			});

			const allPromises = [updatedThisUserPromise].concat(
				updatedSongPromiseArr,
				updatedArtistPromiseArr
			);

			const results = await Promise.allSettled(allPromises).then((r) =>
				r.map((each) => each.value)
			);
			console.log('after updating the user likes & follows', { results });
		}

		console.log(
			`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n`
		);
		console.log(
			`Update complete! Now let's just find all and display them to verify everything worked:`
		);
		console.log(
			`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n`
		);

		// just to show everything at the end, get all the stuff: 
		const [foundUsers, foundArtists, foundSongs] = await Promise.allSettled([
			User.find(),
			Artist.find(),
			Song.find(),
		]).then((r) => r.map((each) => each.value));

		console.log({ foundUsers, foundArtists, foundSongs });
		console.log('~~~ Seeding Completed! ~~~');

	} catch (err) {
		console.log('Error seeding db!:', err);

	} finally {
		await mongoose.connection.close();
	}
}

run().catch(console.dir);
