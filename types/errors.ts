import { ExpressoError, StatusCode } from "~/types/globals";

export class EntityNotFoundError extends ExpressoError {
  constructor(message?: string) {
    super(StatusCode.NOT_FOUND, message ?? "Entity not found!");
  }
}

export class UnauthorizedError extends ExpressoError {
  constructor(message?: string) {
    super(StatusCode.UNAUTHORIZED, message ?? "Unauthorized!");
  }
}

export class ForbiddenError extends ExpressoError {
  constructor(message?: string) {
    super(StatusCode.FORBIDDEN, message ?? "Not enough permissions!");
  }
}

export class ConflictError extends ExpressoError {
  constructor(message?: string) {
    super(StatusCode.CONFLICT, message ?? "Something is conflicting!");
  }
}

export class InternalError extends ExpressoError {
  constructor(message?: string) {
    super(StatusCode.INTERNAL, message ?? "Internal error!");
  }
}
