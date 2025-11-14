import {RideCard} from './RideCard';
import type {IRide} from '@/types/location.types';

interface RideListProps {
    rides: IRide[];
    selectedRideId: string | null;
    onRideSelect: (rideId: string) => void;
    className?: string;
}

export function RideList({
    rides,
    selectedRideId,
    onRideSelect,
    className = '',
}: RideListProps) {
    return (
        <div className={`flex flex-col gap-2 overflow-y-auto ${className}`}>
            {rides.map((ride) => (
                <RideCard
                    key={ride._id}
                    ride={ride}
                    isSelected={ride._id === selectedRideId}
                    onSelect={onRideSelect}
                />
            ))}
        </div>
    );
}
