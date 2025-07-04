import type { ExpressoError, HttpEvent, TNull } from "~/types/globals";
import { StatusCode } from "~/types/globals";
import { catchError } from "~/server/services/errors";
import * as users from "@/server/repositories/users";
import * as sessions from "@/server/repositories/sessions";
import type { IUserCreate } from "~/types/users";
import type { CookieSerializeOptions } from "cookie-es";
import { UnauthorizedError } from "~/types/errors";

const TOKEN_COOKIE = "auth-token";
const USER_COOKIE = "user-id";
const COOKIES_OPTIONS = (): CookieSerializeOptions => ({
  path: "/",
  secure: useRuntimeConfig().environment === "production",
  httpOnly: true,
  sameSite: useRuntimeConfig().environment === "production" ? "strict" : "lax",
});

export function setAuthCookies(event: HttpEvent, token: string, userId: number) {
  setCookie(event, TOKEN_COOKIE, token, COOKIES_OPTIONS());
  setCookie(event, USER_COOKIE, userId.toString(), COOKIES_OPTIONS());
}
export function clearAuthCookies(event: HttpEvent) {
  deleteCookie(event, TOKEN_COOKIE);
  deleteCookie(event, USER_COOKIE);
}
export function getAuthCookies(event: HttpEvent): TNull<{
  token: string;
  userId: number;
}> {
  const token = getCookie(event, TOKEN_COOKIE);
  const userId = getCookie(event, USER_COOKIE);

  return token && userId
    ? {
        token,
        userId: Number(userId),
      }
    : null;
}

export async function createAccount(event: HttpEvent) {
  const body = await readBody<IUserCreate>(event);
  try {
    const user = await users.create(body);
    const session = await sessions.create(user.id);

    setAuthCookies(event, session.token, session.userId);

    event.node.res.statusCode = StatusCode.CREATED;
    return user;
  }
  catch (e) {
    return catchError(event, e as ExpressoError);
  }
}

export async function login(event: HttpEvent) {
  const { email, password } = await readBody<{
    email: string;
    password: string;
  }>(event);

  try {
    const user = await users.comparePasswords(email, password);
    const session = await sessions.create(user.id);

    setAuthCookies(event, session.token, session.userId);

    event.node.res.statusCode = StatusCode.ACCEPTED;
    return user;
  }
  catch (e) {
    return catchError(event, e as ExpressoError);
  }
}

export async function logout(event: HttpEvent) {
  const key = getAuthCookies(event);

  if (!key) return catchError(event, new UnauthorizedError());

  try {
    await sessions.revoke(key);
    clearAuthCookies(event);
    event.node.res.statusCode = StatusCode.ACCEPTED;
  }
  catch (e) {
    return catchError(event, e as ExpressoError);
  }
}
