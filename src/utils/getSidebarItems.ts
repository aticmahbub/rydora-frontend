/* eslint-disable @typescript-eslint/no-explicit-any */
import {role} from '@/constants/role';
import {adminSidebarItems} from '@/routes/adminSidebarItems';
import {driverSidebarItems} from '@/routes/driverSidebarItems';
import {riderSidebarItems} from '@/routes/riderSidebarItems';
import {userSidebarItems} from '@/routes/userSidebarItems';
import type {TRole} from '@/types';

export const getSidebarItems = (userRole: TRole) => {
    let items: any[] = [...userSidebarItems];

    switch (userRole) {
        case role.SUPER_ADMIN:
            return (items = [...items, ...adminSidebarItems]);
        case role.ADMIN:
            return (items = [...items, ...adminSidebarItems]);
        case role.RIDER:
            return (items = [...items, ...riderSidebarItems]);
        case role.DRIVER:
            return (items = [...items, ...driverSidebarItems]);

        default:
            return [];
    }
};
