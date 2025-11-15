import {baseApi} from '@/redux/baseApi';
import type {IResponse} from '@/types';
import type {IRide, IRideResponse} from '@/types';

export interface RideHistoryParams {
    page?: number;
    limit?: number;
    search?: string;
    startDate?: string;
    endDate?: string;
    minFare?: number;
    maxFare?: number;
    status?: string;
}

export const rideApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //
        requestRide: builder.mutation<IResponse<IRideResponse>, Partial<IRide>>(
            {
                query: (rideInfo) => ({
                    url: '/ride/request',
                    method: 'POST',
                    data: rideInfo,
                }),
            },
        ),
        findRide: builder.query({
            query: () => ({
                url: '/ride/find',
                method: 'GET',
            }),
            providesTags: ['RIDE'],
        }),

        getRideHistory: builder.query({
            query: (params: RideHistoryParams = {}) => {
                const searchParams = new URLSearchParams();

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
                if (params.status) searchParams.append('status', params.status);

                return {
                    url: `/rides/history?${searchParams.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['RIDE_HISTORY'],
        }),

        getRideStats: builder.query({
            query: () => ({
                url: '/rides/stats',
                method: 'GET',
            }),
            providesTags: ['RIDE_STATS'],
        }),
    }),
});

export const {
    useRequestRideMutation,
    useFindRideQuery,
    useGetRideHistoryQuery,
    useGetRideStatsQuery,
} = rideApi;
