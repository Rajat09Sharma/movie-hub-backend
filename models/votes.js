const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
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
    vote_type: {
        type: String,
        required: true,
        enum: ["down", "up"]
    }
}, { timestamps: true });

const Vote = mongoose.model("Vote", voteSchema);
module.exports = Vote;
