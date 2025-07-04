import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {}

main()
  .then(() => client.$disconnect())
  .catch(() => {
    client.$disconnect();
    process.exit(1);
  });
