import type {Coordinates, IGeoPoint} from '@/types/location.types';

/* Convert Coordinates (lat/lng) to IGeoPoint */
export function coordinatesToGeoPoint(
    coords: Coordinates,
    address?: string,
): IGeoPoint {
    return {
        type: 'Point',
        coordinates: [coords.lng, coords.lat], // Note: GeoJSON uses [lng, lat]
        address,
    };
}

/**
 * Convert IGeoPoint to Coordinates (lat/lng)
 */
export function geoPointToCoordinates(geoPoint: IGeoPoint): Coordinates {
    if (!geoPoint.coordinates || geoPoint.coordinates.length < 2) {
        throw new Error('Invalid GeoPoint coordinates');
    }
    return {
        lng: geoPoint.coordinates[0],
        lat: geoPoint.coordinates[1],
    };
}

/**
 * Check if object is Coordinates (has lat/lng)
 */
export function isCoordinates(obj: any): obj is Coordinates {
    return obj && typeof obj.lat === 'number' && typeof obj.lng === 'number';
}

/**
 * Check if object is IGeoPoint (has type and coordinates)
 */
export function isGeoPoint(obj: any): obj is IGeoPoint {
    return obj && obj.type === 'Point' && Array.isArray(obj.coordinates);
}
