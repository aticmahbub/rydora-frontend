import {useEffect} from 'react';
import {useMapEvents} from 'react-leaflet';
import {useDispatch} from 'react-redux';
import {
    setDropoffLocation,
    selectLocation,
} from '@/redux/features/location/location.slice';
import {useLocationContext} from '@/contexts/location.context';
import type {IRide} from '@/types/location.types';
import {
    coordinatesToGeoPoint,
    geoPointToCoordinates,
} from '@/utils/locationConverter';

interface MapControllerProps {
    rides: IRide[];
    selectedRideId: string | null;
    onLocationClick?: (lat: number, lng: number) => void;
}

export function MapController({
    rides,
    selectedRideId,
    onLocationClick,
}: MapControllerProps) {
    const dispatch = useDispatch();
    const {location} = useLocationContext();
    const map = useMapEvents({
        click(e) {
            const {lat, lng} = e.latlng;
            map.flyTo([lat, lng], map.getZoom());

            // Convert to IGeoPoint before dispatching
            const geoPoint = coordinatesToGeoPoint({lat, lng});
            dispatch(setDropoffLocation(geoPoint));
            dispatch(selectLocation('dropoff'));
            onLocationClick?.(lat, lng);
        },
    });

    // Fly to selected ride
    useEffect(() => {
        const selected = rides.find((r) => r._id === selectedRideId);
        if (selected) {
            const pickupGeo = selected.pickupLocation;
            const dropoffGeo = selected.dropoffLocation;

            dispatch(setDropoffLocation(dropoffGeo));
            dispatch(selectLocation('pickup'));

            const {lat, lng} = geoPointToCoordinates(pickupGeo);
            map.flyTo([lat, lng], 14, {duration: 0.8});
        } else {
            dispatch(selectLocation(null));
        }
    }, [selectedRideId, rides, dispatch, map]);

    // Fly to current location
    useEffect(() => {
        if (location) {
            map.flyTo([location.lat, location.lng], 14, {duration: 0.8});
        }
    }, [location, map]);

    return null;
}
