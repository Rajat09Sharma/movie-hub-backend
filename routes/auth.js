const express = require("express");
const { loginHandler, signupHandler, refreshTokenHandler, logoutHandler } = require("../controllers/auth");
const authMiddleware = require("../middlewares/authMiddleware");


const router = express.Router();

router.post("/login", loginHandler);
router.post("/signup", signupHandler);
router.get("/refresh", refreshTokenHandler);
router.post("/logout", logoutHandler);



module.exports = { authRouter: router }