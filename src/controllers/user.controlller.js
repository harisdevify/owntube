import { prisma } from "../lib/prisma";
import { apiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";

const getAllUsers = asyncHandler(async (req, res) => {
  const user = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });

  res.json(user);
});

const getUserById = asyncHandler(async (req, res) => {
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

const getError = asyncHandler(async () => {
  throw new apiError(404, "database connection faild!");
});

export { getAllUsers, getError, getUserById };
