import UserBookings from '@/pages/user/UserBookings';
import type {ISidebarItems} from '@/types';

export const userSidebarItems: ISidebarItems[] = [
    {
        title: 'History',
        items: [
            {
                title: 'Bookings',
                url: 'user/booking',
                component: UserBookings,
            },
        ],
    },
];
