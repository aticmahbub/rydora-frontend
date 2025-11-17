/* eslint-disable @typescript-eslint/no-unused-vars */
import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import {Input} from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router';
import {
    useUpdateUserMutation,
    useGetUserByIdQuery,
    useUpdateProfileMutation,
    useUserInfoQuery,
} from '@/redux/features/user/user.api';
import {toast} from 'sonner';
import {useEffect} from 'react';
import type {IErrorResponse} from '@/types';
import {role} from '@/constants/role';
import {Switch} from '@/components/ui/switch';

// Zod schema based on your backend validation
// eslint-disable-next-line react-refresh/only-export-components
export const updateUserFormSchema = z
    .object({
        name: z.string().min(1, 'Name is required').optional(),
        email: z.string().email('Invalid email address').optional(),
        phone: z.string().optional(),
        role: z
            .enum([role.ADMIN, role.SUPER_ADMIN, role.DRIVER, role.RIDER])
            .optional(),
        isActive: z.boolean().optional(),
        isVerified: z.boolean().optional(),
        profileImage: z
            .string()
            .url('Invalid URL')
            .optional()
            .or(z.literal('')),
        password: z
            .string()
            .min(6, 'Password must be at least 6 characters')
            .optional()
            .or(z.literal('')),
    })
    .refine(
        (data) => {
            // Ensure at least one field is provided
            return Object.values(data).some(
                (value) => value !== undefined && value !== '',
            );
        },
        {
            message: 'At least one field must be updated',
            path: ['root'],
        },
    );

export type UpdateUserFormData = z.infer<typeof updateUserFormSchema>;

interface UpdateUserFormProps extends React.ComponentProps<'form'> {
    userId?: string;
    onSuccess?: () => void;
}

