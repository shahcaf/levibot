import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export const signUpSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(32).regex(/^[a-z0-9_-]+$/),
  password: z.string().min(8).max(128),
  displayName: z.string().max(50).optional(),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
