require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { authRouter } = require("./routes/auth");
const { moviesRouter } = require("./routes/movie");
const { commentRouter } = require("./routes/comment");
const { voteRouter } = require("./routes/vote");
const connectDB = require("./config/db");


const app = express();
const PORT = process.env.PORT || 3000;

//db connect
connectDB();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true
}));


//routes
app.use("/auth", authRouter);
app.use("/movie", moviesRouter);
app.use("/comment", commentRouter);
app.use("/vote", voteRouter);


app.listen(PORT, () => {
    console.log(`Server started successfully on the port:${PORT}.`);

})