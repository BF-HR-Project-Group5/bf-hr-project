const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    description: {type:String, required:true}, 
    createdBy: {type:Schema.Types.ObjectId, ref: 'User'},
},{ timestamps: true })

const Comment = mongoose.model("Comment", CommentSchema,"Comment");
module.exports = Comment;