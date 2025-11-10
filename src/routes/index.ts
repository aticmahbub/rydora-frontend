import App from '@/App';
import About from '@/pages/public/About';
import LoginPage from '@/pages/auth/LoginPage';
import RegistrationPage from '@/pages/user/RegistrationPage';
import VerifyPage from '@/pages/otp/VerifyOTPPage';

import {createBrowserRouter} from 'react-router';
import DashboardLayout from '@/layouts/DashboardLayout';

import {adminSidebarItems} from '@/routes/adminSidebarItems';
import {userSidebarItems} from './userSidebarItems';
import {generateRoutes} from '@/utils/generateRoutes';
import {withAuth} from '@/utils/withAuth';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [{path: 'about', Component: withAuth(About, 'USER')}],
    },

    {
        path: '/admin',
        Component: DashboardLayout,
        children: [...generateRoutes(adminSidebarItems)],
    },

    {
        path: '/user',
        Component: DashboardLayout,
        children: [...generateRoutes(userSidebarItems)],
    },

    {
        path: '/driver',
        Component: DashboardLayout,
        children: [...generateRoutes(userSidebarItems)],
    },

    {path: '/login', Component: LoginPage},
    {path: '/registration', Component: RegistrationPage},
    {path: '/verify', Component: VerifyPage},

    // {path: '/admin', Component: AdminLayout},
    // {path: '/rider', Component: RiderLayout},
    // {path: '/driver', Component: DriverLayout},
]);
