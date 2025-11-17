import UserProfile from '@/pages/user/UserProfile';
import type {ISidebarItems} from '@/types';

export const userSidebarItems: ISidebarItems[] = [
    {
        title: 'User',
        items: [
            {
                title: 'User Profile',
                url: 'profile',
                component: UserProfile,
            },
        ],
    },
];
