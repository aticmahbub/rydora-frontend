import type {RegistrationFormData} from '@/components/modules/user/registration/registrationFormSchema';
import {baseApi} from '@/redux/baseApi';
import type {Response, UserData} from '@/types';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //
        register: builder.mutation<Response<UserData>, RegistrationFormData>({
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
