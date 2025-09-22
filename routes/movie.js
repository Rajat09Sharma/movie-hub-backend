const express = require("express");
const { fetchAllMoviesHandler, fetchMovieByIdHandler, createMovieHandler, deleteMovieHandler } = require("../controllers/movie");
const authMiddleware = require("../middlewares/authMiddleware");
const userRoleMiddleware = require("../middlewares/userRoleMiddleware");
const adminRoleMiddleware = require("../middlewares/adminRoleMiddleware");

const router = express.Router();

router.get("/", authMiddleware, fetchAllMoviesHandler);
router.get("/:id", authMiddleware, fetchMovieByIdHandler);
router.post("/", authMiddleware, userRoleMiddleware, createMovieHandler);
router.delete("/:id", authMiddleware, adminRoleMiddleware, deleteMovieHandler);


module.exports = { moviesRouter: router }