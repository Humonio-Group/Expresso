import type { IBackUser, IUser, IUserCreate } from "~/types/users";
import prisma from "~/prisma";
import type { Prisma } from "@prisma/client";
import crypt from "argon2";
import { ConflictError, EntityNotFoundError, InternalError, UnauthorizedError } from "~/types/errors";

export function sanitize(user: IBackUser): IUser {
  const json = { ...user } as Partial<IBackUser>;
  delete json.password;
  return json as IUser;
}

export async function create(data: IUserCreate): Promise<IUser> {
  try {
    return sanitize(await prisma.user.create({
      data: {
        ...data,
        password: await crypt.hash(data.password),
      },
    }));
  }
  catch (e) {
    switch ((e as Prisma.PrismaClientKnownRequestError).code) {
      case "P2002": throw new ConflictError();
      default: throw new InternalError();
    }
  }
}

export async function comparePasswords(email: string, password: string): Promise<IUser> {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) throw new EntityNotFoundError(`"${email}" not found!`);
  if (!await crypt.verify(user.password, password)) throw new UnauthorizedError("Wrong credentials!");

  return sanitize(user);
}

export async function findByMail(email: string): Promise<IUser> {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) throw new EntityNotFoundError(`"${email}" not found!`);
  return sanitize(user);
}

export async function findById(id: number): Promise<IUser> {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) throw new EntityNotFoundError(`"${id}" not found!`);
  return sanitize(user);
}
