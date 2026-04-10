import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

export default app;
