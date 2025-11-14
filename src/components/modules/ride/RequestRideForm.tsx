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
import {geoPointToCoordinates} from '@/utils/locationConverter';

export function RequestRideForm({...props}: React.ComponentProps<typeof Card>) {
    const {pickupLocation, dropoffLocation} = useSelector(
        (state: RootState) => state.location,
    );
    const {data: userData, isLoading} = useUserInfoQuery(undefined);
    const [requestRide] = useRequestRideMutation();

    const form = useForm<TRequestRideForm>({
        resolver: zodResolver(requestRideFormSchema),
        defaultValues: {
            riderId: userData?.data?._id ?? '',
            pickupLocation: '',
            dropoffLocation: '',
            fare: 0,
        },
    });

    // Update form when pickupLocation changes in Redux
    useEffect(() => {
        if (pickupLocation) {
            const coords = geoPointToCoordinates(pickupLocation);
            form.setValue('pickupLocation', `${coords.lat},${coords.lng}`);
        }
    }, [pickupLocation, form]);

    // Update form when dropoffLocation changes in Redux
    useEffect(() => {
        if (dropoffLocation) {
            const coords = geoPointToCoordinates(dropoffLocation);
            form.setValue('dropoffLocation', `${coords.lat},${coords.lng}`);
        }
    }, [dropoffLocation, form]);

    // Set riderId when user data is available
    useEffect(() => {
        if (userData?.data?._id) {
            form.setValue('riderId', userData.data._id);
        }
    }, [userData, form]);

    const onSubmit = async (data: TRequestRideForm) => {
        if (!userData?.data?._id) return;

        const rideInfo: Partial<IRide> = {
            riderId: userData.data._id,
            pickupLocation: {
                type: 'Point',
                coordinates: data.pickupLocation
                    .split(',')
                    .map(Number)
                    .reverse() as [number, number],
            },
            dropoffLocation: {
                type: 'Point',
                coordinates: data.dropoffLocation
                    .split(',')
                    .map(Number)
                    .reverse() as [number, number],
            },
            fare: Number(data.fare),
        };

        const res = await requestRide(rideInfo);
        console.log(res);
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Card className='flex-1' {...props}>
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
                                                placeholder='Pickup Location (lat,lng)'
                                                {...field}
                                                readOnly // Make it read-only since it comes from map
                                                className='bg-gray-50'
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Click on the map to set pickup
                                            location
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
                                                placeholder='Destination Location (lat,lng)'
                                                {...field}
                                                readOnly // Make it read-only since it comes from map
                                                className='bg-gray-50'
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Click on the map to set destination
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
                                                onChange={(e) =>
                                                    field.onChange(
                                                        Number(e.target.value),
                                                    )
                                                }
                                                value={field.value}
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
                                    <Button type='submit'>Request Ride</Button>
                                </Field>
                            </FieldGroup>
                        </FieldGroup>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
