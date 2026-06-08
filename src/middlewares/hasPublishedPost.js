import { prisma } from "../lib/prisma.ts";

async function hasPublishedPost(req, res, next) {
  const userId = Number(req.params.id);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      posts: true,
    },
  });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  const PublishedPost = user?.posts.some((post) => {
    return post.published === true;
  });

  if (!PublishedPost) {
    return res.status(403).json({
      message: "User has no published posts",
    });
  }

  next();
}

export { hasPublishedPost };
