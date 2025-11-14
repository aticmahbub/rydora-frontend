import {z} from 'zod';

export const requestRideFormSchema = z.object({
    // riderId: z.string().min(1, 'Rider ID is required'),
    // pickupLocation: z
    //     .string()
    //     .regex(/^-?\d+\.?\d*,-?\d+\.?\d*$/, {
    //         error: 'Must be in format: lat,lng',
    //     }),
    // dropoffLocation: z
    //     .string()
    //     .regex(/^-?\d+\.?\d*,-?\d+\.?\d*$/, {
    //         error: 'Must be in format: lat,lng',
    //     }),
    fare: z.number().min(1, 'Fare must be at least 1'),
});

export type TRequestRideForm = z.infer<typeof requestRideFormSchema>;
