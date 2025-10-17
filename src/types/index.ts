import { User } from "@prisma/client";
import z from "zod";
import { userIdSchema, usersDataSchema } from "../schema-zod";

export type UserData = Pick<User, 'id' | 'name' | 'email'>

export type UsersDataSchema = z.infer<typeof usersDataSchema>

export type UserId = z.infer<typeof userIdSchema>