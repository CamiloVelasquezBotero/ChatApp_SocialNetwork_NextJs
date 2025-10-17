import { z } from 'zod'

export const userRegisterSchema = z.object({
  name: z.string()
    .trim()
    .min(1, 'The name is obligatory'),
  email: z.string()
    .trim()
    .min(1, 'The Email is obligatory')
    .email('Invalid email format'),
  password: z.string()
    .trim()
    .min(5, 'Minimum 5 characters for the password'),
})

export const userLoginSchema = userRegisterSchema.pick({
  email: true
}).extend({
  password: z.string()
  .trim()
  .min(1, 'The password cannot be empty')
})

export const userDataSchema = userRegisterSchema.pick({
  email: true,
  name: true
}).extend({
  id: z.number()
})

export const usersDataSchema = z.array(userDataSchema)

export const userIdSchema = z.number()

export const dataSendRequest = z.object({
  userId: z.number(),
  currentUserid: z.number(),
})