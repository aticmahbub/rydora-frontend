import z from 'zod';

export const loginFormSchema = z.object({
    email: z.email({error: 'Invalid email'}),
    password: z
        .string({error: 'Password must be string'})
        .min(8, {error: 'Password must be at least 8 characters long'})
        .max(20, {error: 'Password can not exceed 20 characters'}),
});
