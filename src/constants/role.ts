export const role = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    USER: 'USER',
    ADMIN: 'ADMIN',
    RIDER: 'RIDER',
    DRIVER: 'DRIVER',
};

export const PaymentMethod = {
    CASH: 'CASH',
    CARD: 'CARD',
    MOBILE_WALLET: 'MOBILE_WALLET',
};

export const PaymentStatus = {
    PENDING: 'PENDING',
    PAID: 'PAID',
    FAILED: 'FAILED',
    REFUNDED: 'REFUNDED',
};

export type Role = (typeof role)[keyof typeof role];
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
