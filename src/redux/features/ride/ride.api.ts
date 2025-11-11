import {baseApi} from '@/redux/baseApi';
import type {IResponse} from '@/types';
import type {IRide, IRideResponse} from '@/types';

export const rideApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //
        requestRide: builder.mutation<IResponse<IRideResponse>, IRide>({
            query: (rideInfo) => ({
                url: '/ride/request',
                method: 'POST',
                data: rideInfo,
            }),
        }),
        // userInfo: builder.query({
        //     query: () => ({
        //         url: '/user/info',
        //         method: 'GET',
        //     }),
        //     providesTags: ['USER'],
        // }),
    }),
});

export const {useRequestRideMutation} = rideApi;
