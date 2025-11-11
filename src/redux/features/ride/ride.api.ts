import {baseApi} from '@/redux/baseApi';

export const rideApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //
        requestRide: builder.mutation<IResponse<IUserData>, IRegisterFormData>({
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

export const {useRegisterMutation, useUserInfoQuery} = rideApi;
