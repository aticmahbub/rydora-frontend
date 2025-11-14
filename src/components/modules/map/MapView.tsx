import 'leaflet/dist/leaflet.css';
import {MapContainer, TileLayer} from 'react-leaflet';
import {MapController} from './MapController';
import {useLocationContext} from '@/contexts/location.context';
import {useSelector} from 'react-redux';
import type {RootState} from '@/redux/store';
import type {IRide} from '@/types/location.types';

import {UserLocationMarker} from './markers/UserLocationMarker';
import {RideMarkers} from './markers/RideMarkers';
import {DropoffMarker} from './DropoffMarker';
import {geoPointToCoordinates} from '@/utils/locationConverter';

interface MapViewProps {
    rides: IRide[];
    selectedRideId: string | null;
    onSelectRide: (id: string) => void;
    onLocationClick?: (lat: number, lng: number) => void;
    center?: {lat: number; lng: number};
    zoom?: number;
    className?: string;
}

export default function MapView({
    rides,
    selectedRideId,
    onSelectRide,
    onLocationClick,
    center,
    zoom = 13,
    className = 'h-[80vh] flex-1 rounded-xl shadow-md z-0',
}: MapViewProps) {
    const {location, loading} = useLocationContext();
    const {dropoffLocation} = useSelector((state: RootState) => state.location);

    // Convert IGeoPoint to Coordinates for DropoffMarker
    const dropoffCoords = dropoffLocation
        ? geoPointToCoordinates(dropoffLocation)
        : null;

    // Calculate default center
    const defaultCenter =
        center ||
        location ||
        (rides.length && rides[0].pickupLocation?.coordinates?.length === 2
            ? geoPointToCoordinates(rides[0].pickupLocation)
            : {lat: 23.8103, lng: 90.4125});

    return (
        <MapContainer
            center={[defaultCenter.lat, defaultCenter.lng]}
            zoom={zoom}
            className={className}
        >
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; OpenStreetMap contributors'
            />

            <UserLocationMarker location={location} loading={loading} />
            <RideMarkers
                rides={rides}
                selectedRideId={selectedRideId}
                onRideSelect={onSelectRide}
            />
            <DropoffMarker location={dropoffCoords} />
            <MapController
                rides={rides}
                selectedRideId={selectedRideId}
                onLocationClick={onLocationClick}
            />
        </MapContainer>
    );
}
