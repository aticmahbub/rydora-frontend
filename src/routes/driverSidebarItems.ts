import FindRide from '@/pages/ride/FindRide';
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
        ],
    },
];
