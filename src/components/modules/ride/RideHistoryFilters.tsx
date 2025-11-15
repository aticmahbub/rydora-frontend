/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {Search, Filter, X} from 'lucide-react';
import {RideStatus} from '@/constants/rideStatus';

interface FiltersProps {
    filters: {
        page: number;
        limit: number;
        search: string;
        startDate: string;
        endDate: string;
        minFare?: number;
        maxFare?: number;
        status: string;
    };
    onFiltersChange: (filters: any) => void;
}

export function RideHistoryFilters({filters, onFiltersChange}: FiltersProps) {
    const [localFilters, setLocalFilters] = useState(filters);

    // Sync local filters when props change
    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleFilterChange = (key: string, value: any) => {
        const newFilters = {...localFilters, [key]: value, page: 1};
        setLocalFilters(newFilters);
    };

    const applyFilters = () => {
        onFiltersChange(localFilters);
    };

    const resetFilters = () => {
        const resetFilters = {
            page: 1,
            limit: 10,
            search: '',
            startDate: '',
            endDate: '',
            minFare: undefined,
            maxFare: undefined,
            status: '',
        };
        setLocalFilters(resetFilters);
        onFiltersChange(resetFilters);
    };

    const hasActiveFilters =
        localFilters.search ||
        localFilters.status ||
        localFilters.startDate ||
        localFilters.endDate ||
        localFilters.minFare ||
        localFilters.maxFare;

    return (
        <Card className='mb-6'>
            <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                    <CardTitle className='text-lg flex items-center gap-2'>
                        <Filter className='h-5 w-5' />
                        Filter Rides
                    </CardTitle>
                    <div className='flex gap-2'>
                        {hasActiveFilters && (
                            <Button
                                variant='outline'
                                size='sm'
                                onClick={resetFilters}
                            >
                                <X className='h-4 w-4 mr-1' />
                                Clear
                            </Button>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {/* always visible filters */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {/* Search */}
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>
                            Search Address
                        </label>
                        <div className='relative'>
                            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                            <Input
                                placeholder='Search locations...'
                                value={localFilters.search}
                                onChange={(e) =>
                                    handleFilterChange('search', e.target.value)
                                }
                                className='pl-10'
                            />
                        </div>
                    </div>

                    {/* status */}
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Status</label>
                        <Select
                            value={localFilters.status}
                            onValueChange={(value) =>
                                handleFilterChange('status', value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder='All Statuses' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='ALL'>
                                    All Statuses
                                </SelectItem>
                                <SelectItem value={RideStatus.REQUESTED}>
                                    Requested
                                </SelectItem>
                                <SelectItem value={RideStatus.ACCEPTED}>
                                    Accepted
                                </SelectItem>
                                <SelectItem value={RideStatus.IN_PROGRESS}>
                                    In Progress
                                </SelectItem>
                                <SelectItem value={RideStatus.COMPLETED}>
                                    Completed
                                </SelectItem>
                                <SelectItem value={RideStatus.CANCELLED}>
                                    Cancelled
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* date range */}

                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>
                            Start Date
                        </label>
                        <Input
                            type='date'
                            value={localFilters.startDate}
                            onChange={(e) =>
                                handleFilterChange('startDate', e.target.value)
                            }
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>End Date</label>
                        <Input
                            type='date'
                            value={localFilters.endDate}
                            onChange={(e) =>
                                handleFilterChange('endDate', e.target.value)
                            }
                        />
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t'>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>
                            Min Fare (৳)
                        </label>
                        <Input
                            type='number'
                            placeholder='0'
                            min='0'
                            value={localFilters.minFare || ''}
                            onChange={(e) =>
                                handleFilterChange(
                                    'minFare',
                                    e.target.value
                                        ? Number(e.target.value)
                                        : undefined,
                                )
                            }
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>
                            Max Fare (৳)
                        </label>
                        <Input
                            type='number'
                            placeholder='1000'
                            min='0'
                            value={localFilters.maxFare || ''}
                            onChange={(e) =>
                                handleFilterChange(
                                    'maxFare',
                                    e.target.value
                                        ? Number(e.target.value)
                                        : undefined,
                                )
                            }
                        />
                    </div>
                </div>

                {/* active filters badges */}
                {hasActiveFilters && (
                    <div className='mt-4 flex flex-wrap gap-2'>
                        {localFilters.search && (
                            <span className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800'>
                                Search: {localFilters.search}
                            </span>
                        )}
                        {localFilters.status &&
                            localFilters.status !== 'ALL' && (
                                <span className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800'>
                                    Status: {localFilters.status}
                                </span>
                            )}
                        {localFilters.startDate && (
                            <span className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800'>
                                From: {localFilters.startDate}
                            </span>
                        )}
                        {localFilters.endDate && (
                            <span className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800'>
                                To: {localFilters.endDate}
                            </span>
                        )}
                        {(localFilters.minFare || localFilters.maxFare) && (
                            <span className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800'>
                                Fare: {localFilters.minFare || 0} -{' '}
                                {localFilters.maxFare || '∞'}
                            </span>
                        )}
                    </div>
                )}

                {/* action buttons */}
                <div className='flex gap-3 mt-6'>
                    <Button onClick={applyFilters} className='flex-1'>
                        Apply Filters
                    </Button>
                    <Button variant='outline' onClick={resetFilters}>
                        Reset All
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
