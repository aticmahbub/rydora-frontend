import {baseApi} from '@/redux/baseApi';
import type {IRegisterFormData, IResponse, IUserData} from '@/types';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //
        register: builder.mutation<IResponse<IUserData>, IRegisterFormData>({
            query: (userInfo) => ({
                url: '/user/register',
                method: 'POST',
                data: userInfo,
            }),
        }),
        userInfo: builder.query({
            query: () => ({
                url: '/user/info',
                method: 'GET',
            }),
            providesTags: ['USER'],
        }),
    }),
});

export const {useRegisterMutation, useUserInfoQuery} = userApi;
