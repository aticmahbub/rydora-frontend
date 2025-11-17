import App from '@/App';
import About from '@/pages/public/About';
import LoginPage from '@/pages/auth/LoginPage';
import RegistrationPage from '@/pages/user/RegistrationPage';
import VerifyPage from '@/pages/otp/VerifyOTPPage';
import {createBrowserRouter} from 'react-router';
import DashboardLayout from '@/layouts/DashboardLayout';
import {generateRoutes} from '@/utils/generateRoutes';
import DriverRegistration from '@/pages/user/driverRegistration/DriverRegistration';
import RideDetails from '@/pages/ride/RideDetails';
import Pricing from '@/pages/public/Pricing';
import HowItWorks from '@/pages/public/HowItWorks';
import FAQs from '@/pages/public/FAQs';
import Contact from '@/pages/public/Contact';
import HomePage from '@/pages/public/HomePage';
import Analytics from '@/pages/Analytics';
import RequestRide from '@/pages/ride/RequestRide';
import FindRide from '@/pages/ride/FindRide';
import Restriction from '@/pages/Restriction';
import {riderSidebarItems} from './riderSidebarItems';
import {userSidebarItems} from './userSidebarItems';
import {driverSidebarItems} from './driverSidebarItems';
import {adminSidebarItems} from './adminSidebarItems';
import UserProfile from '@/pages/user/UserProfile';
import UpdateUser from '@/pages/user/UpdateUser';

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
        children: [
            {index: true, Component: Analytics},
            ...generateRoutes(userSidebarItems),
            ...generateRoutes(adminSidebarItems),

            {path: 'profile', Component: UserProfile},
            {path: 'profile/edit', Component: UpdateUser},
            {path: 'user/update/:id', Component: UpdateUser},
        ],
    },
    {
        path: '/rider',
        Component: DashboardLayout,
        children: [
            {index: true, Component: RequestRide},
            ...generateRoutes(userSidebarItems),
            ...generateRoutes(riderSidebarItems),
            {path: 'ride/:rideId', Component: RideDetails},
            {path: 'profile', Component: UserProfile},
            {path: 'profile/edit', Component: UpdateUser},
        ],
    },
    {
        path: '/driver',
        Component: DashboardLayout,
        children: [
            {index: true, Component: FindRide},
            ...generateRoutes(userSidebarItems),
            ...generateRoutes(driverSidebarItems),
            {path: 'ride/:rideId', Component: RideDetails},

            {path: 'profile', Component: UserProfile},
            {path: 'profile/edit', Component: UpdateUser},
        ],
    },
    {path: '/login', Component: LoginPage},
    {path: '/registration', Component: RegistrationPage},
    {path: '/driver-registration', Component: DriverRegistration},
    {path: '/verify', Component: VerifyPage},
    {path: '/restriction', Component: Restriction},
]);
