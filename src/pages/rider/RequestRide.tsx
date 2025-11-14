import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useLocationContext} from '@/contexts/location.context';
import {setLocationWithGeocoding} from '@/redux/features/location/location.slice';
import type {AppDispatch} from '@/redux/store';
import {Spinner} from '@/components/ui/Spinner';
import {RequestRideForm} from '@/components/modules/ride/RequestRideForm';
import MapView from '@/components/modules/map/MapView';

export default function RequestRide() {
    const dispatch = useDispatch<AppDispatch>();
    const {location, loading} = useLocationContext();
    const [routeInfo, setRouteInfo] = useState({distance: 0, fare: 0});

    // Sync current device location as pickup when available
    useEffect(() => {
        if (location) {
            dispatch(
                setLocationWithGeocoding({
                    coordinates: location,
                    type: 'pickup',
                }),
            );
        }
    }, [location, dispatch]);

    const handleLocationClick = useCallback(
        (lat: number, lng: number, address: string) => {
            console.log('Location selected:', {lat, lng, address});
        },
        [],
    );

    // Stable callback to prevent infinite loops
    const handleRouteUpdate = useCallback((distance: number, fare: number) => {
        setRouteInfo({distance, fare});
    }, []);

    if (loading || !location) return <Spinner />;

    return (
        <div className='flex min-h-svh w-full items-center justify-center p-4'>
            <div className='flex gap-6 w-full max-w-7xl'>
                <div className='flex-1 max-w-md'>
                    <RequestRideForm
                        routeInfo={routeInfo}
                        onRouteUpdate={handleRouteUpdate}
                    />
                </div>

                <div className='flex-1'>
                    <MapView
                        rides={[]}
                        selectedRideId={null}
                        onSelectRide={() => {}}
                        onLocationClick={handleLocationClick}
                        onRouteUpdate={handleRouteUpdate}
                        center={location}
                        className='h-[600px] rounded-xl'
                    />
                </div>
            </div>
        </div>
    );
}
