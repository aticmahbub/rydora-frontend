import {z} from 'zod';

export const requestRideFormSchema = z.object({
    riderId: z.string(),
    pickupLocation: z.string().min(1, 'Pickup location is required').optional(),
    dropoffLocation: z.string().min(1, 'Destination is required'),
    fare: z.coerce
        .number({error: 'Fare must be a number'})
        .positive('Fare must be positive'),
});

export type TRequestRideForm = z.input<typeof requestRideFormSchema>;
