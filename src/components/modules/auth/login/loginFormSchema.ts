import z from 'zod';

export const loginFormSchema = z.object({
    email: z.email({error: 'Invalid email'}),
    password: z.string({error: 'Password must be string'}),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
