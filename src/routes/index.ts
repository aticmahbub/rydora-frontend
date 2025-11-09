import App from '@/App';
import About from '@/pages/public/About';
import LoginPage from '@/pages/auth/LoginPage';
import RegistrationPage from '@/pages/user/RegistrationPage';
import VerifyPage from '@/pages/otp/VerifyOTPPage';

import {createBrowserRouter} from 'react-router';
import DashboardLayout from '@/layouts/DashboardLayout';
import Analytics from '@/pages/Analytics';
import UserBookings from '@/pages/user/UserBookings';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [{path: 'about', Component: About}],
    },

    {
        path: '/admin',
        Component: DashboardLayout,
        children: [{path: 'analytics', Component: Analytics}],
    },

    {
        path: '/user',
        Component: DashboardLayout,
        children: [{path: 'bookings', Component: UserBookings}],
    },

    {path: '/login', Component: LoginPage},
    {path: '/registration', Component: RegistrationPage},
    {path: '/verify', Component: VerifyPage},

    // {path: '/admin', Component: AdminLayout},
    // {path: '/rider', Component: RiderLayout},
    // {path: '/driver', Component: DriverLayout},
]);
