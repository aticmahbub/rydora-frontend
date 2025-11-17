import {role} from '@/constants/role';
import z from 'zod';

export const updateUserFormSchema = z
    .object({
        name: z.string().min(1, 'Name is required').optional(),
        email: z.string().email('Invalid email address').optional(),
        phone: z.string().optional(),
        role: z
            .enum([role.ADMIN, role.SUPER_ADMIN, role.DRIVER, role.RIDER])
            .optional(),
        isActive: z.boolean().optional(),
        isVerified: z.boolean().optional(),
        profileImage: z
            .string()
            .url('Invalid URL')
            .optional()
            .or(z.literal('')),
    })
    .refine(
        (data: {[s: string]: unknown} | ArrayLike<unknown>) => {
            // Ensure at least one field is provided
            return Object.values(data).some(
                (value) => value !== undefined && value !== '',
            );
        },
        {
            message: 'At least one field must be updated',
            path: ['root'],
        },
    );
