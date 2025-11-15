/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from 'react';
import {useGetRideHistoryQuery} from '@/redux/features/ride/ride.api';
import {RideHistoryCard} from '@/components/modules/ride/RideHistoryCard';
import {Pagination} from '@/components/ui/pagination';
import {Spinner} from '@/components/ui/Spinner';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {RideHistoryFilters} from '@/components/modules/ride/RideHistoryFilters';
import {useNavigate} from 'react-router';

export default function RideHistory() {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        search: '',
        startDate: '',
        endDate: '',
        minFare: undefined as number | undefined,
        maxFare: undefined as number | undefined,
        status: 'ALL',
    });

    const {data, isLoading, error, refetch} = useGetRideHistoryQuery(filters);

    const handleViewDetails = (rideId: string) => {
        console.log('View ride details:', rideId);
        navigate(`/rider/ride/${rideId}`);
    };

    const handleRetry = () => {
        refetch();
    };

    const rides = data?.data?.rides || [];
    const pagination = data?.data?.pagination;

    if (error) {
        console.error('Ride History Error:', error);
        return (
            <div className='container mx-auto p-4 max-w-6xl'>
                <Alert variant='destructive' className='mb-6'>
                    <AlertDescription>
                        Failed to load ride history. Please try again later.
                    </AlertDescription>
                </Alert>
                <Button onClick={handleRetry}>Retry</Button>
            </div>
        );
    }

    return (
        <div className='container mx-auto p-4 max-w-6xl'>
            <div className='mb-6'>
                <h1 className='text-3xl font-bold text-gray-900'>
                    Ride History
                </h1>
                <p className='text-gray-600 mt-2'>
                    View your past rides and filter by various criteria
                </p>
            </div>

            {/* Filters */}
            <RideHistoryFilters
                filters={filters}
                onFiltersChange={setFilters}
            />

            {/* Results Count */}
            {!isLoading && rides.length > 0 && (
                <div className='mb-4 flex justify-between items-center'>
                    <p className='text-sm text-gray-600'>
                        Showing {rides.length} of {pagination?.total || 0} rides
                    </p>
                    {pagination && (
                        <p className='text-sm text-gray-600'>
                            Page {pagination.page} of {pagination.totalPages}
                        </p>
                    )}
                </div>
            )}

            {/* Loading State */}
            {isLoading && (
                <div className='flex justify-center items-center h-32'>
                    <Spinner size='lg' />
                    <span className='ml-2'>Loading ride history...</span>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && data && rides.length === 0 && (
                <Card>
                    <CardContent className='p-8 text-center'>
                        <div className='w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                            <span className='text-2xl'>🚗</span>
                        </div>
                        <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                            No rides found
                        </h3>
                        <p className='text-gray-600'>
                            {filters.search ||
                            (filters.status && filters.status !== 'ALL') ||
                            filters.startDate
                                ? 'Try adjusting your filters to see more results.'
                                : "You haven't taken any rides yet."}
                        </p>
                        {(filters.search ||
                            (filters.status && filters.status !== 'ALL') ||
                            filters.startDate) && (
                            <Button
                                variant='outline'
                                onClick={() =>
                                    setFilters({
                                        page: 1,
                                        limit: 10,
                                        search: '',
                                        startDate: '',
                                        endDate: '',
                                        minFare: undefined,
                                        maxFare: undefined,
                                        status: 'ALL',
                                    })
                                }
                                className='mt-4'
                            >
                                Clear All Filters
                            </Button>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Ride List */}
            {!isLoading && rides.length > 0 && (
                <div className='space-y-4'>
                    {rides.map((ride: any) => (
                        <RideHistoryCard
                            key={ride._id}
                            ride={ride}
                            onViewDetails={handleViewDetails}
                        />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <div className='mt-6'>
                    <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        onPageChange={(page) =>
                            setFilters((prev) => ({...prev, page}))
                        }
                    />
                </div>
            )}
        </div>
    );
}
