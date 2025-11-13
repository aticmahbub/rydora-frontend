import MapView from '@/components/modules/map/MapView';
import {RequestRideForm} from '@/components/modules/ride/RequestRideForm';
import {Spinner} from '@/components/ui/Spinner';
import {useLocationContext} from '@/contexts/location.context';
import {useDispatch, useSelector} from 'react-redux';
import {setPickupLocation} from '@/redux/features/location/location.slice';
import {useEffect} from 'react';
import type {AppDispatch, RootState} from '@/redux/store';

export default function RequestRide() {
    const {location, loading} = useLocationContext();
    const {pickupLocation, driverLocation, dropoffLocation} = useSelector(
        (state: RootState) => state.location,
    );
    console.log(
        'location:',
        location,
        pickupLocation,
        driverLocation,
        dropoffLocation,
    );
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (location) dispatch(setPickupLocation(location));
    }, [location, dispatch]);

    if (loading || !location) return <Spinner />;

    return (
        <div className='flex border border-red-500 min-h-svh w-full items-center justify-center'>
            <div className='flex gap-4 w-full border border-amber-400 justify-between'>
                <RequestRideForm />
                <MapView />
            </div>
        </div>
    );
}
