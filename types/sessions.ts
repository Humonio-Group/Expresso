import type { TNull } from "~/types/globals";

export interface ISession {
  token: string;
  userId: number;
  createdAt: Date;
  expiresAt: Date;
  revokedAt?: TNull<Date>;
}
export type SessionKey = Pick<ISession, "token" | "userId">;
