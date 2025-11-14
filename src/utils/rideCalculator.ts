import type {ICoordinates} from '@/types';

// Haversine formula to calculate distance between two Icoordinates in kilometers
export function calculateDistance(
    coord1: ICoordinates,
    coord2: ICoordinates,
): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
    const dLng = ((coord2.lng - coord1.lng) * Math.PI) / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((coord1.lat * Math.PI) / 180) *
            Math.cos((coord2.lat * Math.PI) / 180) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
}

// Calculate fare based on distance (Bangladeshi Taka)
export function calculateFare(distance: number): number {
    const baseFare = 60; // ৳60 base fare
    const ratePerKm = 25; // ৳25 per kilometer after first 2km

    if (distance <= 2) {
        return baseFare;
    }

    const additionalKm = distance - 2;
    const totalFare = baseFare + additionalKm * ratePerKm;

    // Round to nearest 10 Taka
    return Math.ceil(totalFare / 10) * 10;
}

// Format distance for display
export function formatDistance(distance: number): string {
    if (distance < 1) {
        return `${Math.round(distance * 1000)} meters`;
    }
    return `${distance.toFixed(1)} km`;
}
