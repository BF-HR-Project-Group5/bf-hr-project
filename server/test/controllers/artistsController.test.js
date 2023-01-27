// const { it } = require( 'mocha' );
const { chai, expect, app, connection, User, Artist, fulfillPromises } = require('../config');

describe('Testing artistsController', () => {
	const testUser = {
		username: 'test1',
		email: 'test1@gmail.com',
		password: 'P4$$w0rd',
	};
	const testArtist = {
		name: 'Artist1',
	};
	let artist;
	let user;
	let jwt;

	beforeAll(async () => {
		await User.deleteMany();
		console.log('Users deleted!');
		[user, artist] = await fulfillPromises([User.create(testUser), Artist.create(testArtist)]);
		console.log({ artist, user });

		// getting a auth JWT to use later
		const loginRes = await chai.request(app).post(`/user/login`).send(testUser);
		const cookies = loginRes.headers['set-cookie'];
		jwt = cookies[0].split('; ')[0].split('=')[1];
	});

	describe('PUT /artists/:id: follow an artist', () => {
		it('Should prevent following when not logged in. Expect error message and status 401.', async () => {
			const res = await chai.request(app).put(`/artists/${artist._id}`).send();
			expect(res).to.have.status(401);
			expect(res.body.message).to.equal('Not logged in!');
		});

		it('Should allow following when logged in. Expect success message and status 202.', async () => {
			const res = await chai
				.request(app)
				.put(`/artists/${artist._id}`)
				.set('Cookie', `jwt=${jwt}`)
				.send();
			expect(res).to.have.status(202);
		});

		it('Should allow UNfollowing when logged in. Expect success message and status 202.', async () => {
			const res = await chai
				.request(app)
				.put(`/artists/${artist._id}`)
				.set('Cookie', `jwt=${jwt}`)
				.send();
			console.log('res from follow artist:', { body: res.body });
			expect(res).to.have.status(202);
		});
	});

	afterAll(() => connection.close()); //jest
});
