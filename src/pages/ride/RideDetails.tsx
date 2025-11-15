/* eslint-disable @typescript-eslint/no-explicit-any */
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Spinner} from '@/components/ui/Spinner';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {
    Clock,
    User,
    Phone,
    Calendar,
    DollarSign,
    Navigation,
} from 'lucide-react';
import {RideStatus, type TRideStatus} from '@/constants/rideStatus';
import {useNavigate, useParams} from 'react-router';
import {PaymentMethod} from '@/constants/role';
import type {IRideTimeline} from '@/types/ride.types';
import {useGetRideDetailsQuery} from '@/redux/features/ride/ride.api';

export default function RideDetails() {
    const {rideId} = useParams<{rideId: string}>();
    const navigate = useNavigate();
    const {
        data: apiResponse,
        isLoading,
        error,
        refetch,
    } = useGetRideDetailsQuery(rideId);

    if (isLoading) {
        return <Spinner />;
    }

    const ride = apiResponse?.data;

    const driver = ride?.driverId as any;

    const getStatusColor = (status: TRideStatus) => {
        switch (status) {
            case RideStatus.COMPLETED:
                return 'bg-green-100 text-green-800 border-green-200';
            case RideStatus.CANCELLED:
                return 'bg-red-100 text-red-800 border-red-200';
            case RideStatus.IN_PROGRESS:
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case RideStatus.ACCEPTED:
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case RideStatus.REQUESTED:
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getPaymentMethodIcon = (method: PaymentMethod) => {
        switch (method) {
            case PaymentMethod.CASH:
                return '💵';
            case PaymentMethod.CARD:
                return '💳';
            case PaymentMethod.MOBILE_WALLET:
                return '📱';
            default:
                return '💰';
        }
    };

    const formatDateTime = (date?: Date | string) => {
        if (!date) return 'N/A';
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return dateObj.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatTime = (date?: Date | string) => {
        if (!date) return 'N/A';
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return dateObj.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const calculateDuration = (start?: Date | string, end?: Date | string) => {
        if (!start || !end) return 'N/A';
        const startDate = typeof start === 'string' ? new Date(start) : start;
        const endDate = typeof end === 'string' ? new Date(end) : end;
        const diff = Math.abs(endDate.getTime() - startDate.getTime());
        const minutes = Math.floor(diff / 60000);
        return `${minutes} min`;
    };

    const handleRetry = () => {
        refetch();
    };

    if (isLoading) {
        return (
            <div className='container mx-auto p-4 max-w-4xl flex justify-center items-center h-64'>
                <Spinner size='lg' />
                <span className='ml-2'>Loading ride details...</span>
            </div>
        );
    }

    if (error || !ride) {
        console.error('Ride Details Error:', error);
        return (
            <div className='container mx-auto p-4 max-w-4xl'>
                <Alert variant='destructive' className='mb-6'>
                    <AlertDescription>
                        {error
                            ? 'Failed to load ride details. Please try again.'
                            : 'Ride not found'}
                    </AlertDescription>
                </Alert>
                <div className='flex gap-3'>
                    <Button onClick={handleRetry}>Retry</Button>
                    <Button variant='outline' onClick={() => navigate(-1)}>
                        Back to Ride History
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className='container mx-auto p-4 max-w-4xl'>
            {/* Header */}
            <div className='mb-6'>
                <Button
                    variant='outline'
                    onClick={() => navigate(-1)}
                    className='mb-4'
                >
                    ← Back to Ride History
                </Button>
                <div className='flex justify-between items-start'>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900'>
                            Ride Details
                        </h1>
                        <p className='text-gray-600 mt-2'>
                            {formatDateTime(ride.createdAt)}
                        </p>
                    </div>
                    <Badge
                        className={`text-lg px-4 py-2 border-2 ${getStatusColor(
                            ride.rideStatus!,
                        )}`}
                    >
                        {ride.rideStatus!.replace('_', ' ')}
                    </Badge>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Left Column - Ride Information */}
                <div className='lg:col-span-2 space-y-6'>
                    {/* Locations Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <Navigation className='h-5 w-5' />
                                Route Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='flex items-start gap-3'>
                                <div className='w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0'></div>
                                <div className='flex-1'>
                                    <p className='font-medium text-sm text-gray-500'>
                                        Pickup
                                    </p>
                                    <p className='text-lg'>
                                        {ride.pickupLocation.address}
                                    </p>
                                    <p className='text-sm text-gray-500 mt-1'>
                                        {ride.startedAt &&
                                            formatTime(ride.startedAt)}
                                    </p>
                                </div>
                            </div>

                            <div className='border-l-2 border-gray-300 ml-1.5 h-8'></div>

                            <div className='flex items-start gap-3'>
                                <div className='w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0'></div>
                                <div className='flex-1'>
                                    <p className='font-medium text-sm text-gray-500'>
                                        Dropoff
                                    </p>
                                    <p className='text-lg'>
                                        {ride.dropoffLocation.address}
                                    </p>
                                    <p className='text-sm text-gray-500 mt-1'>
                                        {ride.completedAt &&
                                            formatTime(ride.completedAt)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Timeline Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <Clock className='h-5 w-5' />
                                Ride Timeline
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                {ride.timeline?.map(
                                    (event: IRideTimeline, index: number) => (
                                        <div key={index} className='flex gap-4'>
                                            <div className='flex flex-col items-center'>
                                                <div
                                                    className={`w-3 h-3 rounded-full ${
                                                        event.status ===
                                                        RideStatus.COMPLETED
                                                            ? 'bg-green-500'
                                                            : event.status ===
                                                              RideStatus.CANCELLED
                                                            ? 'bg-red-500'
                                                            : event.status ===
                                                              RideStatus.IN_PROGRESS
                                                            ? 'bg-blue-500'
                                                            : event.status ===
                                                              RideStatus.ACCEPTED
                                                            ? 'bg-yellow-500'
                                                            : 'bg-gray-500'
                                                    }`}
                                                ></div>
                                                {index <
                                                    (ride.timeline?.length ||
                                                        0) -
                                                        1 && (
                                                    <div className='w-0.5 h-full bg-gray-300 mt-1'></div>
                                                )}
                                            </div>
                                            <div className='flex-1 pb-4'>
                                                <div className='flex justify-between items-start'>
                                                    <div>
                                                        <p className='font-medium'>
                                                            {event.status.replace(
                                                                '_',
                                                                ' ',
                                                            )}
                                                        </p>
                                                        {event.location && (
                                                            <p className='text-sm text-gray-600 mt-1'>
                                                                {
                                                                    event
                                                                        .location
                                                                        .address
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                    <p className='text-sm text-gray-500 whitespace-nowrap'>
                                                        {formatTime(
                                                            event.timestamp,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ),
                                )}
                                {(!ride.timeline ||
                                    ride.timeline.length === 0) && (
                                    <p className='text-gray-500 text-center py-4'>
                                        No timeline data available
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Driver & Payment Info */}
                <div className='space-y-6'>
                    {/* Driver Information */}
                    {driver && (
                        <Card>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-2'>
                                    <User className='h-5 w-5' />
                                    Driver Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
                                        <User className='h-6 w-6 text-blue-600' />
                                    </div>
                                    <div>
                                        <p className='font-semibold'>
                                            {driver.name || 'Unknown Driver'}
                                        </p>
                                        {driver.rating && (
                                            <p className='text-sm text-gray-600'>
                                                Rating: {driver.rating} ⭐
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className='space-y-2'>
                                    {driver.phone && (
                                        <div className='flex items-center gap-2 text-sm'>
                                            <Phone className='h-4 w-4 text-gray-500' />
                                            <span>{driver.phone}</span>
                                        </div>
                                    )}
                                    {driver.vehicle && (
                                        <div className='text-sm'>
                                            <p className='font-medium'>
                                                Vehicle
                                            </p>
                                            <p>
                                                {driver.vehicle.model ||
                                                    'Unknown Model'}{' '}
                                                •{' '}
                                                {driver.vehicle.color ||
                                                    'Unknown Color'}
                                            </p>
                                            {driver.vehicle.licensePlate && (
                                                <p className='text-gray-600'>
                                                    {
                                                        driver.vehicle
                                                            .licensePlate
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    )}
                                    {driver.totalRides && (
                                        <div className='text-sm'>
                                            <p className='font-medium'>
                                                Total Rides
                                            </p>
                                            <p>
                                                {driver.totalRides.toLocaleString()}{' '}
                                                completed rides
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Payment Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <DollarSign className='h-5 w-5' />
                                Payment Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            <div className='flex justify-between items-center'>
                                <span className='text-gray-600'>Fare</span>
                                <span className='text-2xl font-bold text-green-600'>
                                    ৳{ride.fare}
                                </span>
                            </div>

                            <div className='flex justify-between items-center text-sm'>
                                <span className='text-gray-600'>
                                    Payment Method
                                </span>
                                <div className='flex items-center gap-2'>
                                    <span>
                                        {getPaymentMethodIcon(
                                            ride.paymentMethod,
                                        )}
                                    </span>
                                    <span>
                                        {ride.paymentMethod.replace('_', ' ')}
                                    </span>
                                </div>
                            </div>

                            <div className='flex justify-between items-center text-sm'>
                                <span className='text-gray-600'>
                                    Payment Status
                                </span>
                                <Badge
                                    variant={
                                        ride.paymentStatus === 'PAID'
                                            ? 'default'
                                            : ride.paymentStatus === 'PENDING'
                                            ? 'secondary'
                                            : 'destructive'
                                    }
                                >
                                    {ride.paymentStatus}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Ride Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <Calendar className='h-5 w-5' />
                                Ride Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-3 text-sm'>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Distance</span>
                                <span>
                                    {ride.distance
                                        ? `${ride.distance.toFixed(1)} km`
                                        : 'N/A'}
                                </span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Duration</span>
                                <span>
                                    {calculateDuration(
                                        ride.startedAt,
                                        ride.completedAt,
                                    )}
                                </span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>
                                    Requested At
                                </span>
                                <span>{formatTime(ride.createdAt)}</span>
                            </div>
                            {ride.startedAt && (
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>
                                        Started At
                                    </span>
                                    <span>{formatTime(ride.startedAt)}</span>
                                </div>
                            )}
                            {ride.completedAt && (
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>
                                        Completed At
                                    </span>
                                    <span>{formatTime(ride.completedAt)}</span>
                                </div>
                            )}
                            {ride.riderNote && (
                                <div className='pt-3 border-t'>
                                    <p className='text-gray-600 mb-1'>
                                        Rider Note
                                    </p>
                                    <p className='text-gray-800 bg-yellow-50 p-2 rounded'>
                                        "{ride.riderNote}"
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
