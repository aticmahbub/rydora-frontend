import App from '@/App';
import AdminLayout from '@/layouts/AdminLayout';
import DriverLayout from '@/layouts/DriverLayout';
import RiderLayout from '@/layouts/RiderLayout';
import About from '@/pages/About';
import Login from '@/pages/auth/Login';
import Registration from '@/pages/auth/Registration';
import {createBrowserRouter} from 'react-router';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [{path: 'about', Component: About}],
    },

    {path: 'login', Component: Login},
    {path: '/registration', Component: Registration},

    {path: 'admin', Component: AdminLayout},
    {path: 'rider', Component: RiderLayout},
    {path: 'driver', Component: DriverLayout},
]);
