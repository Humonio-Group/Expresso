import type { ISession, SessionKey } from "~/types/sessions";
import prisma from "~/prisma";
import type { IUser } from "~/types/users";
import { EntityNotFoundError, UnauthorizedError } from "~/types/errors";
import * as users from "./users";

export const expiresIn = 24 * 60 * 60;

export async function create(userId: number): Promise<ISession> {
  return prisma.session.create({
    data: {
      userId,
      expiresAt: new Date(Date.now() + expiresIn * 1000),
    },
  });
}

export async function revoke(key: SessionKey): Promise<ISession> {
  if (!await exists(key)) throw new EntityNotFoundError("Invalid session!");
  return prisma.session.update({
    where: {
      key,
      expiresAt: {
        gt: new Date(),
      },
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });
}

export async function verify(key: SessionKey): Promise<IUser> {
  const session = await prisma.session.findUnique({
    where: {
      key,
      expiresAt: {
        gt: new Date(),
      },
      revokedAt: null,
    },
  });
  if (!session) throw new UnauthorizedError("Invalid session!");
  return await users.findById(session.userId);
}

export async function exists(key: SessionKey): Promise<boolean> {
  return !!(await prisma.session.findUnique({
    where: {
      key,
      expiresAt: {
        gt: new Date(),
      },
      revokedAt: null,
    },
  }));
}
