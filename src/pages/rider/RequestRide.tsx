import DashboardGrid from '@/components/dashboard/DashboardGrid';
import MapView from '@/components/modules/map/MapView';
import {RequestRideForm} from '@/components/modules/ride/RequestRideForm';
import {useLocationContext} from '@/contexts/location.context';
import {useState} from 'react';

export default function RequestRide() {
    const {location, loading} = useLocationContext();
    const [dropoff, setDropoff] = useState(null);

    if (loading || !location) return <div>Loading map...</div>;
    const pickup = location;
    console.log(pickup, 'pickup point');

    //  dropoff = {lat: 23.7936, lng: 90.4112};
    console.log(dropoff, 'dropoff');

    console.log(location);
    return (
        <div className='flex border border-amber-400  min-h-svh w-full items-center justify-center p-6 md:p-10'>
            <div className='border border-amber-400 w-full  flex'>
                {/* <RequestRideForm /> */}

                <DashboardGrid
                    tiles={[
                        <RequestRideForm />,
                        <MapView
                            dropoff={dropoff}
                            pickup={pickup}
                            onDropoffSelect={setDropoff}
                        />,
                    ]}
                />
            </div>
        </div>
    );
}

// Ride Request Form: Pickup and destination fields, fare estimation, payment method selection.
