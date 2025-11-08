import App from '@/App';
import AdminLayout from '@/layouts/AdminLayout';
import DriverLayout from '@/layouts/DriverLayout';
import RiderLayout from '@/layouts/RiderLayout';
import About from '@/pages/public/About';
import LoginPage from '@/pages/auth/LoginPage';
import RegistrationPage from '@/pages/user/RegistrationPage';
import VerifyPage from '@/pages/otp/VerifyOTPPage';

import {createBrowserRouter} from 'react-router';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [{path: 'about', Component: About}],
    },

    {path: 'login', Component: LoginPage},
    {path: '/registration', Component: RegistrationPage},
    {path: '/verify', Component: VerifyPage},

    {path: 'admin', Component: AdminLayout},
    {path: 'rider', Component: RiderLayout},
    {path: 'driver', Component: DriverLayout},
]);
