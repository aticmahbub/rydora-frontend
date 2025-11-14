import type {IGeoPoint} from '@/types/location.types';

export const coordinatesToGeoPoint = (
    lat: number,
    lng: number,
    address?: string,
): IGeoPoint => ({
    type: 'Point',
    coordinates: [lng, lat],
    address,
});
