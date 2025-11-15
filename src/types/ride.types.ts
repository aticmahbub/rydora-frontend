import type {TRideStatus} from '@/constants/rideStatus';
import type {IGeoPoint} from './location.types';
import type {PaymentMethod, PaymentStatus} from '@/constants/role';

export interface IRideTimeline {
    status: TRideStatus;
    timestamp: Date;
    location?: IGeoPoint;
}

export interface IRide {
    _id?: string;
    riderId: string;
    driverId?: string;
    pickupLocation: IGeoPoint;
    dropoffLocation: IGeoPoint;
    fare: number;
    distance?: number;
    estimatedDuration?: number;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    rideStatus?: TRideStatus;
    timeline: IRideTimeline[];
    startedAt?: Date;
    completedAt?: Date;
    cancelledAt?: Date;
    cancellationReason?: string;
    ratingByRider?: number;
    ratingByDriver?: number;
    riderNote?: string;
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

export interface RideHistoryFilters {
    startDate?: string;
    endDate?: string;
    minFare?: number;
    maxFare?: number;
    status?: string;
    search?: string;
}

export interface RideHistoryResponse {
    rides: IRide[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface IRideHistoryFilters {
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
    minFare?: number;
    maxFare?: number;
    status?: TRideStatus;
    search?: string;
}

// Response DTOs
export interface IRideHistoryResponse {
    rides: IRide[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
