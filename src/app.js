import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { prisma } from "./lib/prisma.ts";
import { hasPublishedPost } from "./middlewares/hasPublishedPost.js";
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

app.get("/api/v1/users/:id", hasPublishedPost, async (req, res) => {
  const userId = Number(req.params.id);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      posts: true,
    },
  });

  res.json(user);
});
export { app };
