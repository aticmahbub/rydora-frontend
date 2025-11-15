import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import type {IRide} from '@/types/location.types';
import {formatDistance} from '@/utils/rideCalculator';
import {geoPointToCoordinates} from '@/utils/locationConverter';

interface RideCardProps {
    ride: IRide;
    isSelected: boolean;
    onSelect: (rideId: string) => void;
    onAcceptRide?: (rideId: string) => void;
}

export function RideCard({ride, isSelected, onSelect}: RideCardProps) {
    const coordsPickup = geoPointToCoordinates(ride.pickupLocation);
    const coordsDrop = geoPointToCoordinates(ride.dropoffLocation);

    const requestedDate = ride.createdAt
        ? new Date(ride.createdAt).toLocaleString()
        : 'Not available';

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'REQUESTED':
                return 'bg-blue-100 text-blue-800';
            case 'ACCEPTED':
                return 'bg-green-100 text-green-800';
            case 'IN_PROGRESS':
                return 'bg-yellow-100 text-yellow-800';
            case 'COMPLETED':
                return 'bg-gray-100 text-gray-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleAcceptRide = (e: React.MouseEvent) => {
        console.log(e);
    };

    return (
        <Card
            className={`border-2 transition-all cursor-pointer hover:shadow-md ${
                isSelected
                    ? 'border-blue-500 shadow-lg bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSelect(ride._id!)}
        >
            <CardHeader className='pb-3'>
                <div className='flex justify-between items-start'>
                    <CardTitle className='text-lg flex items-center gap-2'>
                        <span className='text-2xl'>🚗</span>
                        <span>৳{ride.fare}</span>
                    </CardTitle>
                    <div
                        className={getStatusColor(
                            ride.rideStatus || 'REQUESTED',
                        )}
                    >
                        {ride.rideStatus || 'REQUESTED'}
                    </div>
                </div>
            </CardHeader>

            <CardContent className='space-y-3'>
                {/* Pickup Location */}
                <div className='flex items-start gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0'></div>
                    <div className='flex-1'>
                        <p className='text-sm font-medium text-gray-900'>
                            Pickup
                        </p>
                        <p className='text-sm text-gray-600'>
                            {ride.pickupLocation?.address ||
                                `${coordsPickup.lat.toFixed(
                                    4,
                                )}, ${coordsPickup.lng.toFixed(4)}`}
                        </p>
                    </div>
                </div>

                {/* Dropoff Location */}
                <div className='flex items-start gap-2'>
                    <div className='w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0'></div>
                    <div className='flex-1'>
                        <p className='text-sm font-medium text-gray-900'>
                            Destination
                        </p>
                        <p className='text-sm text-gray-600'>
                            {ride.dropoffLocation?.address ||
                                `${coordsDrop.lat.toFixed(
                                    4,
                                )}, ${coordsDrop.lng.toFixed(4)}`}
                        </p>
                    </div>
                </div>

                {/* Additional Details */}

                <div className='bg-gray-50 p-3 rounded-md space-y-2'>
                    <div className='flex justify-between text-sm'>
                        <span className='text-gray-600'>Rider ID:</span>
                        <span className='font-medium'>Rider details</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                        <span className='text-gray-600'>Requested:</span>
                        <span className='font-medium'>{requestedDate}</span>
                    </div>
                    {ride.distance && (
                        <div className='flex justify-between text-sm'>
                            <span className='text-gray-600'>Distance:</span>
                            <span className='font-medium'>
                                {formatDistance(ride.distance)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className='flex gap-2 pt-2'>
                    <Button
                        variant='outline'
                        size='sm'
                        // onClick={(e) => {}}
                        className='flex-1'
                    >
                        Show details
                    </Button>

                    {ride.rideStatus === 'REQUESTED' && (
                        <Button
                            size='sm'
                            onClick={handleAcceptRide}
                            className='flex-1 bg-green-600 hover:bg-green-700'
                        >
                            Accept Ride
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
