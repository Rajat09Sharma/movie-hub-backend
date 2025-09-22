const Vote = require("../models/votes");
const vote = require("../routes/vote");


const addVoteOnMovieHandler = async (req, res) => {
    const { movieId } = req.params;
    const { voteType } = req.body;
    if (!voteType) {
        return res.status(400).json({ message: "Vote is required." });
    }
    try {

        const userVote = await Vote.findOne({ movie_id: movieId, user_id: req.user.id });
        let vote;
        if (userVote) {
            vote = await Vote.findByIdAndUpdate({ _id: userVote._id }, { vote_type: voteType });
        } else {
            vote = await Vote.create({ vote_type: voteType, user_id: req.user.id, movie_id: movieId });
        }
        return res.status(200).json({ message: "Vote added sucessfully.", vote });
    } catch (error) {
        console.log("vote on movie handler error", error);
        return res.status(201).json({ message: "Server error, failed to add vote on the movie." })

    }
}

module.exports = {
    addVoteOnMovieHandler,
}