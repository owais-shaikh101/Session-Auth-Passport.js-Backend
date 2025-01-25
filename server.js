import dotenv from "dotenv";
dotenv.config();
import express from "express";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import StatusCodes from "http-status-codes";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./db/connection.js";
import User from "./models/user.js";
import userRoutes from "./routes/users.js";
import {
  errorHandlingMiddleware,
  notFoundError,
} from "./middlewares/errorHandler.js";

const db = mongoose.connection;
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.set("trust proxy", 1);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(
  session({
    secret: "your secret key",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongoUrl: db.client.s.url }),
  })
);

const strategy = new LocalStrategy(User.authenticate());

passport.use(strategy);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).send("Hello World!");
});

app.use("/users", userRoutes);
app.use(errorHandlingMiddleware);
app.use(notFoundError);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
