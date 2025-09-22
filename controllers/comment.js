const Comment = require("../models/comment");


const fetcheCommentsByIdHandler = async (req, res) => {
    const { movieId } = req.params;
    try {
        const comments = await Comment.find({ movie_id: movieId }).populate("user_id","name email").sort({ createdAt: -1 });
        return res.status(200).json({ message: "All comments are fetched successfully.", comments });
    } catch (error) {
        console.log("Fetche all comments handler error", error);
        return res.status(500).json({ message: "Server error, Failed to add comment on the movies." });
    }
}

const addCommentOnMovieHandler = async (req, res) => {

    // this id is of movie
    const { movieId } = req.params;
    const { body } = req.body;
    if (!body) {
        return res.status(400).json({ message: "No comment sent." });
    }

    try {
        const comment = await Comment.create({ user_id: req.user.id, movie_id: movieId, body });
        return res.status(201).json({ message: "Comment added successfully.", comment });
    } catch (error) {
        console.log("Comment on movie handler", error);
        return res.status(500).json({ message: "Server error, Failed to add comment on the movies." });
    }
}


const editCommentOnMovieHandler = async (req, res) => {

    const { id } = req.params;
    const { body } = req.body;
    if (!body) {
        return res.status(400).json({ message: "No comment sent." });
    }

    try {
        const comment = await Comment.findOneAndUpdate({ _id: id }, { $set: { body: body } });
        return res.status(201).json({ message: "Commented edited successfully.", comment });
    } catch (error) {
        console.log("Edit comment on movie handler", error);
        return res.status(500).json({ message: "Server error, Failed to edit comment on the movies." });
    }
}


const deleteCommentOnMovieHandler = async (req, res) => {

    const { id } = req.params;
    try {
        const comment = await Comment.deleteOne({ _id: id });
        return res.status(200).json({ message: "Comment deleted successfully.", comment });
    } catch (error) {
        console.log("Delete comment on movie handler", error);
        return res.status(500).json({ message: "Server error, Failed to delete comment on the movies." });
    }
}

module.exports = {
    fetcheCommentsByIdHandler,
    addCommentOnMovieHandler,
    editCommentOnMovieHandler,
    deleteCommentOnMovieHandler
}

