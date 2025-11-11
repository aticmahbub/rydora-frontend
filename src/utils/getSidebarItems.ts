import {role} from '@/constants/role';
import {adminSidebarItems} from '@/routes/adminSidebarItems';
import {userSidebarItems} from '@/routes/userSidebarItems';
import type {TRole} from '@/types';

export const getSidebarItems = (userRole: TRole) => {
    switch (userRole) {
        case role.superAdmin:
            return [...adminSidebarItems];
        case role.ADMIN:
            return [...adminSidebarItems];
        case role.USER:
            return [...userSidebarItems];
        case role.RIDER:
        case role.DRIVER:
            return [...userSidebarItems];

        default:
            return [];
    }
};
