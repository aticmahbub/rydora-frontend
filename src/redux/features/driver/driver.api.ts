import {baseApi} from '@/redux/baseApi';

export const driverApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        driverRegistration: builder.mutation({
            query: (driverInfo) => {
                console.log(
                    'Sending driver registration driverInfo:',
                    driverInfo,
                );
                return {
                    url: '/driver/register',
                    method: 'POST',
                    data: driverInfo,
                };
            },
        }),
    }),
});

export const {useDriverRegistrationMutation} = driverApi;
