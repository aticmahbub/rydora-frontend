import {Card, CardContent} from '@/components/ui/card';
import {useUserInfoQuery} from '@/redux/features/user/user.api';
import {Spinner} from '@/components/ui/Spinner';
import {Badge} from '@/components/ui/badge';
import {DriverRegistrationForm} from '@/components/modules/user/registration/DriverRegistrationForm';
import {Alert, AlertDescription} from '@/components/ui/alert';

export default function DriverRegistration() {
    const {data: userData, isLoading, error} = useUserInfoQuery(undefined);

    // Handle loading state
    if (isLoading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <Spinner size='lg' />
                    <p className='mt-4 text-gray-600'>
                        Loading your information...
                    </p>
                </div>
            </div>
        );
    }

    // Handle error state
    if (error) {
        return (
            <div className='min-h-screen flex items-center justify-center p-4'>
                <Card className='w-full max-w-md'>
                    <CardContent className='p-6'>
                        <Alert variant='destructive'>
                            <AlertDescription>
                                Failed to load user information. Please try
                                again later.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const user = userData?.data;
    const isDriver = user?.role === 'DRIVER';

    // If user is already a driver
    if (isDriver) {
        return (
            <div className='min-h-screen flex items-center justify-center p-4'>
                <Card className='w-full max-w-md'>
                    <CardContent className='p-6 text-center space-y-4'>
                        <div className='w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center'>
                            <span className='text-2xl'>🚗</span>
                        </div>
                        <Badge
                            variant='secondary'
                            className='text-green-600 bg-green-100'
                        >
                            Driver Account
                        </Badge>
                        <h2 className='text-xl font-semibold text-gray-900'>
                            You're already a driver!
                        </h2>
                        <p className='text-gray-600'>
                            Your driver account is active. You can start
                            accepting rides now.
                        </p>
                        <div className='space-y-2 text-sm text-gray-500'>
                            <p>
                                Status:{' '}
                                <span className='font-medium text-green-600'>
                                    Active
                                </span>
                            </p>
                            <p>
                                Role:{' '}
                                <span className='font-medium'>
                                    {user?.role}
                                </span>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Main registration page
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8'>
            <div className='container mx-auto px-4'>
                {/* Header Section */}
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold text-gray-900 mb-4'>
                        Drive with Us
                    </h1>
                    <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                        Join thousands of drivers earning extra income on their
                        own schedule
                    </p>
                </div>

                <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start'>
                    {/* Registration Form */}
                    <div className='flex justify-center lg:justify-end'>
                        <DriverRegistrationForm
                            onSuccess={() => {
                                // You can add success actions here
                                console.log('Driver registration successful!');
                            }}
                            onError={(error) => {
                                // You can add error handling here
                                console.error(
                                    'Driver registration error:',
                                    error,
                                );
                            }}
                        />
                    </div>

                    {/* Benefits Section */}
                    <div className='space-y-6'>
                        <Card>
                            <CardContent className='p-6'>
                                <h3 className='text-2xl font-semibold text-gray-900 mb-4'>
                                    Why Drive With Us?
                                </h3>
                                <div className='space-y-4'>
                                    <div className='flex items-start gap-3'>
                                        <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                                            <span className='text-blue-600'>
                                                💰
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className='font-medium text-gray-900'>
                                                Flexible Earnings
                                            </h4>
                                            <p className='text-sm text-gray-600'>
                                                Earn on your own schedule with
                                                competitive rates
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex items-start gap-3'>
                                        <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                                            <span className='text-green-600'>
                                                ⚡
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className='font-medium text-gray-900'>
                                                Quick Payouts
                                            </h4>
                                            <p className='text-sm text-gray-600'>
                                                Get paid weekly with secure,
                                                reliable payments
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex items-start gap-3'>
                                        <div className='w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0'>
                                            <span className='text-purple-600'>
                                                🛡️
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className='font-medium text-gray-900'>
                                                Driver Protection
                                            </h4>
                                            <p className='text-sm text-gray-600'>
                                                24/7 support and insurance
                                                coverage
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex items-start gap-3'>
                                        <div className='w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0'>
                                            <span className='text-orange-600'>
                                                📈
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className='font-medium text-gray-900'>
                                                Growth Opportunities
                                            </h4>
                                            <p className='text-sm text-gray-600'>
                                                Access to premium rides and
                                                bonus programs
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Stats Card */}
                        <Card>
                            <CardContent className='p-6'>
                                <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                                    Driver Statistics
                                </h3>
                                <div className='grid grid-cols-2 gap-4 text-center'>
                                    <div>
                                        <p className='text-2xl font-bold text-blue-600'>
                                            ৳15K+
                                        </p>
                                        <p className='text-sm text-gray-600'>
                                            Avg. Monthly
                                        </p>
                                    </div>
                                    <div>
                                        <p className='text-2xl font-bold text-green-600'>
                                            4.8★
                                        </p>
                                        <p className='text-sm text-gray-600'>
                                            Avg. Rating
                                        </p>
                                    </div>
                                    <div>
                                        <p className='text-2xl font-bold text-purple-600'>
                                            24/7
                                        </p>
                                        <p className='text-sm text-gray-600'>
                                            Support
                                        </p>
                                    </div>
                                    <div>
                                        <p className='text-2xl font-bold text-orange-600'>
                                            10K+
                                        </p>
                                        <p className='text-sm text-gray-600'>
                                            Active Drivers
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
