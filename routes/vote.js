const express = require("express");
const { addVoteOnMovieHandler } = require("../controllers/vote");
const authMiddleware = require("../middlewares/authMiddleware");
const userRoleMiddleware = require("../middlewares/userRoleMiddleware");


const router = express.Router();

router.post("/:movieId", authMiddleware, userRoleMiddleware, addVoteOnMovieHandler);


module.exports = { voteRouter: router };