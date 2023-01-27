// const { it } = require( 'mocha' );
const {
	chai,
	expect,
	app,
	connection,
	User,
	Artist,
	Song,
	createManyArtists,
	createManyUsers,
	createManySongs,
	fulfillPromises,
} = require('../config');

describe('Testing songsController', () => {
	let jwt;

	let artists = [];
	let artistInfos = [];
	let users = [];
	let userInfos = [];
	let songs = [];
	let songInfos = [];

	beforeAll(async () => {
		console.log('before:');
		await Promise.allSettled([User.deleteMany(), Artist.deleteMany(), Song.deleteMany()]);
		console.log('Users deleted!');
		[[users, userInfos], [artists, artistInfos]] = await fulfillPromises([
			createManyUsers(5),
			createManyArtists(5),
		]);
		[songs, songInfos] = await createManySongs(15, artists, users);
		console.log({ artists, users, songs });

		// log in with user 0
		const res = await chai.request(app).post('/user/login').send(userInfos[0]);
		const cookies = res.headers['set-cookie'];
		jwt = cookies[0].split('; ')[0].split('=')[1];
	});

	// GET  /songs?query (requires user?)
	describe('GET /songs?query: get filtered songs without and with JWT token', () => {
		it('Should prevent route if not logged in. Expect error message and status 401.', async () => {
			const res = await chai.request(app).get(`/songs`).send();
			expect(res).to.have.status(401);
			expect(res.body.message).to.equal('Not logged in!');
		});

		it('search=song0: Should filter songs by song title and artist name. Expect success message and status 200.', async () => {
			// try getting songs with query with using JWT token
			const res = await chai
				.request(app)
				.get('/songs?search=song0')
				.set('Cookie', `jwt=${jwt}`)
				.send();
			expect(res).to.have.status(200);
			expect(res.body.foundSongs[0].title).to.equal(songInfos[0].title);
			expect(res.body.foundSongs.length).to.equal(1);
		});
	});

	// GET /songs/all
	describe('GET /songs/all: get all songs', () => {
		it('Should return all songs. Expect success message and status 200.', async () => {
			const res = await chai.request(app).get('/songs/all').send();
			expect(res).to.have.status(200);
			expect(res.body.allSongs.length).to.equal(15);
		});
	});

	// PUT /songs/:id (requires user)
	describe('PUT /songs/:id: put like to a song from a user without and with a JWT', () => {
		it('Should fail if not logged in. Expect error message and status 401.', async () => {
			const res = await chai.request(app).put(`/songs/${songs[0]._id}`).send();
			expect(res).to.have.status(401);
			expect(res.body.message).to.equal('Not logged in!');
		});

		it('Should succeed if logged in. Expect success message and status 200.', async () => {
			const res = await chai
				.request(app)
				.put(`/songs/${songs[0]._id}`)
				.set('Cookie', `jwt=${jwt}`)
				.send();

			expect(res).to.have.status(202);
			expect(res.body.user.username).to.equal(users[0].username);
			expect(res.body.user.email).to.equal(users[0].email);
			expect(res.body.user.likedSongs.length).to.equal(1);

			expect(res.body.song.title).to.equal(songs[0].title);
			expect(res.body.song.likedBy.length).to.equal(1);
		});

		it('Should allow a user to unlike a liked song. Expect success message and status 200.', async () => {
			const res = await chai
				.request(app)
				.put(`/songs/${songs[0]._id}`)
				.set('Cookie', `jwt=${jwt}`)
				.send();

			expect(res).to.have.status(202);
			expect(res.body.user.username).to.equal(users[0].username);
			expect(res.body.user.email).to.equal(users[0].email);
			expect(res.body.user.likedSongs.length).to.equal(0);

			expect(res.body.song.title).to.equal(songs[0].title);
			expect(res.body.song.likedBy.length).to.equal(0);
		});
	});

	afterAll(() => connection.close());
});
