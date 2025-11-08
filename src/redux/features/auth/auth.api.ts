import {baseApi} from '@/redux/baseApi';
import type {ILoginFormData, IRegisterFormData, IUserData} from '@/types';

import type {IResponse} from '@/types/response.types';

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<IResponse<IUserData>, IRegisterFormData>({
            query: (userInfo) => ({
                url: '/user/register',
                method: 'POST',
                data: userInfo,
            }),
        }),
        login: builder.mutation<IResponse<IUserData>, ILoginFormData>({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                data: userInfo,
            }),
        }),
    }),
});

export const {useRegisterMutation, useLoginMutation} = authApi;
