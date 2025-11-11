export const RideStatus = {
    REQUESTED: 'REQUESTED',
    ACCEPTED: 'ACCEPTED',
    ONGOING: 'ONGOING',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
} as const;

export type RideStatus = (typeof RideStatus)[keyof typeof RideStatus];
