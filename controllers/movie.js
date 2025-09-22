const Movie = require("../models/movies");
const Vote = require("../models/votes");


const fetchAllMoviesHandler = async (req, res) => {
    try {
        const movies = await Movie.find().populate("user_id", "name email").sort({ createdAt: -1 });
        return res.status(200).json({ message: "Movies are fetched successfully.", movies });

    } catch (error) {
        console.log("Fetch all movies handler error", error);
        return res.status(500).json({ message: "Server error, Failed to fetch the movies." });
    }
}

const fetchMovieByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findOne({ _id: id }).populate("user_id", "name email");
        
        return res.status(200).json({ message: "Movie fetched successfully.", movie });

    } catch (error) {
        console.log("Fetch movie bt id handler error", error);
        return res.status(500).json({ message: "Server error, Failed to fetch the movie." });
    }
}

const createMovieHandler = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {

        const movie = await Movie.create({ title, description, user_id: req.user.id });
        return res.status(201).json({ message: "Movie created successfully.", movie });

    } catch (error) {
        console.log("create  movie handler error", error);
        return res.status(500).json({ message: "Server error, Create the movies." });
    }
}


const deleteMovieHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteMovie = await Movie.deleteOne({ _id: id });
        return res.status(200).json({ message: "Movie deleted successfully." });
    } catch (error) {
        console.log("Delete movie handler error", error);
        return res.status(500).json({ message: "Server error, Failed to delete the movie." });
    }
}

module.exports = {
    fetchAllMoviesHandler,
    fetchMovieByIdHandler,
    createMovieHandler,
    deleteMovieHandler,
}