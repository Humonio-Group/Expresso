import { protect } from "~/server/services/protect";

export default defineEventHandler(async event =>
  await protect(event, async req =>
    req.context.user));
