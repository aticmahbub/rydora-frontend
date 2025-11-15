/* eslint-disable @typescript-eslint/no-explicit-any */
import type {ICoordinates, IGeoPoint} from '@/types/location.types';

// Convert ICoordinates to IGeoPoint
export function coordinatesToGeoPoint(
    coords: ICoordinates,
    address?: string,
): IGeoPoint {
    return {
        type: 'Point',
        coordinates: [coords.lng, coords.lat],
        address,
    };
}

//   Convert IGeoPoint to ICoordinates

export function geoPointToCoordinates(geoPoint: IGeoPoint): ICoordinates {
    if (!geoPoint.coordinates || geoPoint.coordinates.length < 2) {
        throw new Error('Invalid GeoPoint coordinates');
    }
    return {
        lng: geoPoint.coordinates[0],
        lat: geoPoint.coordinates[1],
    };
}

//  Check if object is ICoordinates
export function isCoordinates(obj: any): obj is ICoordinates {
    return obj && typeof obj.lat === 'number' && typeof obj.lng === 'number';
}

//  * Check if object is IGeoPoint

export function isGeoPoint(obj: any): obj is IGeoPoint {
    return obj && obj.type === 'Point' && Array.isArray(obj.coordinates);
}
