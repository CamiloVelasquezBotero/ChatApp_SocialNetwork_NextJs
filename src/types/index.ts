import { User } from "@prisma/client";
import z from "zod";
import { userFoundInSearch, userIdSchema, usersFoundInSearch, userDataSchema } from "../schema-zod";

export type UserData = z.infer<typeof userDataSchema>

export type UserId = z.infer<typeof userIdSchema>

export type UsersFoundInSearch = z.infer<typeof usersFoundInSearch>
export type UserFoundInSearch = z.infer<typeof userFoundInSearch>

export type AcceptRequest = {idSender: number, action: string,}