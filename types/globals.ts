import type { H3Event } from "h3";

export type TNull<T> = T | null;
export type TArray<T> = T[];

export type HttpEvent = H3Event<Request>;

export type Callback = (event: HttpEvent) => Promise<unknown>;

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  PARTIAL_CONTENT = 206,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,

  INTERNAL = 500,
}

export class ExpressoError extends Error {
  code: StatusCode;

  constructor(code: StatusCode, message?: string) {
    super(message);
    this.code = code;
  }
}
