import DriverAvailability from '@/pages/driver/DriverAvailability';
import DriverEarnings from '@/pages/driver/DriverEarnings';
import DriverProfile from '@/pages/driver/DriverProfile';
import DriverRideHistory from '@/pages/driver/DriverRideHistory';
import ManageRides from '@/pages/driver/ManageRides';
import CreateDriver from '@/pages/rider/CreateDriver';
import type {ISidebarItems} from '@/types';

export const driverSidebarItems: ISidebarItems[] = [
    {
        title: 'Driver sidebar',
        items: [
            {
                title: 'Create Driver',
                url: '/driver/create',
                component: CreateDriver,
            },
            {
                title: 'Driver Availability',
                url: '/driver/availability',
                component: DriverAvailability,
            },
            {
                title: 'Driver Earnings',
                url: '/driver/earnings',
                component: DriverEarnings,
            },
            {
                title: 'Driver Profile',
                url: '/driver/profile',
                component: DriverProfile,
            },
            {
                title: 'Driver Ride History',
                url: '/driver/ride-history',
                component: DriverRideHistory,
            },
            {
                title: 'Manage Rides',
                url: '/driver/manage-rides',
                component: ManageRides,
            },
        ],
    },
];
