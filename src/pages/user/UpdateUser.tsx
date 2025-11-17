import {useParams, useNavigate} from 'react-router';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {ArrowLeft} from 'lucide-react';
import {UpdateUserForm} from '@/components/modules/user/UpdateUserForm';
import {
    useGetUserByIdQuery,
    useUserInfoQuery,
} from '@/redux/features/user/user.api';
import {role} from '@/constants/role';

export default function UpdateUser() {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data} = useUserInfoQuery(undefined);
    const currentUser = data?.data;
    console.log(currentUser);
    console.log(id);

    const {
        data: userData,
        isLoading,
        error,
    } = useGetUserByIdQuery(id!, {
        skip: !id,
    });

    // Check if user has permission to edit this user
    const canEditUser = () => {
        if (!currentUser || !userData?.data) return false;

        // Super admin can edit anyone
        if (currentUser.role === role.SUPER_ADMIN) return true;

        // Admin can edit anyone except super admin
        if (currentUser.role === role.ADMIN) {
            return userData.data.role !== role.SUPER_ADMIN;
        }

        // Drivers and riders can only edit themselves
        if (
            currentUser.role === role.DRIVER ||
            currentUser.role === role.RIDER
        ) {
            return currentUser.userId === id;
        }

        return false;
    };

    const handleSuccess = () => {
        // Optional: Add any success handling logic
        console.log('User updated successfully');
    };

    if (isLoading) {
        return (
            <div className='container mx-auto py-8'>
                <div className='max-w-2xl mx-auto'>
                    <Card>
                        <CardContent className='p-8'>
                            <div className='flex justify-center items-center'>
                                <div className='text-lg'>
                                    Loading user data...
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='container mx-auto py-8'>
                <div className='max-w-2xl mx-auto'>
                    <Card>
                        <CardContent className='p-8'>
                            <div className='text-center text-red-500'>
                                <h2 className='text-xl font-semibold mb-2'>
                                    Error
                                </h2>
                                <p>
                                    Failed to load user data. Please try again.
                                </p>
                                <Button
                                    onClick={() => navigate(-1)}
                                    className='mt-4'
                                >
                                    Go Back
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    if (!canEditUser()) {
        return (
            <div className='container mx-auto py-8'>
                <div className='max-w-2xl mx-auto'>
                    <Card>
                        <CardContent className='p-8'>
                            <div className='text-center text-red-500'>
                                <h2 className='text-xl font-semibold mb-2'>
                                    Access Denied
                                </h2>
                                <p>
                                    You don't have permission to edit this user.
                                </p>
                                <Button
                                    onClick={() => navigate(-1)}
                                    className='mt-4'
                                >
                                    Go Back
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className='container mx-auto py-8'>
            <div className='max-w-2xl mx-auto space-y-6'>
                {/* Header */}
                <div className='flex items-center gap-4'>
                    <Button
                        variant='outline'
                        size='icon'
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className='h-4 w-4' />
                    </Button>
                    <div>
                        <h1 className='text-3xl font-bold tracking-tight'>
                            {currentUser?.userId === id
                                ? 'Update Profile'
                                : 'Update User'}
                        </h1>
                        <p className='text-muted-foreground'>
                            {currentUser?.userId === id
                                ? 'Update your personal information'
                                : `Update information for ${
                                      userData?.data?.name || 'user'
                                  }`}
                        </p>
                    </div>
                </div>

                {/* User Info Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>User Information</CardTitle>
                        <CardDescription>Current user details</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-2'>
                        <div className='grid grid-cols-2 gap-4 text-sm'>
                            <div>
                                <span className='font-medium'>Name:</span>
                                <p>{userData?.data?.name || 'Not provided'}</p>
                            </div>
                            <div>
                                <span className='font-medium'>Email:</span>
                                <p>{userData?.data?.email}</p>
                            </div>
                            <div>
                                <span className='font-medium'>Role:</span>
                                <p className='capitalize'>
                                    {userData?.data?.role
                                        ?.toLowerCase()
                                        .replace('_', ' ')}
                                </p>
                            </div>
                            <div>
                                <span className='font-medium'>Status:</span>
                                <p>
                                    {userData?.data?.isActive
                                        ? 'Active'
                                        : 'Inactive'}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Update Form */}
                <Card>
                    <CardContent className='p-6'>
                        <UpdateUserForm userId={id} onSuccess={handleSuccess} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
