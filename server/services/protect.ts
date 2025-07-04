import type { Callback, ExpressoError, HttpEvent } from "~/types/globals";
import { getAuthCookies } from "~/server/services/authentication";
import { catchError } from "~/server/services/errors";
import { UnauthorizedError } from "~/types/errors";
import * as sessions from "@/server/repositories/sessions";

export async function protect(event: HttpEvent, callback: Callback) {
  const cookies = getAuthCookies(event);
  if (!cookies) return catchError(event, new UnauthorizedError());

  try {
    event.context.user = await sessions.verify(cookies);
    return callback(event);
  }
  catch (e) {
    return catchError(event, e as ExpressoError);
  }
}
