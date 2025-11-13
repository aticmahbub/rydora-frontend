import {role} from '@/constants/role';
import {adminSidebarItems} from '@/routes/adminSidebarItems';
import {driverSidebarItems} from '@/routes/driverSidebarItems';
import {riderSidebarItems} from '@/routes/riderSidebarItems';
import {userSidebarItems} from '@/routes/userSidebarItems';
import type {TRole} from '@/types';

export const getSidebarItems = (userRole: TRole) => {
    switch (userRole) {
        case role.SUPER_ADMIN:
            return [...adminSidebarItems];
        case role.ADMIN:
            return [...adminSidebarItems];
        case role.USER:
            return [...userSidebarItems];
        case role.RIDER:
            return [...riderSidebarItems];
        case role.DRIVER:
            return [...driverSidebarItems];

        default:
            return [];
    }
};
