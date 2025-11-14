import type {TRideStatus} from '@/constants/rideStatus';
import type {IGeoPoint} from './location.types';

export interface IRide {
    _id: string;

    riderId: string;
    driverId?: string;
    // vehicleId?: Types.ObjectId;

    currentLocation: IGeoPoint;

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

export interface IRideResponse {
    riderId: string;
    driverId: null | string;
    pickupLocation: IPickupLocation;
    dropoffLocation: IDropoffLocation;
    fare: number;
    rideStatus: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IPickupLocation {
    type: string;
    coordinates: number[];
    address: string;
}

export interface IDropoffLocation {
    type: string;
    coordinates: number[];
    address: string;
}
