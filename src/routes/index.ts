import App from '@/App';
import About from '@/pages/public/About';
import LoginPage from '@/pages/auth/LoginPage';
import RegistrationPage from '@/pages/user/RegistrationPage';
import VerifyPage from '@/pages/otp/VerifyOTPPage';
import {createBrowserRouter} from 'react-router';
import DashboardLayout from '@/layouts/DashboardLayout';
import {generateRoutes} from '@/utils/generateRoutes';
import {adminSidebarItems} from './adminSidebarItems';
import {withAuth} from '@/utils/withAuth';
import {userSidebarItems} from './userSidebarItems';
import {riderSidebarItems} from './riderSidebarItems';
import {driverSidebarItems} from './driverSidebarItems';
import RegisterDriver from '@/pages/RegisterDriver';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [{path: 'about', Component: About}],
    },
    {
        path: '/admin',
        Component: DashboardLayout,
        children: [...generateRoutes(adminSidebarItems)],
    },

    {
        path: '/user',
        Component: withAuth(DashboardLayout, 'USER'),
        children: [...generateRoutes(userSidebarItems)],
    },

    {
        path: '/rider',
        Component: DashboardLayout,
        children: [...generateRoutes(riderSidebarItems)],
    },

    {
        path: '/driver',
        Component: withAuth(DashboardLayout, 'DRIVER'),
        children: [...generateRoutes(driverSidebarItems)],
    },

    {path: '/login', Component: LoginPage},
    {path: '/registration', Component: RegistrationPage},
    {path: '/driver-registration', Component: RegisterDriver},
    {path: '/verify', Component: VerifyPage},
]);
