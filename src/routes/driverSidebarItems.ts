import CreateDriver from '@/pages/driver/CreateDriver';
import type {ISidebarItems} from '@/types';

export const userSidebarItems: ISidebarItems[] = [
    {
        title: 'Driver sidebar',
        items: [
            {
                title: 'Create Driver',
                url: '/driver/create',
                component: CreateDriver,
            },
        ],
    },
];
