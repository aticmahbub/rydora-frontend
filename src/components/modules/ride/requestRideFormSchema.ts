import {PaymentMethod} from '@/constants/role';
import {z} from 'zod';

export const requestRideFormSchema = z.object({
    paymentMethod: z.enum(
        {...PaymentMethod},
        {
            error: 'Please select a payment method',
        },
    ),
    riderNote: z.string().optional(),
    fare: z.number().min(1, 'Fare must be at least 1'),
});

export type TRequestRideForm = z.infer<typeof requestRideFormSchema>;
