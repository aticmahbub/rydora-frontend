// src/context/LocationContext.tsx
import {DEFAULT_COORDINATES} from '@/constants/defaultCoordinates';
import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from 'react';

interface Location {
    lat: number;
    lng: number;
}

interface LocationContextType {
    location: Location | null;
    setLocation: (loc: Location) => void;
    loading: boolean;
    error: string | null;
}

const LocationContext = createContext<LocationContextType | undefined>(
    undefined,
);

export const LocationProvider = ({children}: {children: ReactNode}) => {
    const [location, setLocation] = useState<Location | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const {latitude, longitude} = pos.coords;
                setLocation({lat: latitude, lng: longitude});
                setLoading(false);
            },
            (err) => {
                setError(err.message);
                setLoading(false);
                setLocation(DEFAULT_COORDINATES);
            },
            {enableHighAccuracy: true},
        );
    }, []);

    return (
        <LocationContext.Provider
            value={{location, setLocation, loading, error}}
        >
            {children}
        </LocationContext.Provider>
    );
};

export const useLocationContext = () => {
    const ctx = useContext(LocationContext);
    if (!ctx)
        throw new Error(
            'useLocationContext must be used within a LocationProvider',
        );
    return ctx;
};
