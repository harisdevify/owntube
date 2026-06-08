# Prisma ORM Setup with PostgreSQL (JavaScript)

## 1. Project Initialize karo

```bash
mkdir my-project
cd my-project
npm init -y
```

---

## 2. Dependencies Install karo

```bash
npm install prisma --save-dev
npm install @prisma/client @prisma/adapter-pg pg dotenv
```

---

## 3. Prisma Initialize karo

```bash
npx prisma init --datasource-provider postgresql
```

---

## 4. `.env` file update karo

```env
DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"
```

---

## 5. Schema Define karo

`prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

---

## 6. Migration Run karo

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## 7. Prisma Client Setup karo

`src/lib/prisma.js`:

```javascript
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export { prisma };
```

---

## 8. Query Likho

`src/index.js`:

```javascript
import { prisma } from "./lib/prisma.js";

async function main() {
  // Create
  const user = await prisma.user.create({
    data: {
      name: "Ali",
      email: "ali@example.com",
      posts: {
        create: { title: "Pehla Post", published: true },
      },
    },
    include: { posts: true },
  });
  console.log("User bana:", user);

  // Read
  const allUsers = await prisma.user.findMany({ include: { posts: true } });
  console.log("Sare users:", allUsers);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

---

## 9. Run karo

```bash
node src/index.js
```

---

## Useful Commands

| Command                  | Kaam                               |
| ------------------------ | ---------------------------------- |
| `npx prisma studio`      | Visual DB editor                   |
| `npx prisma migrate dev` | Naya migration banao               |
| `npx prisma generate`    | Client regenerate karo             |
| `npx prisma db push`     | Migration ke bina schema push karo |

---

## Common Queries

```javascript
// Update
await prisma.user.update({ where: { id: 1 }, data: { name: "Bilal" } });

// Delete
await prisma.user.delete({ where: { id: 1 } });

// Filter
await prisma.post.findMany({ where: { published: true } });
```
