import type {LoginFormData} from '@/components/modules/auth/login/loginFormSchema';
import {baseApi} from '@/redux/baseApi';
import type {UserData} from '@/types';

import type {Response} from '@/types/response.types';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //
        login: builder.mutation<Response<UserData>, LoginFormData>({
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
