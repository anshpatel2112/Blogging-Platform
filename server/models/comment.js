import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    blog: {type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true},
    name:  { type: String, required: true },
    content: { type: String, required: true },
    isApproved: { type: Boolean, default: false }, //whenever new comment will be posted by default it will be unapproved we have to approved it from admin dashboard
},{timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;