import RequestRide from '@/pages/ride/RequestRide';
import RideHistory from '@/pages/ride/RideHistory';
import DriverRegistration from '@/pages/user/driverRegistration/DriverRegistration';
import type {ISidebarItems} from '@/types';

export const riderSidebarItems: ISidebarItems[] = [
    {
        title: 'Rider Features',
        items: [
            {
                title: 'Become a Driver',
                url: '/rider/driver-registration',
                component: DriverRegistration,
            },
            {
                title: 'Request Ride',
                url: '/rider/request',
                component: RequestRide,
            },

            {
                title: 'Ride History',
                url: '/rider/ride-history',
                component: RideHistory,
            },
        ],
    },
];
