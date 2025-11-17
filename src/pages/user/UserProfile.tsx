import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Separator} from '@/components/ui/separator';
import {Mail, Phone, Calendar, Shield, Edit, Car, Bike} from 'lucide-react';
import {useNavigate} from 'react-router';
import {useUserInfoQuery} from '@/redux/features/user/user.api';
import {role} from '@/constants/role';
import {format} from 'date-fns';

export default function UserProfile() {
    const navigate = useNavigate();
    const {data: userData, isLoading, error} = useUserInfoQuery(undefined);

    const user = userData?.data;
    console.log(user);

    const getRoleBadgeVariant = (userRole: string) => {
        switch (userRole) {
            case role.SUPER_ADMIN:
                return 'destructive';
            case role.ADMIN:
                return 'default';
            case role.DRIVER:
                return 'secondary';
            case role.RIDER:
                return 'outline';
            default:
                return 'outline';
        }
    };

    const getRoleIcon = (userRole: string) => {
        switch (userRole) {
            case role.DRIVER:
                return <Car className='h-4 w-4' />;
            case role.RIDER:
                return <Bike className='h-4 w-4' />;
            case role.ADMIN:
            case role.SUPER_ADMIN:
                return <Shield className='h-4 w-4' />;
            default:
                return <Shield className='h-4 w-4' />;
        }
    };

    const getInitials = (name: string) => {
        return (
            name
                ?.split(' ')
                .map((part) => part[0])
                .join('')
                .toUpperCase() || 'U'
        );
    };

    if (isLoading) {
        return (
            <div className='container mx-auto py-8'>
                <div className='max-w-4xl mx-auto'>
                    <Card>
                        <CardContent className='p-8'>
                            <div className='flex justify-center items-center'>
                                <div className='text-lg'>
                                    Loading profile...
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className='container mx-auto py-8'>
                <div className='max-w-4xl mx-auto'>
                    <Card>
                        <CardContent className='p-8'>
                            <div className='text-center text-red-500'>
                                <h2 className='text-xl font-semibold mb-2'>
                                    Error
                                </h2>
                                <p>
                                    Failed to load profile data. Please try
                                    again.
                                </p>
                                <Button
                                    onClick={() => navigate('/')}
                                    className='mt-4'
                                >
                                    Go Home
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
            <div className='max-w-4xl mx-auto space-y-6'>
                {/* Header */}
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-3xl font-bold tracking-tight'>
                            My Profile
                        </h1>
                        <p className='text-muted-foreground'>
                            Manage your personal information and account
                            settings
                        </p>
                    </div>
                    <Button onClick={() => navigate('/profile/edit')}>
                        <Edit className='h-4 w-4 mr-2' />
                        Edit Profile
                    </Button>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    {/* Left Column - Profile Card */}
                    <div className='lg:col-span-1 space-y-6'>
                        {/* Profile Card */}
                        <Card>
                            <CardContent className='p-6'>
                                <div className='flex flex-col items-center text-center space-y-4'>
                                    <Avatar className='h-24 w-24'>
                                        <AvatarImage
                                            src={user.profileImage}
                                            alt={user.name}
                                        />
                                        <AvatarFallback className='text-lg'>
                                            {getInitials(user.name)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className='space-y-2'>
                                        <h2 className='text-xl font-semibold'>
                                            {user.name}
                                        </h2>
                                        <div className='flex items-center justify-center gap-2'>
                                            {getRoleIcon(user.role)}
                                            <Badge
                                                variant={getRoleBadgeVariant(
                                                    user.role,
                                                )}
                                            >
                                                {user.role.replace('_', ' ')}
                                            </Badge>
                                        </div>
                                        <p className='text-sm text-muted-foreground'>
                                            {user.email}
                                        </p>
                                    </div>

                                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                        <Calendar className='h-4 w-4' />
                                        <span>
                                            Joined{' '}
                                            {format(
                                                new Date(
                                                    user.createdAt ||
                                                        new Date(),
                                                ),
                                                'MMM yyyy',
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Account Status */}
                        <Card>
                            <CardHeader>
                                <CardTitle className='text-lg'>
                                    Account Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-3'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-sm'>
                                        Email Verification
                                    </span>
                                    <Badge
                                        variant={
                                            user.isVerified
                                                ? 'default'
                                                : 'secondary'
                                        }
                                    >
                                        {user.isVerified
                                            ? 'Verified'
                                            : 'Pending'}
                                    </Badge>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-sm'>
                                        Account Status
                                    </span>
                                    <Badge
                                        variant={
                                            user.isActive
                                                ? 'default'
                                                : 'destructive'
                                        }
                                    >
                                        {user.isActive ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>
                                {user.phone && (
                                    <div className='flex justify-between items-center'>
                                        <span className='text-sm'>
                                            Phone Verification
                                        </span>
                                        <Badge variant='secondary'>
                                            Verified
                                        </Badge>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Details */}
                    <div className='lg:col-span-2 space-y-6'>
                        {/* Personal Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>
                                    Your basic profile information
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div className='space-y-2'>
                                        <label className='text-sm font-medium text-muted-foreground'>
                                            Full Name
                                        </label>
                                        <p className='text-sm'>
                                            {user.name || 'Not provided'}
                                        </p>
                                    </div>

                                    <div className='space-y-2'>
                                        <label className='text-sm font-medium text-muted-foreground'>
                                            Role
                                        </label>
                                        <div className='flex items-center gap-2'>
                                            {getRoleIcon(user.role)}
                                            <span className='text-sm capitalize'>
                                                {user.role
                                                    .toLowerCase()
                                                    .replace('_', ' ')}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className='space-y-3'>
                                    <div className='flex items-center gap-3'>
                                        <Mail className='h-4 w-4 text-muted-foreground' />
                                        <div>
                                            <p className='text-sm font-medium'>
                                                Email Address
                                            </p>
                                            <p className='text-sm text-muted-foreground'>
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>

                                    {user.phone && (
                                        <div className='flex items-center gap-3'>
                                            <Phone className='h-4 w-4 text-muted-foreground' />
                                            <div>
                                                <p className='text-sm font-medium'>
                                                    Phone Number
                                                </p>
                                                <p className='text-sm text-muted-foreground'>
                                                    {user.phone}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className='flex items-center gap-3'>
                                        <Calendar className='h-4 w-4 text-muted-foreground' />
                                        <div>
                                            <p className='text-sm font-medium'>
                                                Member Since
                                            </p>
                                            <p className='text-sm text-muted-foreground'>
                                                {format(
                                                    new Date(
                                                        user.createdAt ||
                                                            new Date(),
                                                    ),
                                                    'MMMM dd, yyyy',
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Additional Information based on role */}
                        {user.role === role.DRIVER && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Driver Information</CardTitle>
                                    <CardDescription>
                                        Your driver profile details
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className='space-y-3'>
                                        <div className='flex justify-between'>
                                            <span className='text-sm'>
                                                Driver Status
                                            </span>
                                            <Badge variant='default'>
                                                Active
                                            </Badge>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-sm'>
                                                Total Rides
                                            </span>
                                            <span className='text-sm'>45</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-sm'>
                                                Rating
                                            </span>
                                            <span className='text-sm'>
                                                4.8 ★
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {user.role === role.RIDER && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Rider Information</CardTitle>
                                    <CardDescription>
                                        Your riding statistics
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className='space-y-3'>
                                        <div className='flex justify-between'>
                                            <span className='text-sm'>
                                                Total Rides
                                            </span>
                                            <span className='text-sm'>23</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-sm'>
                                                Member Since
                                            </span>
                                            <span className='text-sm'>
                                                {format(
                                                    new Date(
                                                        user.createdAt ||
                                                            new Date(),
                                                    ),
                                                    'MMM yyyy',
                                                )}
                                            </span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-sm'>
                                                Preferred Payment
                                            </span>
                                            <span className='text-sm'>
                                                Credit Card
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <Button
                                        variant='outline'
                                        className='justify-start h-auto py-3'
                                        onClick={() =>
                                            navigate('/profile/edit')
                                        }
                                    >
                                        <Edit className='h-4 w-4 mr-2' />
                                        <div className='text-left'>
                                            <div className='font-medium'>
                                                Edit Profile
                                            </div>
                                            <div className='text-xs text-muted-foreground'>
                                                Update your personal information
                                            </div>
                                        </div>
                                    </Button>

                                    {user.role === role.RIDER && (
                                        <Button
                                            variant='outline'
                                            className='justify-start h-auto py-3'
                                            onClick={() =>
                                                navigate(
                                                    '/rider/driver-registration',
                                                )
                                            }
                                        >
                                            <Car className='h-4 w-4 mr-2' />
                                            <div className='text-left'>
                                                <div className='font-medium'>
                                                    Become a Driver
                                                </div>
                                                <div className='text-xs text-muted-foreground'>
                                                    Start driving with Rydora
                                                </div>
                                            </div>
                                        </Button>
                                    )}

                                    <Button
                                        variant='outline'
                                        className='justify-start h-auto py-3'
                                        onClick={() =>
                                            navigate('/change-password')
                                        }
                                    >
                                        <Shield className='h-4 w-4 mr-2' />
                                        <div className='text-left'>
                                            <div className='font-medium'>
                                                Change Password
                                            </div>
                                            <div className='text-xs text-muted-foreground'>
                                                Update your security settings
                                            </div>
                                        </div>
                                    </Button>

                                    <Button
                                        variant='outline'
                                        className='justify-start h-auto py-3'
                                        onClick={() => navigate('/support')}
                                    >
                                        <Mail className='h-4 w-4 mr-2' />
                                        <div className='text-left'>
                                            <div className='font-medium'>
                                                Contact Support
                                            </div>
                                            <div className='text-xs text-muted-foreground'>
                                                Get help from our team
                                            </div>
                                        </div>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
