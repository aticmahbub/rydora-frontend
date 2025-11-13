import type {TRideStatus} from '@/constants/rideStatus';

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface IGeoPoint {
    type: 'Point';
    coordinates: [number, number];
    address?: string;
}

export interface IRide {
    _id?: string;

    riderId: string;
    driverId?: string;
    // vehicleId?: Types.ObjectId;

    pickupLocation: IGeoPoint;

    dropoffLocation: IGeoPoint;

    fare?: number;
    distance?: number;

    rideStatus?: TRideStatus;

    startedAt?: Date;
    completedAt?: Date;

    ratingByRider?: number;
    ratingByDriver?: number;

    createdAt?: Date;
    updatedAt?: Date;
}
