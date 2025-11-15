import {Card, CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import type {IRide} from '@/types';
import {RideStatus} from '@/constants/rideStatus';
import {PaymentMethod} from '@/constants/role';

interface RideHistoryCardProps {
    ride: IRide;
    onViewDetails?: (rideId: string) => void;
}

export function RideHistoryCard({ride, onViewDetails}: RideHistoryCardProps) {
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

    return (
        <Card className='mb-4 hover:shadow-md transition-shadow'>
            <CardContent className='p-4'>
                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
                    {/* left section  ride info */}
                    <div className='flex-1 space-y-3'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-3'>
                                <Badge
                                    className={getStatusColor(ride.rideStatus!)}
                                >
                                    {ride.rideStatus!.replace('_', ' ')}
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
                                <div className='w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0'></div>
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
                                <div className='w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0'></div>
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

                    {/* right section - action button */}
                    <div className='lg:text-right'>
                        <Button
                            variant='outline'
                            size='sm'
                            onClick={() =>
                                onViewDetails?.(ride._id!.toString())
                            }
                        >
                            View Details
                        </Button>
                    </div>
                </div>

                {/* timeline if available */}
                {ride.timeline && ride.timeline.length > 0 && (
                    <div className='mt-4 pt-4 border-t'>
                        <p className='text-sm font-medium mb-2'>
                            Ride Timeline
                        </p>
                        <div className='flex overflow-x-auto gap-2 pb-2'>
                            {ride.timeline.slice(-3).map((event, index) => (
                                <div
                                    key={index}
                                    className='shrink-0 bg-gray-50 px-3 py-1 rounded-full text-xs'
                                >
                                    <span className='font-medium'>
                                        {event.status.replace('_', ' ')}
                                    </span>
                                    <span className='text-gray-500 ml-1'>
                                        {new Date(
                                            event.timestamp,
                                        ).toLocaleTimeString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
