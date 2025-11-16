import {baseApi} from '@/redux/baseApi';
import type {ILoginFormData, UserData} from '@/types';

import type {Response} from '@/types/response.types';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //
        login: builder.mutation<Response<UserData>, ILoginFormData>({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                data: userInfo,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['USER'],
        }),
    }),
});

export const {useLoginMutation, useLogoutMutation} = authApi;
