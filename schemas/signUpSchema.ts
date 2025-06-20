import * as z from "zod";

export const signUpSchema = z.object({
    email: z.string().min(1,{message:"Email is required"}).email({message:"Invalid email format"}),
    password: z.string().min(1,{message:"Password is required"}).min(8, { message: "Password must be at least 8 characters long" }),
    passwordConfirmation: z.string().min(1,{message:"Please confirm your password"}),
  })
  .refine((data)=> data.password === data.passwordConfirmation ,{
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  })
  