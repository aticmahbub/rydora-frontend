import {Card, CardContent} from '@/components/ui/card';
import {useUserInfoQuery} from '@/redux/features/user/user.api';
import {Spinner} from '@/components/ui/Spinner';
import {DriverRegistrationForm} from '@/components/modules/user/registration/DriverRegistrationForm';
import {Alert, AlertDescription} from '@/components/ui/alert';
import AlreadyDriver from './AlreadyDriver';

export default function DriverRegistration() {
    const {data: userData, isLoading, error} = useUserInfoQuery(undefined);
    const user = userData?.data;
    const isDriver = user?.role === 'DRIVER';

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

    if (isDriver) {
        return <AlreadyDriver user={user} />;
    }

    return (
        <div className='min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8'>
            <div className='container mx-auto px-4'>
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold text-gray-900 mb-4'>
                        Become a Rydora Driver
                    </h1>
                    <p className='text-xl text-gray-600'>
                        Start earning on your own schedule - complete your
                        registration below
                    </p>
                </div>
                <div className='max-w-4xl mx-auto'>
                    <div className='flex justify-center'>
                        <DriverRegistrationForm
                            onSuccess={() => {
                                console.log('Driver registration successful!');
                            }}
                            onError={(error) => {
                                console.error(
                                    'Driver registration error:',
                                    error,
                                );
                            }}
                        />
                    </div>

                    {/* Quick Benefits */}
                    <div className='mt-8 text-center'>
                        <div className='inline-flex items-center gap-6 text-sm text-gray-600'>
                            <span className='flex items-center gap-1'>
                                <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                                Quick Approval
                            </span>
                            <span className='flex items-center gap-1'>
                                <span className='w-2 h-2 bg-blue-500 rounded-full'></span>
                                Flexible Hours
                            </span>
                            <span className='flex items-center gap-1'>
                                <span className='w-2 h-2 bg-purple-500 rounded-full'></span>
                                24/7 Support
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
