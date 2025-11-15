/* eslint-disable @typescript-eslint/no-explicit-any */
import {Badge} from '@/components/ui/badge';
import {Card, CardContent} from '@/components/ui/card';

export default function AlreadyDriver({user}: any) {
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
                        Your driver account is active. You can start accepting
                        rides now.
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
                            <span className='font-medium'>{user?.role}</span>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
