import type {ICoordinates} from '@/types';

const geocodingCache = new Map<string, string>();

export async function getAddressFromCoordinates(
    coordinates: ICoordinates,
): Promise<string> {
    const {lat, lng} = coordinates;
    const cacheKey = `${lat.toFixed(6)},${lng.toFixed(6)}`;

    // Check cache first
    if (geocodingCache.has(cacheKey)) {
        return geocodingCache.get(cacheKey)!;
    }

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
            {
                headers: {
                    'User-Agent': 'Rydora/1.0',
                },
            },
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const address =
            data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

        // Cache the result
        geocodingCache.set(cacheKey, address);

        return address;
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        // Fallback to coordinates
        return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
}
