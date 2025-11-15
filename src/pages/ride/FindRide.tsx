import MapView from '@/components/modules/map/MapView';
import {RideList} from '@/components/modules/ride/RideList';
import {Card, CardContent} from '@/components/ui/card';
import {Spinner} from '@/components/ui/Spinner';
import {useLocationContext} from '@/contexts/location.context';
import {useFindRideQuery} from '@/redux/features/ride/ride.api';
import {useUserInfoQuery} from '@/redux/features/user/user.api';
import type {IRide} from '@/types';
import {geoPointToCoordinates} from '@/utils/locationConverter'; // Import your utility
import {useState} from 'react';

export default function FindRide() {
    const {data: ridesResponse, isLoading, error} = useFindRideQuery(undefined);
    const locationContext = useLocationContext();
    const {data: userData, isLoading: isUserDataLoading} =
        useUserInfoQuery(undefined);
    const [selectedRideId, setSelectedRideId] = useState<string | null>(null);
    const rides = ridesResponse?.data ?? [];

    if (isUserDataLoading) {
        return <Spinner />;
    }

    const userStoredLocation = userData?.data?.currentLocation
        ? geoPointToCoordinates(userData.data.currentLocation)
        : null;

    const currentUserLocation = locationContext?.location || userStoredLocation;

    console.log('Current location:', currentUserLocation);

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-64'>
                <Spinner />
                <span className='ml-2'>Loading available rides...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className='text-center p-4'>
                <Card>
                    <CardContent className='p-6'>
                        <p className='text-red-600'>
                            Failed to load rides. Please try again.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!rides || rides.length === 0) {
        return (
            <div className='text-center p-4'>
                <Card>
                    <CardContent className='p-6'>
                        <div className='space-y-3'>
                            <div className='w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center'>
                                <span className='text-2xl'>🚗</span>
                            </div>
                            <h3 className='text-lg font-semibold text-gray-900'>
                                No rides available
                            </h3>
                            <p className='text-gray-600'>
                                There are no active ride requests in your area
                                at the moment.
                            </p>
                            {currentUserLocation && (
                                <p className='text-sm text-green-600'>
                                    ✓ Your location is available on the map
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const calculateOptimalCenter = (rides: IRide[]) => {
        if (currentUserLocation) {
            return currentUserLocation;
        }

        if (rides.length === 0) return {lat: 23.8103, lng: 90.4125};

        const validRides = rides.filter(
            (r) => r?.pickupLocation?.coordinates?.[0] !== undefined,
        );

        if (validRides.length === 0) return {lat: 23.8103, lng: 90.4125};

        const total = validRides.reduce(
            (acc, ride) => {
                const coords = geoPointToCoordinates(ride.pickupLocation);
                return {
                    lat: acc.lat + coords.lat,
                    lng: acc.lng + coords.lng,
                };
            },
            {lat: 0, lng: 0},
        );

        return {
            lat: total.lat / validRides.length,
            lng: total.lng / validRides.length,
        };
    };

    const center = calculateOptimalCenter(rides);

    return (
        <div className='flex flex-col lg:flex-row gap-4 min-h-[600px]'>
            {/* Ride List */}
            <div className='w-full lg:w-96'>
                <div className='bg-white rounded-lg shadow-sm border'>
                    <div className='p-4 border-b'>
                        <div className='flex justify-between items-start'>
                            <div>
                                <h2 className='text-lg font-semibold text-gray-900'>
                                    Available Rides
                                </h2>
                                <p className='text-sm text-gray-600'>
                                    {rides.length} ride
                                    {rides.length !== 1 ? 's' : ''} found
                                </p>
                            </div>
                            {currentUserLocation && (
                                <div className='flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded'>
                                    <div className='w-2 h-2 bg-green-500 rounded-full mr-1'></div>
                                    Your location
                                </div>
                            )}
                        </div>
                    </div>
                    <RideList
                        rides={rides}
                        selectedRideId={selectedRideId}
                        onRideSelect={setSelectedRideId}
                        className='max-h-[500px] lg:max-h-[600px]'
                    />
                </div>
            </div>

            {/* Map Section */}
            <div className='flex-1 min-h-[400px] lg:min-h-[600px]'>
                <div className='bg-white rounded-lg shadow-sm border h-full'>
                    <div className='p-4 border-b'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <h2 className='text-lg font-semibold text-gray-900'>
                                    Ride Map
                                </h2>
                                <p className='text-sm text-gray-600'>
                                    Click on markers to view ride details
                                </p>
                            </div>
                            <div className='flex items-center gap-2 text-sm'>
                                {currentUserLocation && (
                                    <div className='flex items-center text-green-600'>
                                        <div className='w-3 h-3 bg-green-500 rounded-full mr-1'></div>
                                        You are here
                                    </div>
                                )}
                                <div className='flex items-center text-blue-600'>
                                    <div className='w-3 h-3 bg-blue-500 rounded-full mr-1'></div>
                                    Ride requests
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='h-[calc(100%-80px)]'>
                        <MapView
                            rides={rides}
                            selectedRideId={selectedRideId}
                            onSelectRide={setSelectedRideId}
                            center={center}
                            zoom={currentUserLocation ? 14 : 12}
                            userLocation={currentUserLocation} // Pass to MapView
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
