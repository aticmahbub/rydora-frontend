import {RideCard} from './RideCard';
import type {IRide} from '@/types/location.types';

interface RideListProps {
    rides: IRide[];
    selectedRideId: string | null;
    onRideSelect: (rideId: string) => void;
    onAcceptRide?: (rideId: string) => void;
    className?: string;
}

export function RideList({
    rides,
    selectedRideId,
    onRideSelect,
    onAcceptRide,
    className = '',
}: RideListProps) {
    const handleAcceptRide = (rideId: string) => {
        console.log('Accepting ride:', rideId);
        // Add your accept ride logic here
        if (onAcceptRide) {
            onAcceptRide(rideId);
        }
    };

    return (
        <div className={`flex flex-col gap-3 overflow-y-auto p-4 ${className}`}>
            {rides.map((ride) => (
                <RideCard
                    key={ride._id}
                    ride={ride}
                    isSelected={ride._id === selectedRideId}
                    onSelect={onRideSelect}
                    onAcceptRide={handleAcceptRide}
                />
            ))}
        </div>
    );
}
