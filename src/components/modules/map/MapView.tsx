import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState} from '@/redux/store';
import {setDropoffLocation} from '@/redux/features/location/location.slice';
import type {Coordinates} from '@/redux/features/location/location.slice';

const pickupIcon = new L.Icon({
    iconUrl: '/pickup.png',
    iconSize: [32, 32],
});

const dropoffIcon = new L.Icon({
    iconUrl: '/dropoff.png',
    iconSize: [32, 32],
});

const driverIcon = new L.Icon({
    iconUrl: '/driver.png',
    iconSize: [32, 32],
});

function LocationSelector({onSelect}: {onSelect: (pos: Coordinates) => void}) {
    useMapEvents({
        click(e) {
            onSelect({lat: e.latlng.lat, lng: e.latlng.lng});
        },
    });
    return null;
}

export default function MapView() {
    const dispatch = useDispatch();
    const {pickupLocation, driverLocation, dropoffLocation} = useSelector(
        (state: RootState) => state.location,
    );

    const center = pickupLocation || {lat: 23.8103, lng: 90.4125};

    return (
        <MapContainer
            style={{height: '600px', width: '100%'}}
            center={center}
            zoom={14}
        >
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="https://osm.org">OpenStreetMap</a>'
            />

            {pickupLocation && (
                <Marker position={pickupLocation} icon={pickupIcon}>
                    <Popup>Pickup Location</Popup>
                </Marker>
            )}

            {dropoffLocation && (
                <Marker position={dropoffLocation} icon={dropoffIcon}>
                    <Popup>Dropoff Location</Popup>
                </Marker>
            )}

            {driverLocation && (
                <Marker position={driverLocation} icon={driverIcon}>
                    <Popup>Driver</Popup>
                </Marker>
            )}

            {/* clicking on map sets dropoff */}
            <LocationSelector
                onSelect={(pos) => dispatch(setDropoffLocation(pos))}
            />
        </MapContainer>
    );
}
