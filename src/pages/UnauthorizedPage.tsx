import unauthorizedImage from '../assets/images/unauthorized-image.png';
import {Link} from 'react-router';

export default function UnauthorizedPage() {
    return (
        <div className='flex  flex-col border items-center justify-center bg-background px-4 py-8 sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-md text-center'>
                <div className='mx-auto  w-12 text-primary' />
                <h1 className='mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
                    Unauthorized Access
                </h1>
                <p className='mt-4 text-muted-foreground'>
                    You do not have the necessary permissions to access this
                    page.
                </p>
                <div className='mt-6'>
                    <img
                        src={unauthorizedImage}
                        alt='Unauthorized Access Illustration'
                        width='600'
                        height='400'
                        className='mx-auto'
                        style={{aspectRatio: '300/200', objectFit: 'cover'}}
                    />
                </div>
                <div className='mt-6'>
                    <Link
                        to='/'
                        className='inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}
