import {Marker, Popup} from 'react-leaflet';
import {userIcon} from '../MapIcons';

interface UserLocationMarkerProps {
    location: {lat: number; lng: number} | null;
    loading: boolean;
}

export function UserLocationMarker({
    location,
    loading,
}: UserLocationMarkerProps) {
    if (loading || !location) return null;

    return (
        <Marker position={[location.lat, location.lng]} icon={userIcon}>
            <Popup>You're here</Popup>
        </Marker>
    );
}
