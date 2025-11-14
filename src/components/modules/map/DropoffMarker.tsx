import {Marker, Popup} from 'react-leaflet';
import {dropoffIcon} from './MapIcons';

interface DropoffMarkerProps {
    location: {lat: number; lng: number} | null;
}

export function DropoffMarker({location}: DropoffMarkerProps) {
    if (!location?.lat || !location?.lng) return null;

    return (
        <Marker position={[location.lat, location.lng]} icon={dropoffIcon}>
            <Popup>Selected dropoff</Popup>
        </Marker>
    );
}
