export const RideStatus = {
    ALL: 'ALL',
    IN_PROGRESS: 'IN_PROGRESS',
    REQUESTED: 'REQUESTED',
    ACCEPTED: 'ACCEPTED',
    ONGOING: 'ONGOING',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
} as const;

export type TRideStatus = (typeof RideStatus)[keyof typeof RideStatus];
