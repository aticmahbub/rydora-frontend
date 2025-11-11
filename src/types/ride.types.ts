export enum RideStatus {
    REQUESTED = 'REQUESTED',
    ACCEPTED = 'ACCEPTED',
    ONGOING = 'ONGOING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

export interface IRide {
    _id?: string;

    riderId: string;
    driverId?: string;
    // vehicleId?: Types.ObjectId;

    // Instead of plain strings, use GeoJSON to support nearby driver queries
    pickupLocation: string;

    dropoffLocation: string;

    fare?: number;
    distance?: number;

    rideStatus?: RideStatus;

    startedAt?: Date;
    completedAt?: Date;

    ratingByRider?: number;
    ratingByDriver?: number;

    createdAt?: Date;
    updatedAt?: Date;
}
