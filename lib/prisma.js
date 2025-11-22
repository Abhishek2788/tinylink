import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};
let prisma;
if (process.env.NODE_ENV === "production") {
  prisma = prismaClientSingleton();
} else {
  // Prevent multiple instances during hot reload in dev
  if (!global.prisma) {
    global.prisma = prismaClientSingleton();
  }
  prisma = global.prisma;
}

export default prisma;
