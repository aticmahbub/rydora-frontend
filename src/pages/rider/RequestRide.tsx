import MapView from '@/components/modules/map/MapView';
import {RequestRideForm} from '@/components/modules/ride/RequestRideForm';
import {useLocationContext} from '@/contexts/location.context';

export default function RequestRide() {
    const {location, loading} = useLocationContext();
    if (loading || !location) return <div>Loading map...</div>;
    const pickup = location;

    const dropoff = {lat: 23.7936, lng: 90.4112};

    console.log(location);
    return (
        <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
            <div className='w-full max-w-sm'>
                <RequestRideForm />
                <MapView dropoff={dropoff} pickup={pickup} />
            </div>
        </div>
    );
}

// Ride Request Form: Pickup and destination fields, fare estimation, payment method selection.
