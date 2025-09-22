
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../models/token");


const accessTokenSecretKey = process.env.JWT_ACCESSTOKEN_KEY;
const refreshTokenSecretKey = process.env.JWT_RERESHTOKEN_KEY;

const loginHandler = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {

        const storedUser = await User.findOne({ email });
        if (!storedUser) {
            return res.status(401).json({ message: "Email addres does not exists." });
        }
        const match = await bcrypt.compare(password, storedUser.password);
        if (!match) {
            return res.status(401).json({ message: "Incorrect Password" });
        }

        const accessToken = jwt.sign({
            id: storedUser._id,
            email: storedUser.email,
            role: storedUser.role
        }, accessTokenSecretKey, { expiresIn: "15m" });

        const refreshToken = jwt.sign({
            id: storedUser._id,
            email: storedUser.email,
            role: storedUser.role
        }, refreshTokenSecretKey, { expiresIn: "30m" });

        await Token.create({ token: refreshToken });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        return res.status(200).json({ message: "User logined successfully.", token: accessToken, user_id: storedUser._id, role: storedUser.role });

    } catch (error) {
        console.log("Login handler eror", error);
        return res.status(500).json({ message: "Serveer error, Failed to login the user." });
    }
}

const signupHandler = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User Already exist." });
        }

        const hashPass = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashPass });

        res.status(201).json({ message: "User created successfully." });

    } catch (error) {
        console.log("signup handler eror", error);
        return res.status(500).json({ message: "Serveer error, Failed to signup the user." });
    }
}


const refreshTokenHandler = async (req, res) => {
    const token = req.cookies?.refreshToken;
    if (!token) {
        return res.status(401).json({ message: "No token provided." });
    }

    try {

        const refreshToken = await Token.findOne({ token });
        if (!refreshToken) {
            return res.status(401).json({ message: "Invalid token." })
        }
        const verifiedToken = jwt.verify(token, refreshTokenSecretKey);

        const accessToken = jwt.sign({
            id: verifiedToken.id,
            email: verifiedToken.email,
            role: verifiedToken.role
        }, accessTokenSecretKey);

        return res.status(200).json({ message: "Token refreshed successfully.", token: accessToken, user_id: verifiedToken.id, role: verifiedToken.role });

    } catch (error) {
        console.log("Refresh token handler eror", error);
        return res.status(500).json({ message: "Invalid or expired refresh token" });

    }
}

const logoutHandler = async (req, res) => {
    const token = req.cookies?.refreshToken;
    if (!token) {
        return res.status(401).json({ message: "No token provided." });
    }
    try {
        await Token.deleteOne({ token });
        return res.status(200).json({ message: "User logout successfully." })
    } catch (error) {
        console.log("Logout handler eror", error);
        return res.status(500).json({ message: "Server error, failed to logout the user." });
    }
}

module.exports = {
    loginHandler,
    signupHandler,
    refreshTokenHandler,
    logoutHandler
}