import {useNavigate} from 'react-router';
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
import {useGetUserByIdQuery} from '@/redux/features/user/user.api';
import {role} from '@/constants/role';
import {useUser} from '@/hooks/useUser';

export default function UpdateUser() {
    const navigate = useNavigate();
    const {user: currentUser, isLoading: isUserLoading} = useUser();

    const targetUserId = currentUser?._id;
    console.log(targetUserId, 'tg');

    const {
        data: userData,
        isLoading: isUserDataLoading,
        error,
    } = useGetUserByIdQuery(targetUserId!, {
        skip: !targetUserId,
    });

    console.log('userData', userData);
    console.log('currentUser:', currentUser);

    const canEditUser = () => {
        if (!currentUser || !userData?.data) return false;

        const currentUserId = currentUser._id;
        const targetUserId = userData.data._id;

        if (
            currentUser.role === role.SUPER_ADMIN ||
            currentUser.role === role.ADMIN
        )
            return true;

        if (currentUser.role === role.ADMIN) {
            return userData.data.role !== role.SUPER_ADMIN;
        }

        if (
            currentUser.role === role.DRIVER ||
            currentUser.role === role.RIDER
        ) {
            return currentUserId === targetUserId;
        }

        return false;
    };

    const handleSuccess = () => {
        setTimeout(() => {
            if (
                currentUser?.role === role.ADMIN ||
                currentUser?.role === role.SUPER_ADMIN
            ) {
                navigate('/admin/users');
            } else {
                const basePath = `/${currentUser?.role.toLowerCase()}`;
                navigate(`${basePath}/profile`);
            }
        }, 1000);
    };

    if (isUserLoading || isUserDataLoading) {
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

    if (!currentUser) {
        return (
            <div className='container mx-auto py-8'>
                <div className='max-w-2xl mx-auto'>
                    <Card>
                        <CardContent className='p-8'>
                            <div className='text-center text-red-500'>
                                <h2 className='text-xl font-semibold mb-2'>
                                    Authentication Required
                                </h2>
                                <p>Please log in to access this page.</p>
                                <Button
                                    onClick={() => navigate('/login')}
                                    className='mt-4'
                                >
                                    Go to Login
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

    const isEditingSelf = currentUser._id === targetUserId;

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
                            {isEditingSelf ? 'Update Profile' : 'Update User'}
                        </h1>
                        <p className='text-muted-foreground'>
                            {isEditingSelf
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
                        <UpdateUserForm
                            userId={targetUserId}
                            onSuccess={handleSuccess}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
