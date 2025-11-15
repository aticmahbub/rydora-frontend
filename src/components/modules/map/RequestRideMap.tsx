import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import {useSelector} from 'react-redux';
import type {RootState} from '@/redux/store';
import {useLocationContext} from '@/contexts/location.context';
import {MapController} from './MapController';
import {UserLocationMarker} from './markers/UserLocationMarker';
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

            <UserLocationMarker location={location} loading={loading} />

            {pickupLocation && (
                <Marker
                    position={[
                        pickupLocation.coordinates[1],
                        pickupLocation.coordinates[0],
                    ]}
                    icon={pickupIcon}
                >
                    <Popup>Pickup Location</Popup>
                </Marker>
            )}

            {dropoffLocation && (
                <Marker
                    position={[
                        dropoffLocation.coordinates[1],
                        dropoffLocation.coordinates[0],
                    ]}
                    icon={dropoffIcon}
                >
                    <Popup>Dropoff Location</Popup>
                </Marker>
            )}

            <MapController
                rides={[]}
                selectedRideId={null}
                onLocationClick={onLocationClick}
            />
        </MapContainer>
    );
}
