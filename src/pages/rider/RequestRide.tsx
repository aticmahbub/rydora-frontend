import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useLocationContext} from '@/contexts/location.context';
import {
    setPickupLocation,
    setDropoffLocation,
} from '@/redux/features/location/location.slice';
import type {AppDispatch} from '@/redux/store';
import {coordinatesToGeoPoint} from '@/utils/locationConverter';
import {Spinner} from '@/components/ui/Spinner';
import {RequestRideForm} from '@/components/modules/ride/RequestRideForm';
import RequestRideMap from '@/components/modules/map/RequestRideMap';

export default function RequestRide() {
    const dispatch = useDispatch<AppDispatch>();
    const {location, loading} = useLocationContext();

    // Sync current device location as pickup when available
    useEffect(() => {
        if (location) {
            const geoPoint = coordinatesToGeoPoint(location);
            dispatch(setPickupLocation(geoPoint));
        }
    }, [location, dispatch]);

    const handleLocationClick = (lat: number, lng: number) => {
        console.log('Location selected:', {lat, lng});
        const geoPoint = coordinatesToGeoPoint({lat, lng});
        dispatch(setDropoffLocation(geoPoint));
    };

    if (loading || !location) return <Spinner />;

    return (
        <div className='flex min-h-svh w-full items-center justify-center p-4'>
            <div className='flex gap-6 w-full max-w-7xl'>
                <div className='flex-1 max-w-md'>
                    <RequestRideForm />
                </div>

                <div className='flex-1'>
                    <RequestRideMap onLocationClick={handleLocationClick} />
                </div>
            </div>
        </div>
    );
}
