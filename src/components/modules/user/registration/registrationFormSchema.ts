import {role} from '@/constants/role';
import z from 'zod';

export const registrationFormSchema = z
    .object({
        name: z
            .string()
            .min(2, {message: 'Name must be at least 2 characters long'})
            .max(20, {message: 'Name cannot exceed 20 characters'}),
        email: z.email({message: 'Invalid email'}),
        NID: z.coerce
            .number()
            .min(1, {message: 'NID is required and must be a valid number'}),
        password: z
            .string()
            .min(8, {message: 'Password must be at least 8 characters long'})
            .max(20, {message: 'Password cannot exceed 20 characters'})
            .regex(/^(?=.*[A-Z])/, {
                message: 'Must contain at least 1 uppercase letter',
            })
            .regex(/^(?=.*[!@#$%^&*])/, {
                message: 'Must contain at least one special character',
            })
            .regex(/^(?=.*\d)/, {message: 'Must contain at least one number'}),
        confirmPassword: z.string(),
        role: z.enum([...Object.values(role)]),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });
