import type {IGeoPoint} from '@/types/location.types';

interface LocationDisplayProps {
    location: IGeoPoint | null;
    placeholder: string;
}

export function LocationDisplay({location, placeholder}: LocationDisplayProps) {
    if (!location) {
        return (
            <div className='p-3 border border-dashed border-gray-300 rounded-md bg-gray-50 text-gray-500'>
                {placeholder}
            </div>
        );
    }

    return (
        <div className='p-3 border border-green-200 rounded-md bg-green-50 space-y-1'>
            {location.address ? (
                <p className='font-medium text-green-800'>{location.address}</p>
            ) : (
                <p className='text-gray-700'>
                    {location.coordinates[1]?.toFixed(6)},{' '}
                    {location.coordinates[0]?.toFixed(6)}
                </p>
            )}
            <p className='text-xs text-gray-500'>
                Coordinates: {location.coordinates[1]?.toFixed(6)},{' '}
                {location.coordinates[0]?.toFixed(6)}
            </p>
        </div>
    );
}
