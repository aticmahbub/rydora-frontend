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
import {riderSidebarItems} from './riderSidebarItems';
import {driverSidebarItems} from './driverSidebarItems';
import DriverRegistration from '@/pages/user/driverRegistration/DriverRegistration';
import RideDetails from '@/pages/ride/RideDetails';
import Pricing from '@/pages/public/Pricing';
import HowItWorks from '@/pages/public/HowItWorks';
import FAQs from '@/pages/public/FAQs';
import Contact from '@/pages/public/Contact';
import HomePage from '@/pages/public/HomePage';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,

        children: [
            {index: true, Component: HomePage},
            {path: 'about', Component: About},
            {path: 'pricing', Component: Pricing},
            {path: 'how-it-works', Component: HowItWorks},
            {path: 'faqs', Component: FAQs},
            {path: 'contact', Component: Contact},
        ],
    },
    {
        path: '/admin',
        Component: DashboardLayout,
        children: [...generateRoutes(adminSidebarItems)],
    },

    {
        path: '/rider',
        Component: DashboardLayout,
        children: [
            ...generateRoutes(riderSidebarItems),
            {path: 'ride/:rideId', Component: RideDetails},
        ],
    },
    {
        path: '/driver',
        Component: withAuth(DashboardLayout, 'DRIVER'),
        children: [
            ...generateRoutes(driverSidebarItems),
            {path: 'ride/:rideId', Component: RideDetails},
        ],
    },

    {path: '/login', Component: LoginPage},
    {path: '/registration', Component: RegistrationPage},
    {path: '/driver-registration', Component: DriverRegistration},
    {path: '/verify', Component: VerifyPage},
]);
