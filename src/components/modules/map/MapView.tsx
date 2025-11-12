// MapView.tsx
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';

const pickupIcon = new L.Icon({
    iconUrl: '/pickup.png',
    iconSize: [32, 32],
});

const dropoffIcon = new L.Icon({
    iconUrl: '/dropoff.png',
    iconSize: [32, 32],
});

interface MapViewProps {
    pickup: {lat: number; lng: number};
    dropoff: {lat: number; lng: number};
    driver?: {lat: number; lng: number};
}

export default function MapView({pickup, dropoff, driver}: MapViewProps) {
    const center = pickup || {lat: 23.8103, lng: 90.4125};

    return (
        <MapContainer
            center={center}
            zoom={14}
            style={{height: '100%', width: '100%'}}
        >
            <TileLayer
                attribution='&copy; <a href="https://osm.org">OpenStreetMap</a>'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            <Marker position={pickup} icon={pickupIcon}>
                <Popup>Pickup Location</Popup>
            </Marker>

            <Marker position={dropoff} icon={dropoffIcon}>
                <Popup>Dropoff Location</Popup>
            </Marker>

            {driver && (
                <Marker
                    position={driver}
                    icon={
                        new L.Icon({
                            iconUrl: '/driver.png',
                            iconSize: [32, 32],
                        })
                    }
                >
                    <Popup>Driver</Popup>
                </Marker>
            )}
        </MapContainer>
    );
}
