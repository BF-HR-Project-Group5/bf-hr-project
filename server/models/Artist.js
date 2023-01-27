const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;
const User = require('./User');
const Song = require('./Song');

const ArtistSchema = new Schema(
	{
		name: { type: String, required: true },
		songs: [{ type: refType, ref: 'Song' }],
		followedBy: [{ type: refType, ref: 'User' }],
	},
	{ timestamps: true }
);


const Artist = mongoose.model('Artist', ArtistSchema, 'Artist');

module.exports = Artist;
