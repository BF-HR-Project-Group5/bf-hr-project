const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const { app, connection } = require('../server');
const {User, Artist, Song} = require('../models');

const fulfillPromises = async (promises) =>	(Promise.all(promises) || []);

const createManyArtists = async (count) => {
	const list = [];
	const infos = [];
	for (let i = 0; i < count; i++) {
		const artist = {name: `Artist${i}`};
		list.push(Artist.create(artist));
		infos.push(artist);
	}
	return [ await fulfillPromises(list),  infos];
};

const createManyUsers = async (count) => {
	const list = [];
	const infos = [];
	for (let i = 0; i < count; i++) {
		const user = {
			username: `User${i}`,
			email: `emailUser${i}@gmail.com`,
			password: `P4$$w0rd${i}`,
		};
		list.push(User.create(user));
		infos.push(user);
	}
	return [ await fulfillPromises(list),  infos];
};

const GENRES = ['Rock', 'EDM', 'Country', 'Jazz', 'Metal'];

const LANGUAGES = ['en', 'zh', 'fr', 'es', 'de'];

const createManySongs = async (count, artists, users) => {
	const list = [];
	const infos = [];
	for (let i = 0; i < count; i++) {
		const thisArtist = artists[i % artists.length] ?? {};
		const thisUser = users[i %users.length] ?? {};
		const song = {
			title: `Song${i}`,
			language: LANGUAGES[i % 5],
			genre: GENRES[i % 5],
			artistName: thisArtist?.name,
			artist: thisArtist?._id,
			likes: 0,
			likedBy: [thisUser?._id],
		};
		list.push(Song.create(song));
		infos.push(song);
	}
	return [await fulfillPromises(list), infos];
};

chai.use(chaiHttp);

module.exports = { chai, expect, app, connection, User, Artist, Song, createManyArtists, createManyUsers, createManySongs, GENRES, LANGUAGES, fulfillPromises };
