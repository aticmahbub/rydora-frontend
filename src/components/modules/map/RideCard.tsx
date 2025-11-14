import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {geoPointToCoordinates} from '@/utils/geoPointToCoordinates';
import type {IRide} from '@/types/location.types';

interface RideCardProps {
    ride: IRide;
    isSelected: boolean;
    onSelect: (rideId: string) => void;
}

export function RideCard({ride, isSelected, onSelect}: RideCardProps) {
    const coordsPickup = geoPointToCoordinates(ride.pickupLocation);
    const coordsDrop = geoPointToCoordinates(ride.dropoffLocation);

    return (
        <Card
            className={`border transition cursor-pointer ${
                isSelected ? 'border-blue-500 shadow-lg' : ''
            }`}
            onClick={() => onSelect(ride._id!)}
        >
            <CardHeader>
                <CardTitle>
                    Fare: {ride.fare} | Status: {ride.rideStatus}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>
                    <strong>Pickup:</strong>{' '}
                    {ride.pickupLocation?.address ??
                        `${coordsPickup.lat}, ${coordsPickup.lng}`}
                </p>
                <p>
                    <strong>Dropoff:</strong>{' '}
                    {ride.dropoffLocation?.address ??
                        `${coordsDrop.lat}, ${coordsDrop.lng}`}
                </p>
                <p>
                    <strong>Requested:</strong>{' '}
                    {new Date(ride.createdAt).toLocaleString()}
                </p>
            </CardContent>
        </Card>
    );
}
