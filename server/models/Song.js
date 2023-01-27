const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;
const Artist = require('./Artist');

const SongSchema = new Schema(
	{
		title: { type: String, required: true },
		artist: { type: refType, ref: 'Artist' },
		artistName: { type: String, required: true },
		language: { type: String, required: true },
		genre: { type: String, required: true },
		likedBy: [{ type: refType, ref: 'User' }],
	},
	{ timestamps: true }
);

const Song = mongoose.model('Song', SongSchema, 'Song');

module.exports = Song;
