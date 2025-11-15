// components/modules/ride/RideHistoryCard.tsx
import {Card, CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {RideStatus} from '@/constants/rideStatus';
import {PaymentMethod} from '@/constants/role';
import type {IRide} from '@/types';

interface RideHistoryCardProps {
    ride: IRide;
    onViewDetails?: (rideId: string) => void;
}

export function RideHistoryCard({ride, onViewDetails}: RideHistoryCardProps) {
    const rideStatus = ride.rideStatus || RideStatus.REQUESTED;

    const getStatusColor = (status: string) => {
        switch (status) {
            case RideStatus.COMPLETED:
                return 'bg-green-100 text-green-800';
            case RideStatus.CANCELLED:
                return 'bg-red-100 text-red-800';
            case RideStatus.IN_PROGRESS:
                return 'bg-blue-100 text-blue-800';
            case RideStatus.ACCEPTED:
                return 'bg-yellow-100 text-yellow-800';
            case RideStatus.REQUESTED:
                return 'bg-gray-100 text-gray-800';

            default:
                return 'bg-gray-100 text-gray-800';
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

    const formatDate = (date?: Date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDistance = (distance?: number) => {
        if (!distance) return 'N/A';
        return `${distance.toFixed(1)} km`;
    };

    const handleCardClick = () => {
        if (onViewDetails && ride._id) {
            onViewDetails(ride._id.toString());
        }
    };

    const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onViewDetails && ride._id) {
            onViewDetails(ride._id.toString());
        }
    };

    return (
        <Card
            className='mb-4 hover:shadow-md transition-shadow cursor-pointer'
            onClick={handleCardClick}
        >
            <CardContent className='p-4'>
                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
                    {/* Left Section - Ride Info */}
                    <div className='flex-1 space-y-3'>
                        {/* Header with Status and Date */}
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-3'>
                                <Badge className={getStatusColor(rideStatus)}>
                                    {rideStatus.replace('_', ' ')}
                                </Badge>
                                <span className='text-sm text-gray-500'>
                                    {formatDate(ride.createdAt)}
                                </span>
                            </div>
                            <div className='flex items-center gap-2 text-sm text-gray-600'>
                                <span>
                                    {getPaymentMethodIcon(ride.paymentMethod)}
                                </span>
                                <span>{ride.paymentMethod}</span>
                            </div>
                        </div>

                        {/* Locations */}
                        <div className='space-y-2'>
                            <div className='flex items-start gap-2'>
                                <div className='w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0'></div>
                                <div className='flex-1'>
                                    <p className='text-sm font-medium'>
                                        Pickup
                                    </p>
                                    <p className='text-sm text-gray-600'>
                                        {ride.pickupLocation.address}
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-start gap-2'>
                                <div className='w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0'></div>
                                <div className='flex-1'>
                                    <p className='text-sm font-medium'>
                                        Dropoff
                                    </p>
                                    <p className='text-sm text-gray-600'>
                                        {ride.dropoffLocation.address}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Ride Details */}
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
                            <div>
                                <p className='text-gray-500'>Distance</p>
                                <p className='font-medium'>
                                    {formatDistance(ride.distance)}
                                </p>
                            </div>
                            <div>
                                <p className='text-gray-500'>Fare</p>
                                <p className='font-medium text-green-600'>
                                    ৳{ride.fare}
                                </p>
                            </div>
                            <div>
                                <p className='text-gray-500'>Duration</p>
                                <p className='font-medium'>
                                    {ride.estimatedDuration || 'N/A'} min
                                </p>
                            </div>
                            <div>
                                <p className='text-gray-500'>Payment Status</p>
                                <p className='font-medium'>
                                    {ride.paymentStatus}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Action Button */}
                    <div className='lg:text-right'>
                        <Button
                            variant='outline'
                            size='sm'
                            onClick={handleButtonClick}
                        >
                            View Details
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
