import type {ICoordinates, IGeoPoint} from '@/types/location.types';

/* Convert ICoordinates (lat/lng) to IGeoPoint */
export function coordinatesToGeoPoint(
    coords: ICoordinates,
    address?: string,
): IGeoPoint {
    return {
        type: 'Point',
        coordinates: [coords.lng, coords.lat], // Note: GeoJSON uses [lng, lat]
        address,
    };
}

/**
 * Convert IGeoPoint to ICoordinates (lat/lng)
 */
export function geoPointToCoordinates(geoPoint: IGeoPoint): ICoordinates {
    if (!geoPoint.coordinates || geoPoint.coordinates.length < 2) {
        throw new Error('Invalid GeoPoint coordinates');
    }
    return {
        lng: geoPoint.coordinates[0],
        lat: geoPoint.coordinates[1],
    };
}

/**
 * Check if object is ICoordinates (has lat/lng)
 */
export function isCoordinates(obj: any): obj is ICoordinates {
    return obj && typeof obj.lat === 'number' && typeof obj.lng === 'number';
}

/**
 * Check if object is IGeoPoint (has type and coordinates)
 */
export function isGeoPoint(obj: any): obj is IGeoPoint {
    return obj && obj.type === 'Point' && Array.isArray(obj.coordinates);
}
