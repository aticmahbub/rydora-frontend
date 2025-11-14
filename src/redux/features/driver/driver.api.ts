import {baseApi} from '@/redux/baseApi';

// interface InsuranceData {
//     provider: string;
//     policyNo: string;
//     expiryDate: string;
//     document: string;
// }

// interface VehicleData {
//     registrationNo: string;
//     vehicleType: string;
//     brand: string;
//     model: string;
//     color: string;
//     manufacturingYear: number;
//     capacity: number;
//     registrationCard: string;
//     insurance: InsuranceData;
// }

// interface DriverRegistrationRequest {
//     drivingLicenseNo: string;
//     vehicle: VehicleData;
// }

export const driverApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        driverRegistration: builder.mutation({
            query: (driverInfo) => {
                console.log(
                    'Sending driver registration driverInfo:',
                    driverInfo,
                ); // Debug log
                return {
                    url: '/driver/register',
                    method: 'POST',
                    data: driverInfo,
                };
            },
            // invalidatesTags: ['VEHICLE'],
        }),
        // ... other endpoints
    }),

    // getDriverProfile: builder.query({
    //     query: () => '/driver/profile',
    //     providesTags: ['DRIVER'],
    // }),

    // getDriverVehicles: builder.query({
    //     query: () => '/driver/vehicles',
    //     providesTags: ['VEHICLE'],
    // }),

    // updateDriverStatus: builder.mutation({
    //     query: (status: string) => ({
    //         url: '/driver/status',
    //         method: 'PATCH',
    //         body: {status},
    //     }),
    //     invalidatesTags: ['DRIVER'],
    // }),
});

export const {
    useDriverRegistrationMutation,
    // useGetDriverProfileQuery,
    // useGetDriverVehiclesQuery,
    // useUpdateDriverStatusMutation,
} = driverApi;
