import type {TRideStatus} from '@/constants/rideStatus';
import {baseApi} from '@/redux/baseApi';
import type {Response} from '@/types';
import type {IRide, IRideResponse} from '@/types';
import type {IRideHistoryResponse} from '@/types/ride.types';

export interface RideHistoryParams {
    page?: number;
    limit?: number;
    search?: string;
    startDate?: string;
    endDate?: string;
    minFare?: number;
    maxFare?: number;
    status?: TRideStatus;
}

export const rideApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        requestRide: builder.mutation<Response<IRideResponse>, Partial<IRide>>({
            query: (rideInfo) => ({
                url: '/ride/request',
                method: 'POST',
                data: rideInfo,
            }),
        }),

        findRide: builder.query({
            query: () => ({
                url: '/ride/find',
                method: 'GET',
            }),
            providesTags: ['RIDE'],
        }),

        getRideHistory: builder.query<
            {success: boolean; data: IRideHistoryResponse},
            {
                page?: number;
                limit?: number;
                search?: string;
                startDate?: string;
                endDate?: string;
                minFare?: number;
                maxFare?: number;
                status?: string;
            }
        >({
            query: (params = {}) => {
                const searchParams = new URLSearchParams();

                // all filter parameters
                if (params.page)
                    searchParams.append('page', params.page.toString());
                if (params.limit)
                    searchParams.append('limit', params.limit.toString());
                if (params.search) searchParams.append('search', params.search);
                if (params.startDate)
                    searchParams.append('startDate', params.startDate);
                if (params.endDate)
                    searchParams.append('endDate', params.endDate);
                if (params.minFare)
                    searchParams.append('minFare', params.minFare.toString());
                if (params.maxFare)
                    searchParams.append('maxFare', params.maxFare.toString());
                if (params.status && params.status !== 'ALL')
                    searchParams.append('status', params.status);

                const queryString = searchParams.toString();
                return {
                    url: `/ride/history${queryString ? `?${queryString}` : ''}`,
                    method: 'GET',
                };
            },
            providesTags: ['RIDE_HISTORY'],
        }),

        getRideDetails: builder.query({
            query: (rideId) => ({
                url: `/ride/${rideId}`,
                method: 'GET',
            }),

            // providesTags: (result, error, rideId) => [
            //     {type: 'RIDE_HISTORY', id: rideId},
            // ],
        }),

        // getRideStats: builder.query({
        //     query: () => ({
        //         url: '/ride/stats',
        //         method: 'GET',
        //     }),
        //     providesTags: ['RIDE_STATS'],
        // }),
    }),
});

export const {
    useRequestRideMutation,
    useFindRideQuery,
    useGetRideHistoryQuery,
    // useGetRideStatsQuery,
    useGetRideDetailsQuery,
} = rideApi;
