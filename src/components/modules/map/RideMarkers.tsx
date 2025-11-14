import React from 'react';
import {Marker, Popup, Polyline} from 'react-leaflet';
import {geoPointToCoordinates} from '@/utils/geoPointToCoordinates';
import {
    pickupIcon,
    pickupIconHighlighted,
    dropoffIconHighlighted,
} from './MapIcons';
import type {IRide} from '@/types/location.types';

interface RideMarkersProps {
    rides: IRide[];
    selectedRideId: string | null;
    onRideSelect: (rideId: string) => void;
}

export function RideMarkers({
    rides,
    selectedRideId,
    onRideSelect,
}: RideMarkersProps) {
    const selectedRide = rides.find((r) => r._id === selectedRideId);

    return (
        <>
            {/* All available rides */}
            {rides.map((ride) => {
                if (!ride.pickupLocation?.coordinates?.length) return null;

                const pickup = geoPointToCoordinates(ride.pickupLocation);
                if (pickup.lat == null || pickup.lng == null) return null;

                const isSelected = ride._id === selectedRideId;

                return (
                    <Marker
                        key={`pickup-${ride._id}`}
                        position={[pickup.lat, pickup.lng]}
                        icon={isSelected ? pickupIconHighlighted : pickupIcon}
                        eventHandlers={{click: () => onRideSelect(ride._id!)}}
                    >
                        <Popup>
                            <strong>Pickup</strong>
                            <div>
                                {ride.pickupLocation?.address ??
                                    `${pickup.lat}, ${pickup.lng}`}
                            </div>
                            <button onClick={() => onRideSelect(ride._id!)}>
                                Select this ride
                            </button>
                        </Popup>
                    </Marker>
                );
            })}

            {/* Selected ride path + dropoff */}
            {selectedRide && <SelectedRideView ride={selectedRide} />}
        </>
    );
}

function SelectedRideView({ride}: {ride: IRide}) {
    const pickup = geoPointToCoordinates(ride.pickupLocation);
    const dropoff = geoPointToCoordinates(ride.dropoffLocation);

    return (
        <>
            <Marker
                position={[dropoff.lat, dropoff.lng]}
                icon={dropoffIconHighlighted}
            >
                <Popup>
                    <strong>Dropoff</strong>
                    <div>
                        {ride.dropoffLocation?.address ??
                            `${dropoff.lat}, ${dropoff.lng}`}
                    </div>
                </Popup>
            </Marker>
            <Polyline
                positions={[
                    [pickup.lat, pickup.lng],
                    [dropoff.lat, dropoff.lng],
                ]}
                color='blue'
            />
        </>
    );
}