export function UpdateUserForm({
    className,
    userId: propUserId,
    onSuccess,
    ...props
}: UpdateUserFormProps) {
    const navigate = useNavigate();
    const params = useParams();
    const {data: currentUser} = useUserInfoQuery(undefined);

    const userId = propUserId || params.id;
    const isEditingSelf = currentUser?._id === userId;

    const [updateUser, {isLoading: isUpdating}] = useUpdateUserMutation();
    const [updateProfile] = useUpdateProfileMutation();
    const {
        data: userData,
        isLoading: isLoadingUser,
        error,
    } = useGetUserByIdQuery(userId!, {
        skip: !userId,
    });

    const form = useForm<UpdateUserFormData>({
        resolver: zodResolver(updateUserFormSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            role: undefined,
            isActive: undefined,
            isVerified: undefined,
            profileImage: '',
            password: '',
        },
    });

    // Populate form with user data when loaded
    useEffect(() => {
        if (userData?.data) {
            const user = userData.data;
            form.reset({
                name: user.name || '',
                email: user.email || '',
                // phone: user.phone || '',
                role: user.role,
                // isActive: user.isActive,
                isVerified: user.isVerified,
                // profileImage: user.profileImage || '',
                password: '', // Don't pre-fill password
            });
        }
    }, [userData, form]);

    const onSubmit = async (data: UpdateUserFormData) => {
        if (!userId) {
            toast.error('User ID is required');
            return;
        }

        const toastId = toast.loading('Updating user information...');

        // Filter out undefined and empty values
        const payload = Object.fromEntries(
            Object.entries(data).filter(
                ([_, value]) =>
                    value !== undefined && value !== '' && value !== null,
            ),
        );

        // Remove password if empty
        if (!payload.password) {
            delete payload.password;
        }

        console.log('Update payload:', payload);

        try {
            let res;
            if (isEditingSelf) {
                // Use updateProfile for self-update
                res = await updateProfile(payload).unwrap();
            } else {
                // Use updateUser for other users
                res = await updateUser({userId, payload}).unwrap();
            }

            if (res.success) {
                toast.success('User updated successfully', {id: toastId});

                if (onSuccess) {
                    onSuccess();
                } else {
                    // Redirect based on current user's role
                    setTimeout(() => {
                        if (
                            currentUser?.role === role.ADMIN ||
                            currentUser?.role === role.SUPER_ADMIN
                        ) {
                            navigate('/admin/users');
                        } else {
                            navigate('/profile');
                        }
                    }, 1000);
                }
            } else {
                toast.error('Failed to update user', {id: toastId});
            }
        } catch (err) {
            console.log(err);
            const error = err as IErrorResponse;
            const message = error?.data?.message;
            const status = error?.status;

            switch (status) {
                case 400:
                    toast.error('You are not authorized to update this user', {
                        id: toastId,
                    });
                    break;
                case 401:
                    toast.error('You are unauthorized to perform this action', {
                        id: toastId,
                    });
                    break;
                case 403:
                    toast.error(
                        message ||
                            'You are not authorized to perform this action',
                        {id: toastId},
                    );
                    break;
                case 404:
                    toast.error('User not found', {id: toastId});
                    navigate('/admin/users');
                    break;
                case 409:
                    toast.error('Email already exists', {id: toastId});
                    break;
                default:
                    toast.error(
                        'Something went wrong. Please try again later.',
                        {id: toastId},
                    );
                    break;
            }
        }
    };

    // Determine which fields are editable based on current user's role
    const canEditRole = currentUser?.role === role.SUPER_ADMIN;
    const canEditStatus =
        currentUser?.role === role.SUPER_ADMIN ||
        currentUser?.role === role.ADMIN;
    const isDriverOrRider =
        currentUser?.role === role.DRIVER || currentUser?.role === role.RIDER;

    if (isLoadingUser) {
        return (
            <div className='flex justify-center items-center p-8'>
                <div className='text-lg'>Loading user data...</div>
            </div>
        );
    }

    if (error) {
        const err = error as IErrorResponse;
        return (
            <div className='flex justify-center items-center p-8'>
                <div className='text-lg text-red-500'>
                    {err?.data?.message || 'Error loading user data'}
                </div>
            </div>
        );
    }

    return (
        <form
            id='update-user-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn('flex flex-col gap-6', className)}
            {...props}
        >
            <FieldGroup>
                <div className='flex flex-col items-center gap-1 text-center'>
                    <h1 className='text-2xl font-bold'>
                        {isEditingSelf
                            ? 'Update Your Profile'
                            : 'Update User Information'}
                    </h1>
                    <p className='text-muted-foreground text-sm text-balance'>
                        {isEditingSelf
                            ? 'Update your personal details'
                            : 'Update user details and permissions'}
                    </p>
                </div>

                {/* Basic Information */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <Controller
                        name='name'
                        control={form.control}
                        render={({field}) => (
                            <Field>
                                <FieldLabel htmlFor='name'>
                                    Full Name
                                </FieldLabel>
                                <Input
                                    {...field}
                                    placeholder='John Doe'
                                    disabled={isUpdating}
                                />
                                <FieldDescription className='text-red-500'>
                                    {form.formState.errors.name?.message}
                                </FieldDescription>
                            </Field>
                        )}
                    />

                    <Controller
                        name='email'
                        control={form.control}
                        render={({field}) => (
                            <Field>
                                <FieldLabel htmlFor='email'>Email</FieldLabel>
                                <Input
                                    {...field}
                                    type='email'
                                    placeholder='john@example.com'
                                    disabled={isUpdating}
                                />
                                <FieldDescription className='text-red-500'>
                                    {form.formState.errors.email?.message}
                                </FieldDescription>
                            </Field>
                        )}
                    />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <Controller
                        name='phone'
                        control={form.control}
                        render={({field}) => (
                            <Field>
                                <FieldLabel htmlFor='phone'>
                                    Phone Number
                                </FieldLabel>
                                <Input
                                    {...field}
                                    placeholder='+1 (555) 123-4567'
                                    disabled={isUpdating}
                                />
                                <FieldDescription className='text-red-500'>
                                    {form.formState.errors.phone?.message}
                                </FieldDescription>
                            </Field>
                        )}
                    />

                    <Controller
                        name='password'
                        control={form.control}
                        render={({field}) => (
                            <Field>
                                <FieldLabel htmlFor='password'>
                                    New Password
                                </FieldLabel>
                                <Input
                                    {...field}
                                    type='password'
                                    placeholder='Leave blank to keep current'
                                    disabled={isUpdating}
                                />
                                <FieldDescription className='text-red-500'>
                                    {form.formState.errors.password?.message}
                                </FieldDescription>
                            </Field>
                        )}
                    />
                </div>

                <Controller
                    name='profileImage'
                    control={form.control}
                    render={({field}) => (
                        <Field>
                            <FieldLabel htmlFor='profileImage'>
                                Profile Image URL
                            </FieldLabel>
                            <Input
                                {...field}
                                placeholder='https://example.com/image.jpg'
                                disabled={isUpdating}
                            />
                            <FieldDescription className='text-red-500'>
                                {form.formState.errors.profileImage?.message}
                            </FieldDescription>
                        </Field>
                    )}
                />

                {/* Role Selection - Only for Super Admin */}
                {canEditRole && !isEditingSelf && (
                    <Controller
                        name='role'
                        control={form.control}
                        render={({field}) => (
                            <Field>
                                <FieldLabel htmlFor='role'>
                                    User Role
                                </FieldLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    disabled={isUpdating}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select a role' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={role.SUPER_ADMIN}>
                                            Super Admin
                                        </SelectItem>
                                        <SelectItem value={role.ADMIN}>
                                            Admin
                                        </SelectItem>
                                        <SelectItem value={role.DRIVER}>
                                            Driver
                                        </SelectItem>
                                        <SelectItem value={role.RIDER}>
                                            Rider
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FieldDescription className='text-red-500'>
                                    {form.formState.errors.role?.message}
                                </FieldDescription>
                            </Field>
                        )}
                    />
                )}

                {/* Status Fields - Only for Admin/Super Admin */}
                {canEditStatus && !isEditingSelf && (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Controller
                            name='isActive'
                            control={form.control}
                            render={({field}) => (
                                <Field className='flex items-center justify-between space-x-2 p-4 border rounded-lg'>
                                    <div>
                                        <FieldLabel
                                            htmlFor='isActive'
                                            className='text-base'
                                        >
                                            Active Status
                                        </FieldLabel>
                                        <FieldDescription>
                                            User account is active and can
                                            access the system
                                        </FieldDescription>
                                    </div>
                                    <Switch
                                        checked={field.value || false}
                                        onCheckedChange={field.onChange}
                                        disabled={isUpdating}
                                    />
                                </Field>
                            )}
                        />

                        <Controller
                            name='isVerified'
                            control={form.control}
                            render={({field}) => (
                                <Field className='flex items-center justify-between space-x-2 p-4 border rounded-lg'>
                                    <div>
                                        <FieldLabel
                                            htmlFor='isVerified'
                                            className='text-base'
                                        >
                                            Verified Status
                                        </FieldLabel>
                                        <FieldDescription>
                                            User email is verified
                                        </FieldDescription>
                                    </div>
                                    <Switch
                                        checked={field.value || false}
                                        onCheckedChange={field.onChange}
                                        disabled={isUpdating}
                                    />
                                </Field>
                            )}
                        />
                    </div>
                )}

                {/* Root error message */}
                {form.formState.errors.root && (
                    <FieldDescription className='text-red-500 text-center'>
                        {form.formState.errors.root.message}
                    </FieldDescription>
                )}

                <div className='flex gap-4 pt-4'>
                    <Button
                        type='button'
                        variant='outline'
                        onClick={() => navigate(-1)}
                        disabled={isUpdating}
                    >
                        Cancel
                    </Button>
                    <Button
                        type='submit'
                        disabled={isUpdating || !form.formState.isDirty}
                        className='flex-1'
                    >
                        {isUpdating ? 'Updating...' : 'Update User'}
                    </Button>
                </div>

                {/* Permission hints */}
                <Field>
                    <FieldDescription className='text-center text-sm'>
                        {isDriverOrRider &&
                            'You can only update your own information'}
                        {canEditStatus &&
                            !canEditRole &&
                            'You can update user status but not roles'}
                        {canEditRole &&
                            'You have full permissions to update all user fields'}
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    );
}
