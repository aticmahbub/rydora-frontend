import 'leaflet/dist/leaflet.css';
import {MapContainer, TileLayer, Polyline, useMap} from 'react-leaflet';
import {MapController} from './MapController';
import {useLocationContext} from '@/contexts/location.context';
import {useSelector} from 'react-redux';
import type {RootState} from '@/redux/store';
import type {IRide} from '@/types/location.types';
import {DropoffMarker} from './markers/DropoffMarker';
import {useEffect, useCallback, useMemo} from 'react';
import type {LatLngTuple} from 'leaflet';
import {geoPointToCoordinates} from '@/utils/locationConverter';
import {calculateDistance, calculateFare} from '@/utils/rideCalculator';
import {UserLocationMarker} from './markers/UserLocationMarker';
import {RideMarkers} from './markers/RideMarkers';

// Component to handle dynamic map center updates
function MapCenterHandler({center}: {center: LatLngTuple}) {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.setView(center, map.getZoom());
        }
    }, [center, map]);

    return null;
}

interface MapViewProps {
    rides: IRide[];
    selectedRideId: string | null;
    onSelectRide: (id: string) => void;
    onLocationClick?: (lat: number, lng: number, address: string) => void;
    onRouteUpdate?: (distance: number, fare: number) => void;
    center?: {lat: number; lng: number};
    zoom?: number;
    className?: string;
}

export default function MapView({
    rides,
    selectedRideId,
    onSelectRide,
    onLocationClick,
    onRouteUpdate,
    center: propCenter,
    zoom = 13,
    className = 'h-[80vh] flex-1 rounded-xl shadow-md z-0',
}: MapViewProps) {
    const {location, loading} = useLocationContext();
    const {pickupLocation, dropoffLocation} = useSelector(
        (state: RootState) => state.location,
    );

    // Calculate optimal center based on both pickup and dropoff
    const optimalCenter = useMemo((): LatLngTuple => {
        // If we have both locations, center between them
        if (pickupLocation && dropoffLocation) {
            const pickupCoords = geoPointToCoordinates(pickupLocation);
            const dropoffCoords = geoPointToCoordinates(dropoffLocation);

            const centerLat = (pickupCoords.lat + dropoffCoords.lat) / 2;
            const centerLng = (pickupCoords.lng + dropoffCoords.lng) / 2;

            return [centerLat, centerLng];
        }

        // If we have only pickup, center on pickup
        if (pickupLocation) {
            const pickupCoords = geoPointToCoordinates(pickupLocation);
            return [pickupCoords.lat, pickupCoords.lng];
        }

        // If we have only dropoff, center on dropoff
        if (dropoffLocation) {
            const dropoffCoords = geoPointToCoordinates(dropoffLocation);
            return [dropoffCoords.lat, dropoffCoords.lng];
        }

        // Fallback to prop center or user location
        return propCenter
            ? [propCenter.lat, propCenter.lng]
            : location
            ? [location.lat, location.lng]
            : [23.8103, 90.4125]; // Dhaka fallback
    }, [pickupLocation, dropoffLocation, propCenter, location]);

    // Calculate optimal zoom based on distance between points
    const optimalZoom = useMemo(() => {
        if (pickupLocation && dropoffLocation) {
            const pickupCoords = geoPointToCoordinates(pickupLocation);
            const dropoffCoords = geoPointToCoordinates(dropoffLocation);
            const distance = calculateDistance(pickupCoords, dropoffCoords);

            // Adjust zoom based on distance
            if (distance < 1) return 15; // Very close
            if (distance < 5) return 14; // Close
            if (distance < 20) return 12; // Medium
            return 11; // Far
        }
        return zoom;
    }, [pickupLocation, dropoffLocation, zoom]);

    // Memoize route positions with proper LatLngTuple type
    const routePositions = useMemo((): LatLngTuple[] => {
        if (!pickupLocation || !dropoffLocation) return [];

        const pickupCoords = geoPointToCoordinates(pickupLocation);
        const dropoffCoords = geoPointToCoordinates(dropoffLocation);

        return [
            [pickupCoords.lat, pickupCoords.lng],
            [dropoffCoords.lat, dropoffCoords.lng],
        ];
    }, [pickupLocation, dropoffLocation]);

    // Memoize the route calculation
    const routeInfo = useMemo(() => {
        if (!pickupLocation || !dropoffLocation) return null;

        const pickupCoords = geoPointToCoordinates(pickupLocation);
        const dropoffCoords = geoPointToCoordinates(dropoffLocation);

        const distance = calculateDistance(pickupCoords, dropoffCoords);
        const fare = calculateFare(distance);

        return {distance, fare};
    }, [pickupLocation, dropoffLocation]);

    // Notify parent component about route updates
    useEffect(() => {
        if (routeInfo && onRouteUpdate) {
            onRouteUpdate(routeInfo.distance, routeInfo.fare);
        }
    }, [routeInfo, onRouteUpdate]);

    // Convert IGeoPoint to Coordinates for markers
    const dropoffCoords = dropoffLocation
        ? geoPointToCoordinates(dropoffLocation)
        : null;

    const pickupCoords = pickupLocation
        ? geoPointToCoordinates(pickupLocation)
        : null;

    // Handle location clicks to update center
    const handleLocationClick = useCallback(
        (lat: number, lng: number, address: string) => {
            onLocationClick?.(lat, lng, address);
        },
        [onLocationClick],
    );

    return (
        <MapContainer
            center={optimalCenter}
            zoom={optimalZoom}
            className={className}
        >
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; OpenStreetMap contributors'
            />

            {/* Dynamic center handler */}
            <MapCenterHandler center={optimalCenter} />

            <UserLocationMarker location={location} loading={loading} />
            <RideMarkers
                rides={rides}
                selectedRideId={selectedRideId}
                onRideSelect={onSelectRide}
            />

            {/* Pickup Marker */}
            {pickupCoords && (
                <DropoffMarker location={pickupCoords} iconType='pickup' />
            )}

            {/* Dropoff Marker */}
            {dropoffCoords && (
                <DropoffMarker location={dropoffCoords} iconType='dropoff' />
            )}

            {/* Route Line */}
            {routePositions.length > 0 && (
                <Polyline
                    positions={routePositions}
                    color='blue'
                    weight={4}
                    opacity={0.7}
                    dashArray='10, 10'
                />
            )}

            <MapController
                rides={rides}
                selectedRideId={selectedRideId}
                onLocationClick={handleLocationClick}
            />
        </MapContainer>
    );
}
