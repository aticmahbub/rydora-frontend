import type {RegistrationFormData} from '@/components/modules/user/registration/registrationFormSchema';
import type {UpdateUserFormData} from '@/components/modules/user/UpdateUserForm';
import {baseApi} from '@/redux/baseApi';
import type {Response, UserData} from '@/types';

export interface GetUsersParams {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    isActive?: boolean;
}

export interface UpdateUserPayload {
    userId: string;
    payload: UpdateUserFormData;
}

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Register new user
        register: builder.mutation<Response<UserData>, RegistrationFormData>({
            query: (userInfo) => ({
                url: '/user/register',
                method: 'POST',
                data: userInfo,
            }),
        }),

        // Get current user info
        userInfo: builder.query({
            query: () => ({
                url: '/user/info',
                method: 'GET',
            }),
            providesTags: ['USER'],
        }),

        // Get user info by ID
        getUserById: builder.query<Response<UserData>, string>({
            query: (userId) => ({
                url: `/user/${userId}`,
                method: 'GET',
            }),
            providesTags: [],
        }),

        // Get all users (for admin)
        getUsers: builder.query<
            Response<{users: UserData[]; total: number; page: number}>,
            GetUsersParams
        >({
            query: (params) => {
                const searchParams = new URLSearchParams();
                if (params.page)
                    searchParams.append('page', params.page.toString());
                if (params.limit)
                    searchParams.append('limit', params.limit.toString());
                if (params.search) searchParams.append('search', params.search);
                if (params.role) searchParams.append('role', params.role);
                if (params.isActive !== undefined)
                    searchParams.append('isActive', params.isActive.toString());

                return {
                    url: `/user?${searchParams.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: [],
        }),

        // Update user
        updateUser: builder.mutation<Response<UserData>, UpdateUserPayload>({
            query: ({userId, payload}) => ({
                url: `/user/${userId}`,
                method: 'PATCH',
                data: payload,
            }),
            invalidatesTags: [],
            // Optimistic updates
            onQueryStarted: async (
                {userId, payload},
                {dispatch, queryFulfilled},
            ) => {
                const patchResult = dispatch(
                    userApi.util.updateQueryData(
                        'getUserById',
                        userId,
                        (draft) => {
                            if (draft?.data) {
                                Object.assign(draft.data, payload);
                            }
                        },
                    ),
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        // Delete user (soft delete)
        deleteUser: builder.mutation<Response<null>, string>({
            query: (userId) => ({
                url: `/user/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [],
        }),

        // Bulk update users
        bulkUpdateUsers: builder.mutation<
            Response<{updatedCount: number}>,
            {userIds: string[]; payload: Partial<UserData>}
        >({
            query: ({userIds, payload}) => ({
                url: '/user/bulk-update',
                method: 'PATCH',
                data: {userIds, payload},
            }),
            invalidatesTags: [],
        }),

        // Update current user profile
        updateProfile: builder.mutation<Response<UserData>, UpdateUserFormData>(
            {
                query: (payload) => ({
                    url: '/user/profile',
                    method: 'PATCH',
                    data: payload,
                }),
                invalidatesTags: ['USER'],
            },
        ),
    }),
});

export const {
    useRegisterMutation,
    useUserInfoQuery,
    useGetUserByIdQuery,
    useGetUsersQuery,
    useUpdateUserMutation,
    useUpdateProfileMutation,
    useDeleteUserMutation,
    useBulkUpdateUsersMutation,
} = userApi;
