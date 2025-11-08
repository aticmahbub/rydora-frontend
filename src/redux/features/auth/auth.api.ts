import {baseApi} from '@/redux/baseApi';
import type {ILoginFormData, IUserData} from '@/types';

import type {IResponse} from '@/types/response.types';

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //
        login: builder.mutation<IResponse<IUserData>, ILoginFormData>({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                data: userInfo,
            }),
        }),
    }),
});

export const {useLoginMutation} = authApi;
