const express = require("express");
const { fetcheCommentsByIdHandler, addCommentOnMovieHandler, editCommentOnMovieHandler, deleteCommentOnMovieHandler } = require("../controllers/comment");
const authMiddleware = require("../middlewares/authMiddleware");
const userRoleMiddleware = require("../middlewares/userRoleMiddleware");


const router = express.Router();

router.get("/:movieId", authMiddleware, fetcheCommentsByIdHandler);
router.post("/:movieId", authMiddleware, userRoleMiddleware, addCommentOnMovieHandler);
router.patch("/:id", authMiddleware, userRoleMiddleware, editCommentOnMovieHandler);
router.delete("/:id", authMiddleware, deleteCommentOnMovieHandler);


module.exports = { commentRouter: router }