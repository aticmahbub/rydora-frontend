import {baseApi} from '@/redux/baseApi';
import type {IResponse} from '@/types';
import type {IRide, IRideResponse} from '@/types';

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
    }),
});

export const {useRequestRideMutation, useFindRideQuery} = rideApi;
