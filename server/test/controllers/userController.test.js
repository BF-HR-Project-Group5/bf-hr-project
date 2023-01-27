const { chai, expect, app, connection, User } = require('../config');

describe('Testing userController', () => {
	const testUser = {
		username: 'test1',
		email: 'test1@gmail.com',
		password: 'P4$$w0rd',
	};

	let user;
	let jwt;

	beforeAll(async () => {
		console.log('before:');
		await User.deleteMany();
		console.log('Users deleted!');
		user = await User.create(testUser);
		const res = await chai.request(app).post('/user/login').send(testUser);
		const cookies = res.headers['set-cookie'];
		jwt = cookies[0].split('; ')[0].split('=')[1];
	});
	
	// get liked songs (requires user)
	describe('GET /user/songs: get liked songs of user', () => {
		it('Should not allow getting likes if not logged in. Expect error message and status 400.', async () => {
			const res = await chai.request(app).get('/user/songs').send();
			expect(res).to.have.status(401);
		});

		it('Should allow getting likes if logged in. Expect success message and status 200.', async () => {
			const res = await chai.request(app).get('/user/songs').set('Cookie', `jwt=${jwt}`).send();
			expect(res).to.have.status(200);
			expect(res.body.likedSongs.length).to.equal(0);
		});
	});

	// get user (requires user)
	describe('GET /user', () => {
		it('Should not allow getting user profile if not logged in. Expect error message and status 400.', async () => {
			const res = await chai.request(app).get('/user').send();
			expect(res).to.have.status(401);
		});

		it('Should allow getting user if logged in. Expect success message and status 200.', async () => {
			const res = await chai.request(app).get('/user').set('Cookie', `jwt=${jwt}`).send();

			const foundUser = await User.findOne({email: testUser.email});
			expect(res).to.have.status(200);
			expect(JSON.stringify(res.body.user)).to.equal(JSON.stringify(foundUser));
		});
	});

	// put edit info (requires user)
	describe('PUT /user/info', () => {
		it('Should not allow putting user profile edit if not logged in. Expect error message and status 400.', async () => {
			const res = await chai.request(app).put('/user/info').send();
			expect(res).to.have.status(401);
		});

		it('Should allow putting user profile edit if logged in. Expect success message and status 202.', async () => {
			const foundUser = await User.findOne({email: testUser.email});
			const newUserData = {
				username: 'newTest1',
				oldPassword: testUser.password,
			};
			const res = await chai.request(app).put('/user/info').set('Cookie', `jwt=${jwt}`).send(newUserData);

			const cookies = res.headers['set-cookie'];
			const newJwt = cookies[0].split('; ')[0].split('=')[1];
			// console.log('should have new JWT cookie:', {cookies});
			// console.log({newJwt});

			expect(res).to.have.status(202);
			expect(res.body.message).to.equal('Success saving user!');
			expect(res.body.user.username).to.equal(newUserData.username);
			expect(res.body.user.password).to.equal(foundUser.password);
			expect(res.body.user._id).to.equal(foundUser._id.toString());
			expect(newJwt).to.not.equal(jwt);
		});
	});

	afterAll(() => connection.close()); // mocha
});

