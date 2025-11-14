import {Button} from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {Field, FieldGroup} from '@/components/ui/field';
import {Input} from '@/components/ui/input';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {useUserInfoQuery} from '@/redux/features/user/user.api';
import {Spinner} from '@/components/ui/Spinner';
import {useRequestRideMutation} from '@/redux/features/ride/ride.api';
import type {IRide} from '@/types';
import type {RootState} from '@/redux/store';
import {useSelector} from 'react-redux';
import {LocationDisplay} from '../map/LocationDisplay';
import z from 'zod';

// Simplified schema - only fare is needed
const requestRideFormSchema = z.object({
    fare: z.number().min(1, 'Fare must be at least 1'),
});

type TRequestRideForm = z.infer<typeof requestRideFormSchema>;

export function RequestRideForm({...props}: React.ComponentProps<typeof Card>) {
    const {pickupLocation, dropoffLocation} = useSelector(
        (state: RootState) => state.location,
    );
    const {data: userData, isLoading} = useUserInfoQuery(undefined);
    const [requestRide] = useRequestRideMutation();

    const form = useForm<TRequestRideForm>({
        resolver: zodResolver(requestRideFormSchema),
        defaultValues: {
            fare: 0,
        },
    });

    const onSubmit = async (data: TRequestRideForm) => {
        if (!userData?.data?._id || !pickupLocation || !dropoffLocation) {
            console.error('Missing required data');
            return;
        }

        const rideInfo: Partial<IRide> = {
            riderId: userData.data._id,
            pickupLocation, // Directly from Redux
            dropoffLocation, // Directly from Redux
            fare: Number(data.fare),
        };

        try {
            const res = await requestRide(rideInfo);
            console.log('Ride requested:', res);
            // Optional: Reset form or show success message
            form.reset();
        } catch (error) {
            console.error('Failed to request ride:', error);
        }
    };

    // Check if form can be submitted
    const canSubmit = pickupLocation && dropoffLocation;

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Card className='flex-1' {...props}>
            <CardHeader>
                <CardTitle>Request a Ride</CardTitle>
                <CardDescription>
                    Set locations on the map and enter fare
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup className='space-y-4'>
                            {/* Pickup Location Display */}
                            <div className='space-y-2'>
                                <FormLabel>Pickup Location</FormLabel>
                                <LocationDisplay
                                    location={pickupLocation}
                                    placeholder='Click on the map to set pickup location'
                                />
                                {!pickupLocation && (
                                    <p className='text-sm text-amber-600'>
                                        Click on the map to set pickup location
                                    </p>
                                )}
                            </div>

                            {/* Dropoff Location Display */}
                            <div className='space-y-2'>
                                <FormLabel>Destination</FormLabel>
                                <LocationDisplay
                                    location={dropoffLocation}
                                    placeholder='Click on the map to set destination'
                                />
                                {!dropoffLocation && (
                                    <p className='text-sm text-amber-600'>
                                        Click on the map to set destination
                                    </p>
                                )}
                            </div>

                            {/* Fare Input - Only input field needed */}
                            <FormField
                                control={form.control}
                                name='fare'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Fare ($)</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        Number(e.target.value),
                                                    )
                                                }
                                                value={field.value || ''}
                                                type='number'
                                                placeholder='Enter fare amount'
                                                min='1'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FieldGroup>
                                <Field>
                                    <Button
                                        type='submit'
                                        disabled={!canSubmit}
                                        className='w-full'
                                    >
                                        {canSubmit
                                            ? 'Request Ride'
                                            : 'Set Locations First'}
                                    </Button>
                                </Field>
                            </FieldGroup>
                        </FieldGroup>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
