import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const pickupIcon = new L.Icon({
    iconUrl: '../../../assets/icons/pickup.png',
    iconSize: [32, 32],
});

const dropoffIcon = new L.Icon({
    iconUrl: '../../../assets/icons/dropoff.png',
    iconSize: [32, 32],
});

interface MapViewProps {
    pickup: {lat: number; lng: number};
    dropoff: {lat: number; lng: number};
    driver?: {lat: number; lng: number};
}

export default function MapView({pickup, dropoff, driver}: MapViewProps) {
    const center = pickup || {lat: 23.8103, lng: 90.4125};
    console.log(center, 'center');

    return (
        <MapContainer
            style={{height: '600px', width: '100%'}}
            center={center}
            zoom={14}
            // style={{height: '100%', width: '100%'}}
        >
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="https://osm.org">OpenStreetMap</a>'
            />

            <Marker position={pickup} icon={pickupIcon}>
                <Popup>Pickup Location</Popup>
            </Marker>

            {dropoff && (
                <Marker position={dropoff} icon={dropoffIcon}>
                    <Popup>Dropoff Location</Popup>
                </Marker>
            )}

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
