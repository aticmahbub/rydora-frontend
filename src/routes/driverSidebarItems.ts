import FindRide from '@/pages/ride/FindRide';
import RideHistory from '@/pages/ride/RideHistory';
import type {ISidebarItems} from '@/types';

export const driverSidebarItems: ISidebarItems[] = [
    {
        title: 'Driver Features',
        items: [
            {
                title: 'Find rides',
                url: '/driver/ride',
                component: FindRide,
            },
            {
                title: 'Driver Ride History',
                url: '/driver/ride-history',
                component: RideHistory,
            },
        ],
    },
];
