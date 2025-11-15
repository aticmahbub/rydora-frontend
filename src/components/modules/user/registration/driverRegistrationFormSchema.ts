import {vehicleTypes} from '@/constants/vehicleTypes';
import z from 'zod';

export const vehicleRegistrationFormSchema = z.object({
    // Driver Information
    drivingLicenseNo: z
        .string()
        .min(5, 'Driving license number must be at least 5 characters')
        .max(20, 'Driving license number must be less than 20 characters')
        .regex(
            /^[A-Za-z0-9-]+$/,
            'Only letters, numbers, and hyphens are allowed',
        ),

    // Vehicle Information
    registrationNo: z
        .string()
        .min(6, 'Registration number must be at least 6 characters')
        .max(15, 'Registration number must be less than 15 characters')
        .regex(
            /^[A-Za-z0-9-]+$/,
            'Only letters, numbers, and hyphens are allowed',
        ),

    vehicleType: z.enum([...Object.values(vehicleTypes)], {
        error: 'Invalid vehicle type',
    }),

    brand: z
        .string()
        .min(2, 'Brand must be at least 2 characters')
        .max(50, 'Brand must be less than 50 characters'),

    model: z
        .string()
        .min(1, 'Model is required')
        .max(50, 'Model must be less than 50 characters'),

    color: z
        .string()
        .min(2, 'Color must be at least 2 characters')
        .max(20, 'Color must be less than 20 characters'),

    capacity: z
        .number()
        .min(1, 'Capacity must be at least 1')
        .max(20, 'Capacity cannot exceed 20'),

    // Insurance Information
    insuranceProvider: z
        .string()
        .min(2, 'Insurance provider is required')
        .max(50, 'Insurance provider must be less than 50 characters'),

    insurancePolicyNo: z
        .string()
        .min(5, 'Insurance policy number must be at least 5 characters')
        .max(30, 'Insurance policy number must be less than 30 characters'),

    insuranceExpiryDate: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), 'Invalid expiry date')
        .refine(
            (date) => new Date(date) > new Date(),
            'Insurance must be valid (not expired)',
        ),

    // Document URLs
    // registrationCard: z
    //     .string()
    //     .url('Invalid registration card URL')
    //     .optional(),
});

export type TVehicleRegistrationForm = z.infer<
    typeof vehicleRegistrationFormSchema
>;
