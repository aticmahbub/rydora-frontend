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
import {useEffect} from 'react';
import {useRequestRideMutation} from '@/redux/features/ride/ride.api';
import type {RootState} from '@/redux/store';
import {useSelector} from 'react-redux';
import {LocationDisplay} from '../map/LocationDisplay';
import {formatDistance} from '@/utils/rideCalculator';
import {
    requestRideFormSchema,
    type TRequestRideForm,
} from './requestRideFormSchema';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {PaymentMethod} from '@/constants/role';
import {toast} from 'sonner';

interface RequestRideFormProps extends React.ComponentProps<typeof Card> {
    routeInfo?: {distance: number; fare: number};
    onRouteUpdate?: (distance: number, fare: number) => void;
}

export function RequestRideForm({routeInfo, ...props}: RequestRideFormProps) {
    const {pickupLocation, dropoffLocation} = useSelector(
        (state: RootState) => state.location,
    );
    const {data: userData, isLoading} = useUserInfoQuery(undefined);
    const [requestRide] = useRequestRideMutation();

    const form = useForm<TRequestRideForm>({
        resolver: zodResolver(requestRideFormSchema),
        defaultValues: {
            paymentMethod: PaymentMethod.CASH,
            fare: 0,
        },
    });

    // set estimated fare when route info changes
    useEffect(() => {
        if (routeInfo?.fare && routeInfo.fare > 0) {
            const currentFare = form.getValues('fare');

            if (currentFare === 0 || currentFare === routeInfo.fare) {
                form.setValue('fare', routeInfo.fare);
            }
        }
    }, [routeInfo, form]);

    const onSubmit = async (data: TRequestRideForm) => {
        const toastId = toast.loading('Requesting for the ride...');
        if (!userData?.data?._id || !pickupLocation || !dropoffLocation) {
            console.error('Missing required data');
            toast.error('Data missing');
            return;
        }

        const rideInfo = {
            pickupLocation,
            dropoffLocation,
            paymentMethod: data.paymentMethod,
            riderNote: data.riderNote,
            fare: data.fare,
        };

        console.log('rideInfo:', rideInfo);

        try {
            const res = await requestRide(rideInfo);
            console.log('res:', res);
            if (res.data?.success) {
                toast.success('Ride request submitted successfully', {
                    id: toastId,
                });
                form.reset();
            }
        } catch (error) {
            toast.error('Failed to submit ride request', {id: toastId});
            console.error('error:', error);
        }
    };

    const canSubmit = pickupLocation && dropoffLocation;

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Card className='flex-1' {...props}>
            <CardHeader>
                <CardTitle>Request a Ride</CardTitle>
                <CardDescription>
                    Set locations and confirm the fare amount
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

                            {/* Route Information */}
                            {routeInfo && routeInfo.distance > 0 && (
                                <div className='p-3 bg-blue-50 border border-blue-200 rounded-md'>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-sm font-medium text-blue-800'>
                                            Distance:
                                        </span>
                                        <span className='text-sm text-blue-600'>
                                            {formatDistance(routeInfo.distance)}
                                        </span>
                                    </div>
                                    <div className='flex justify-between items-center mt-1'>
                                        <span className='text-sm font-medium text-blue-800'>
                                            Estimated Fare:
                                        </span>
                                        <span className='text-sm font-semibold text-green-600'>
                                            ৳{routeInfo.fare}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Fare Input - Editable with estimated fare as default */}
                            <FormField
                                control={form.control}
                                name='fare'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Fare Amount (৳)</FormLabel>
                                        <FormControl>
                                            <div className='relative'>
                                                <Input
                                                    {...field}
                                                    onChange={(e) => {
                                                        const value =
                                                            e.target.value;
                                                        field.onChange(
                                                            value === ''
                                                                ? 0
                                                                : Number(value),
                                                        );
                                                    }}
                                                    value={field.value || ''}
                                                    type='number'
                                                    placeholder='Enter fare amount'
                                                    min='1'
                                                    className='pr-20'
                                                />
                                                {routeInfo?.fare && (
                                                    <div className='absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1'>
                                                        <button
                                                            type='button'
                                                            onClick={() =>
                                                                form.setValue(
                                                                    'fare',
                                                                    routeInfo.fare,
                                                                )
                                                            }
                                                            className='text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors'
                                                        >
                                                            Use Estimate
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>
                                        <div className='flex justify-between items-center'>
                                            <FormMessage />
                                            {routeInfo?.fare && (
                                                <p className='text-xs text-gray-500'>
                                                    Estimated: ৳{routeInfo.fare}
                                                </p>
                                            )}
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Payment Method Selection */}
                            <FormField
                                control={form.control}
                                name='paymentMethod'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Payment Method</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Select payment method' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem
                                                    value={PaymentMethod.CASH}
                                                >
                                                    Cash
                                                </SelectItem>
                                                <SelectItem
                                                    value={PaymentMethod.CARD}
                                                >
                                                    Credit/Debit Card
                                                </SelectItem>
                                                <SelectItem
                                                    value={
                                                        PaymentMethod.MOBILE_WALLET
                                                    }
                                                >
                                                    Mobile Wallet
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Optional Rider Note */}
                            <FormField
                                control={form.control}
                                name='riderNote'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Special Instructions (Optional)
                                        </FormLabel>
                                        <FormControl>
                                            <textarea
                                                {...field}
                                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                                placeholder='Any special instructions for the driver...'
                                                rows={3}
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
                                    {canSubmit && (
                                        <p className='text-xs text-center text-gray-500 mt-2'>
                                            You can adjust the fare amount if
                                            needed
                                        </p>
                                    )}
                                </Field>
                            </FieldGroup>
                        </FieldGroup>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
