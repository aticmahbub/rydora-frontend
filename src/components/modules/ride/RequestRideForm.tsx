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
import {
    requestRideFormSchema,
    type TRequestRideForm,
} from './requestRideFormSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {useUserInfoQuery} from '@/redux/features/user/user.api';
import {Spinner} from '@/components/ui/Spinner';
import {useEffect} from 'react';
import {useRequestRideMutation} from '@/redux/features/ride/ride.api';
import type {IRide} from '@/types';
import type {RootState} from '@/redux/store';
import {useSelector} from 'react-redux';

export function RequestRideForm({...props}: React.ComponentProps<typeof Card>) {
    const {pickupLocation, dropoffLocation} = useSelector(
        (state: RootState) => state.location,
    );
    const {data: userData, isLoading} = useUserInfoQuery(undefined);
    const [requestRide] = useRequestRideMutation();

    const form = useForm<TRequestRideForm>({
        resolver: zodResolver(requestRideFormSchema),
        defaultValues: {
            riderId: '',
            pickupLocation: '',
            dropoffLocation: '',
            fare: 0, // should be number, not string
        },
    });

    const onSubmit = async (data: TRequestRideForm) => {
        const rideInfo: Partial<IRide> = {
            riderId: userData?.data?._id,
            pickupLocation: pickupLocation
                ? `${pickupLocation.lat},${pickupLocation.lng}`
                : data.pickupLocation,
            dropoffLocation: dropoffLocation
                ? `${dropoffLocation.lat},${dropoffLocation.lng}`
                : data.dropoffLocation,
            fare: data.fare as number,
        };
        await requestRide(rideInfo);
    };

    useEffect(() => {
        if (userData?.data?._id) {
            form.setValue('riderId', userData.data._id);
        }
    }, [userData, form]);

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <Card className=' flex-1' {...props}>
            <CardHeader>
                <CardTitle>Enter your trip details below</CardTitle>
                <CardDescription className='sr-only'>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <FormField
                                control={form.control}
                                name='pickupLocation'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Pickup Location</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                placeholder='Pickup Location'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription className='sr-only'>
                                            Pickup Location
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='dropoffLocation'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Destination Location
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                placeholder='Destination Location'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription className='sr-only'>
                                            Destination Location
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='fare'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Fare</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value as number}
                                                type='number'
                                                placeholder='Fare'
                                            />
                                        </FormControl>
                                        <FormDescription className='sr-only'>
                                            Fare
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FieldGroup>
                                <Field>
                                    <Button type='submit'>Request</Button>
                                </Field>
                            </FieldGroup>
                        </FieldGroup>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
