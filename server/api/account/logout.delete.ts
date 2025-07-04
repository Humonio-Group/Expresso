import { protect } from "~/server/services/protect";
import { logout } from "~/server/services/authentication";

export default defineEventHandler(async event =>
  await protect(event, async req =>
    await logout(req)));
