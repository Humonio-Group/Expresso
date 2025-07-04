import type { TArray } from "~/types/globals";
import type { ISession } from "~/types/sessions";

export interface IBackUser {
  id: number;
  key: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  sessions?: TArray<ISession>;
}
export type IUser = Omit<IBackUser, "password">;

export type IUserCreate = Omit<IBackUser, "id" | "key" | "createdAt" | "updatedAt" | "sessions">;
