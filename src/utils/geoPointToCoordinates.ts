import type {IGeoPoint, Coordinates} from '@/types/location.types';

export function geoPointToCoordinates(geoPoint: IGeoPoint): Coordinates {
    if (!geoPoint.coordinates || geoPoint.coordinates.length < 2) {
        return {lat: 0, lng: 0}; // Or throw an error
    }

    // GeoJSON format: [longitude, latitude]
    return {
        lng: geoPoint.coordinates[0],
        lat: geoPoint.coordinates[1],
    };
}
