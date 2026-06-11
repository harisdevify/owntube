import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { errorHandler } from "./middlewares/error.middleware.js";
import userRoutes from "./routes/user.route.js";
const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// hello world test
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// user routes
app.use("/api/v1/users", userRoutes);

// global error
app.use(errorHandler);

export { app };
