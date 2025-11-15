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
import {geoPointToCoordinates} from '@/utils/locationConverter'; // Import your utilities
import {calculateDistance, calculateFare} from '@/utils/rideCalculator';
import {UserLocationMarker} from './markers/UserLocationMarker';
import {RideMarkers} from './markers/RideMarkers';

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
    userLocation?: {lat: number; lng: number} | null;
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
    userLocation,
}: MapViewProps) {
    const {location: contextLocation, loading} = useLocationContext();
    const {pickupLocation, dropoffLocation} = useSelector(
        (state: RootState) => state.location,
    );

    const currentUserLocation = useMemo(() => {
        if (userLocation) {
            return userLocation;
        }

        if (contextLocation) {
            return contextLocation;
        }

        return null;
    }, [userLocation, contextLocation]);

    const optimalCenter = useMemo((): LatLngTuple => {
        if (currentUserLocation) {
            return [currentUserLocation.lat, currentUserLocation.lng];
        }

        if (pickupLocation && dropoffLocation) {
            const pickupCoords = geoPointToCoordinates(pickupLocation);
            const dropoffCoords = geoPointToCoordinates(dropoffLocation);

            const centerLat = (pickupCoords.lat + dropoffCoords.lat) / 2;
            const centerLng = (pickupCoords.lng + dropoffCoords.lng) / 2;

            return [centerLat, centerLng];
        }

        if (pickupLocation) {
            const pickupCoords = geoPointToCoordinates(pickupLocation);
            return [pickupCoords.lat, pickupCoords.lng];
        }

        if (dropoffLocation) {
            const dropoffCoords = geoPointToCoordinates(dropoffLocation);
            return [dropoffCoords.lat, dropoffCoords.lng];
        }

        if (propCenter) {
            return [propCenter.lat, propCenter.lng];
        }

        return [23.8103, 90.4125];
    }, [currentUserLocation, pickupLocation, dropoffLocation, propCenter]);

    const optimalZoom = useMemo(() => {
        if (currentUserLocation && rides.length > 0) {
            const nearestRideDistance = Math.min(
                ...rides.map((ride) => {
                    const rideCoords = geoPointToCoordinates(
                        ride.pickupLocation,
                    );
                    return calculateDistance(currentUserLocation, rideCoords);
                }),
            );

            if (nearestRideDistance < 2) return 15;
            if (nearestRideDistance < 5) return 14;
            if (nearestRideDistance < 10) return 13;
            return 12;
        }

        if (currentUserLocation) {
            return 14;
        }

        // original logic for pickup/dropoff
        if (pickupLocation && dropoffLocation) {
            const pickupCoords = geoPointToCoordinates(pickupLocation);
            const dropoffCoords = geoPointToCoordinates(dropoffLocation);
            const distance = calculateDistance(pickupCoords, dropoffCoords);

            if (distance < 1) return 15;
            if (distance < 5) return 14;
            if (distance < 20) return 12;
            return 11;
        }

        return zoom;
    }, [currentUserLocation, rides, pickupLocation, dropoffLocation, zoom]);

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

    const routeInfo = useMemo(() => {
        if (!pickupLocation || !dropoffLocation) return null;

        const pickupCoords = geoPointToCoordinates(pickupLocation);
        const dropoffCoords = geoPointToCoordinates(dropoffLocation);

        const distance = calculateDistance(pickupCoords, dropoffCoords);
        const fare = calculateFare(distance);

        return {distance, fare};
    }, [pickupLocation, dropoffLocation]);

    useEffect(() => {
        if (routeInfo && onRouteUpdate) {
            onRouteUpdate(routeInfo.distance, routeInfo.fare);
        }
    }, [routeInfo, onRouteUpdate]);

    const dropoffCoords = dropoffLocation
        ? geoPointToCoordinates(dropoffLocation)
        : null;

    const pickupCoords = pickupLocation
        ? geoPointToCoordinates(pickupLocation)
        : null;

    const handleLocationClick = useCallback(
        async (lat: number, lng: number, address: string) => {
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

            <MapCenterHandler center={optimalCenter} />

            <UserLocationMarker
                location={currentUserLocation}
                loading={loading}
            />

            <RideMarkers
                rides={rides}
                selectedRideId={selectedRideId}
                onRideSelect={onSelectRide}
            />

            {pickupCoords && (
                <DropoffMarker location={pickupCoords} iconType='pickup' />
            )}

            {dropoffCoords && (
                <DropoffMarker location={dropoffCoords} iconType='dropoff' />
            )}

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
