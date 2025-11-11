import Analytics from '@/pages/Analytics';
import type {ISidebarItems} from '@/types';

export const adminSidebarItems: ISidebarItems[] = [
    {
        title: 'Dashboard',
        items: [
            {
                title: 'Analytics',
                url: '/admin/analytics',
                component: Analytics,
            },
            {
                title: 'Analytics',
                url: '/admin/analytics',
                component: Analytics,
            },
        ],
    },
];
