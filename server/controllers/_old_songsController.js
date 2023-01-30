// const User = require('../models/User');
// const Song = require('../models/Song');
// const Artist = require('../models/Artist');
const transactionService = require('../services/_old_transactionService');
const songService = require('../services/_old_/_old_songService');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');

const valuesToRegex = (obj) =>
	Object.fromEntries(Object.entries(obj).map(([key, val]) => [key, new RegExp(val, 'i')]));

const getSongsQuery = catchAsync(async (req, res) => {
	console.log('get songs by query:', { reqUser: req.user, query: req.query });
	const picked = pick(req.query, ['search', 'genre', 'language']);
	const filter = valuesToRegex(picked);

	console.log({ filter });
	const promises = [];
	let songFilter, songArtistFilter;

	if (filter.search) {
		// we need to change "search" to "name"/"title" in our filters
		songFilter = {
			...filter,
			title: filter.search,
		};
		delete songFilter.search;

		songArtistFilter = {
			...filter,
			artistName: filter.search,
		};
		delete songArtistFilter.search;

		console.log({ before: filter, song: songFilter, songArtist: songArtistFilter });

		promises.push(songService.querySongs(songFilter, {}));
		promises.push(songService.querySongs(songArtistFilter, {}));
	} else {
		// query and push to promises
		console.log('no "search":', { filter });
		promises.push(songService.querySongs(filter, {}));
	}

	const results = await Promise.allSettled(promises).then((p) => p.map((each) => {
		console.log('thisSong:', each.value);
		return each.value;
	}));
	console.log( results );

	const finalSongList = [...results[0], ...(results[1] ?? [])];

	const uniqueSongs = [...new Set(finalSongList)];
	console.log('Should be unique set of all found songs:', { uniqueSongs });
	return res.status(200).send({ foundSongs: uniqueSongs });
});

const getAllSongs = catchAsync(async (req, res) => {
	const allSongs = await songService.querySongs({}, {});
	return res.status(200).send({allSongs});
})

const putSongsLike = catchAsync(async (req, res) => {
	console.log('\nput like to song:', { reqUser: req.user });
	const userId = req.user._id;
	const songId = req.params.songId;
	const { user, song } = await transactionService.getUserAndSongById(userId, songId);

	const isSongLiked = user.likedSongs.includes(songId);
	const results = isSongLiked
		? await transactionService.unlikeSongTransaction(user, song)
		: await transactionService.likeSongTransaction(user, song);

	return res.status(202).send({ user: results.user, song: results.song });
});

module.exports = {
	putSongsLike,
	getSongsQuery,
	getAllSongs,
};
