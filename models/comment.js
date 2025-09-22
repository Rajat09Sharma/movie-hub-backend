const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        reuired: true,
        ref: "User"
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Movie"
    },
    body: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
