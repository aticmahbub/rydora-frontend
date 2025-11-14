import {Marker, Popup} from 'react-leaflet';
import {pickupIcon, dropoffIcon} from '../MapIcons';

interface DropoffMarkerProps {
    location: {lat: number; lng: number} | null;
    iconType?: 'pickup' | 'dropoff';
}

export function DropoffMarker({
    location,
    iconType = 'dropoff',
}: DropoffMarkerProps) {
    if (!location) return null;

    const icon = iconType === 'pickup' ? pickupIcon : dropoffIcon;
    const label =
        iconType === 'pickup' ? 'Pickup Location' : 'Dropoff Location';

    return (
        <Marker position={[location.lat, location.lng]} icon={icon}>
            <Popup>{label}</Popup>
        </Marker>
    );
}
