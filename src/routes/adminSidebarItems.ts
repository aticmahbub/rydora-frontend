import AllUsers from '@/pages/admin/AllUsers';
import Analytics from '@/pages/Analytics';
import type {ISidebarItems} from '@/types';

export const adminSidebarItems: ISidebarItems[] = [
    {
        title: 'Dashboard',
        items: [
            {
                title: 'Analytics',
                url: 'analytics',
                component: Analytics,
            },
            {
                title: 'All users',
                url: 'all-users',
                component: AllUsers,
            },
        ],
    },
];
