import { prisma } from "./lib/prisma";

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "yaseen",
      email: "yaseen@gmail.com",
    },

    include: {
      posts: true,
    },
  });
  console.log("Created user:", user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
