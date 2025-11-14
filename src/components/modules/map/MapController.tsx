import {useEffect} from 'react';
import {useMapEvents} from 'react-leaflet';
import {useDispatch} from 'react-redux';
import {
    selectLocation,
    setLocationWithGeocoding,
} from '@/redux/features/location/location.slice';
import {useLocationContext} from '@/contexts/location.context';
import type {IRide} from '@/types/location.types';
import {geoPointToCoordinates} from '@/utils/locationConverter';
import type {AppDispatch} from '@/redux/store';

interface MapControllerProps {
    rides: IRide[];
    selectedRideId: string | null;
    onLocationClick?: (lat: number, lng: number, address: string) => void;
}

export function MapController({
    rides,
    selectedRideId,
    onLocationClick,
}: MapControllerProps) {
    const dispatch = useDispatch<AppDispatch>();
    const {location} = useLocationContext();
    const map = useMapEvents({
        async click(e) {
            const {lat, lng} = e.latlng;

            // Don't fly to the clicked location immediately
            // Let the parent component handle the center logic
            console.log('Map clicked:', {lat, lng});

            try {
                // Use the new geocoding action
                const result = await dispatch(
                    setLocationWithGeocoding({
                        coordinates: {lat, lng},
                        type: 'dropoff',
                    }),
                ).unwrap();

                dispatch(selectLocation('dropoff'));
                onLocationClick?.(lat, lng, result.address);
            } catch (error) {
                console.error('Failed to set location with geocoding:', error);
                // Fallback: just set coordinates without address
                onLocationClick?.(
                    lat,
                    lng,
                    `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
                );
            }
        },
    });

    // Fly to selected ride
    useEffect(() => {
        const selected = rides.find((r) => r._id === selectedRideId);
        if (selected) {
            const pickupGeo = selected.pickupLocation;
            const dropoffGeo = selected.dropoffLocation;

            // Use the new geocoding action for selected rides too
            dispatch(
                setLocationWithGeocoding({
                    coordinates: geoPointToCoordinates(dropoffGeo),
                    type: 'dropoff',
                }),
            );

            dispatch(selectLocation('pickup'));

            const {lat, lng} = geoPointToCoordinates(pickupGeo);
            // Smooth fly to the pickup location
            map.flyTo([lat, lng], 14, {duration: 1});
        } else {
            dispatch(selectLocation(null));
        }
    }, [selectedRideId, rides, dispatch, map]);

    // Fly to current location only on initial load
    useEffect(() => {
        if (location && map.getZoom() === 13) {
            // Only if at default zoom
            map.flyTo([location.lat, location.lng], 14, {duration: 1});
        }
    }, [location, map]);

    return null;
}
