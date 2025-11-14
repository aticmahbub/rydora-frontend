import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import {useSelector} from 'react-redux';
import type {RootState} from '@/redux/store';
import {useLocationContext} from '@/contexts/location.context';
import {MapController} from './MapController';
import {UserLocationMarker} from './UserLocationMarker';
import {pickupIcon, dropoffIcon} from './MapIcons';
import {Spinner} from '@/components/ui/Spinner';

interface RequestRideMapProps {
    onLocationClick?: (lat: number, lng: number) => void;
    className?: string;
}

export default function RequestRideMap({
    onLocationClick,
    className = 'h-[600px] rounded-xl',
}: RequestRideMapProps) {
    const {location, loading} = useLocationContext();
    const {pickupLocation, dropoffLocation} = useSelector(
        (state: RootState) => state.location,
    );

    if (loading || !location) {
        return (
            <div className={`${className} flex items-center justify-center`}>
                <Spinner />
            </div>
        );
    }

    return (
        <MapContainer
            center={[location.lat, location.lng]}
            zoom={13}
            className={className}
        >
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; OpenStreetMap contributors'
            />

            {/* Current user location */}
            <UserLocationMarker location={location} loading={loading} />

            {/* Pickup location marker */}
            {pickupLocation && (
                <Marker
                    position={[
                        pickupLocation.coordinates[1], // lat
                        pickupLocation.coordinates[0], // lng
                    ]}
                    icon={pickupIcon}
                >
                    <Popup>Pickup Location</Popup>
                </Marker>
            )}

            {/* Dropoff location marker */}
            {dropoffLocation && (
                <Marker
                    position={[
                        dropoffLocation.coordinates[1], // lat
                        dropoffLocation.coordinates[0], // lng
                    ]}
                    icon={dropoffIcon}
                >
                    <Popup>Dropoff Location</Popup>
                </Marker>
            )}

            {/* Map controller for click handling */}
            <MapController
                rides={[]}
                selectedRideId={null}
                onLocationClick={onLocationClick}
            />
        </MapContainer>
    );
}
