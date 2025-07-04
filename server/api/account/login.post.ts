import { login } from "~/server/services/authentication";

export default defineEventHandler(async event => await login(event));
