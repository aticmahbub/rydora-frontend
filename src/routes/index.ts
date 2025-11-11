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
import {driverSidebarItems} from './driverSidebarItems';
import {riderSidebarItems} from './riderSideBarItems';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [{path: 'about', Component: About}],
    },

    {
        path: '/admin',
        Component: withAuth(DashboardLayout, 'SUPER_ADMIN'),
        children: [...generateRoutes(adminSidebarItems)],
    },

    {
        path: '/user',
        Component: withAuth(DashboardLayout, 'USER'),
        children: [...generateRoutes(userSidebarItems)],
    },

    {
        path: '/rider',
        Component: withAuth(DashboardLayout, 'RIDER'),
        children: [...generateRoutes(riderSidebarItems)],
    },

    {
        path: '/driver',
        Component: withAuth(DashboardLayout, 'DRIVER'),
        children: [...generateRoutes(driverSidebarItems)],
    },

    {path: '/login', Component: LoginPage},
    {path: '/registration', Component: RegistrationPage},
    {path: '/verify', Component: VerifyPage},
]);
