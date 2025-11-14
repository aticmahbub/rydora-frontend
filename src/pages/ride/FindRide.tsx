import MapView from '@/components/modules/map/MapView';
import {RideList} from '@/components/modules/map/RideList';
import {Card, CardContent} from '@/components/ui/card';
import {Spinner} from '@/components/ui/Spinner';
import {useFindRideQuery} from '@/redux/features/ride/ride.api';
import type {IRide} from '@/types';
import {geoPointToCoordinates} from '@/utils/geoPointToCoordinates';
import {useState} from 'react';

export default function FindRide() {
    const {data: ridesResponse, isLoading} = useFindRideQuery(undefined);
    const [selectedRideId, setSelectedRideId] = useState<string | null>(null);
    const rides = ridesResponse?.data ?? [];

    if (isLoading) return <Spinner />;

    if (!rides || rides.length === 0) {
        return (
            <div className='text-center p-4'>
                <Card>
                    <CardContent className='p-6'>
                        <p>No rides found nearby.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Calculate center for map
    const validRide = rides.find(
        (r: Partial<IRide>) =>
            r?.pickupLocation?.coordinates?.[0] !== undefined,
    );

    const center = validRide
        ? geoPointToCoordinates(validRide.pickupLocation)
        : {lat: 23.8103, lng: 90.4125};

    return (
        <div className='flex gap-4 h-[600px]'>
            {/* Map Section */}
            <div className='flex-1'>
                <MapView
                    rides={rides}
                    selectedRideId={selectedRideId}
                    onSelectRide={setSelectedRideId}
                    center={center}
                    zoom={12}
                />
            </div>

            {/* Ride List */}
            <div className='w-96'>
                <RideList
                    rides={rides}
                    selectedRideId={selectedRideId}
                    onRideSelect={setSelectedRideId}
                    className='max-h-[600px]'
                />
            </div>
        </div>
    );
}
