import MapView from '@/components/modules/map/MapView';
import {RequestRideForm} from '@/components/modules/ride/RequestRideForm';
import {Spinner} from '@/components/ui/Spinner';
import {useLocationContext} from '@/contexts/location.context';
import {useState} from 'react';

export default function RequestRide() {
    const {location, loading} = useLocationContext();
    const [dropoff, setDropoff] = useState(null);

    const pickup = location;
    console.log(pickup, 'Picked up');
    console.log(dropoff, 'dropoff');

    if (loading || !location)
        return (
            <div>
                <Spinner />
            </div>
        );

    return (
        <div className='flex border border-red-500   min-h-svh w-full items-center justify-center '>
            <div className='border  border-amber-400 flex justify-between w-full gap-4'>
                <RequestRideForm
                    dropoff={dropoff}
                    pickup={pickup}
                    onDropoffSelect={setDropoff}
                />
                <MapView
                    dropoff={dropoff}
                    pickup={pickup}
                    onDropoffSelect={setDropoff}
                />
            </div>
        </div>
    );
}

// Ride Request Form: Pickup and destination fields, fare estimation, payment method selection.
