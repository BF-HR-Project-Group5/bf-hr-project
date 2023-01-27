const { chai, expect, app, connection, User } = require('../config');

describe('Testing authController', () => {
	const testUser = {
		username: 'test1',
		email: 'test1@gmail.com',
		password: 'P4$$w0rd',
	};
	const anotherUser = {
    username: "some",
    email: "someemail@email.com",
    password: "P4$$w0rd",
	}

	beforeAll(async () => {
		console.log('before:');
		await User.deleteMany();
		console.log('Users deleted!');
	});
	
	describe('POST /user/register: creating accounts', () => {
		it('Should not already exist, will exist after creating/registering. Expect success message and status 201.', async () => {
			const userNotFound = await User.findOne({ email: testUser.email });
			expect(userNotFound).to.be.null;

			const res = await chai.request(app).post('/user/register').send(testUser);
			expect(res).to.have.status(201);
			expect(res.body.user.email).to.equal(testUser.email);
			expect(res.body.user.username).to.equal(testUser.username);
		});

		it('Should already exist, will not allow creation of duplicate account. Expect error message and status 409.', async () => {
			const foundUser = await User.findOne({ email: testUser.email });
			expect(foundUser).to.exist;

			const res = await chai.request(app).post('/user/register').send(testUser);
			expect(res).to.have.status(409);
			expect(res.body.message).to.equal('createUser: Email already taken');
		});
	});

	describe('POST /user/login: logging in', () => {
		it('Should not allow login with non-existent user. Expect error message and status 400.', async () => {
			const foundUser = await User.findOne({ email: anotherUser.email });
			expect(foundUser).to.be.null;

			const res = await chai.request(app).post('/user/login').send(anotherUser);
			expect(res).to.have.status(400);
			expect(res.body.message).to.equal('login: Failed, user not found!');
		});

		it('Should allow login with existing user. Expect success message and status 200.', async () => {
			//
			const foundUser = await User.findOne({ email: testUser.email });
			expect(foundUser).to.exist;

			const res = await chai.request(app).post('/user/login').send(testUser);
			expect(res).to.have.status(200);
			expect(res.body.user.email).to.equal(testUser.email);
			expect(res.body.user.username).to.equal(testUser.username);
		});
	});

	describe('POST /user/logout: logout from account', () => {
		it('Should allow logout. Should return success message and status 200.', async () => {
			const foundUser = await User.findOne({ email: testUser.email });
			expect(foundUser).to.exist;

			// log in
			const res = await chai.request(app).post('/user/login').send(testUser);
			expect(res).to.have.status(200);
			expect(res.body.user.email).to.equal(testUser.email);
			expect(res.body.user.username).to.equal(testUser.username);

			const cookies = res.headers['set-cookie']
			const jwt = cookies[0].split('; ')[0].split('=')[1];

			// log out
			const logoutRes = await chai.request(app).get('/user/logout').set('Cookie', `jwt=${jwt}`).send();
			
			expect(logoutRes).to.have.status(200);
			expect(logoutRes.body.message).to.equal('logout success!');
		});
	});

	afterAll(() => connection.close()); // mocha
});