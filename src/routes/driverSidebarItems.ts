import DriverAvailability from '@/pages/driver/DriverAvailability';
import DriverEarnings from '@/pages/driver/DriverEarnings';
import DriverProfile from '@/pages/driver/DriverProfile';
import ManageRides from '@/pages/driver/ManageRides';
import FindRide from '@/pages/ride/FindRide';
import RideHistory from '@/pages/ride/RideHistory';
import type {ISidebarItems} from '@/types';

export const driverSidebarItems: ISidebarItems[] = [
    {
        title: 'Driver sidebar',
        items: [
            {
                title: 'Find rides',
                url: '/driver/ride',
                component: FindRide,
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
                component: RideHistory,
            },
            {
                title: 'Manage Rides',
                url: '/driver/manage-rides',
                component: ManageRides,
            },
        ],
    },
];
