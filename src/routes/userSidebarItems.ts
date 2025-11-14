import CreateDriver from '@/pages/CreateDriver';
import type {ISidebarItems} from '@/types';

export const userSidebarItems: ISidebarItems[] = [
    {
        title: 'Account Settings',
        items: [
            {
                title: 'Become a Driver',
                url: '/user/signup-as-driver',
                component: CreateDriver,
            },
        ],
    },
];
