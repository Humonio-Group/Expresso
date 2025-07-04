import { createAccount } from "~/server/services/authentication";

export default defineEventHandler(async event => await createAccount(event));
