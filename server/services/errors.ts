import type { ExpressoError, HttpEvent } from "~/types/globals";

export function catchError(event: HttpEvent, error: ExpressoError) {
  event.node.res.statusCode = error.code;
  event.node.res.statusMessage = error.message;
}
