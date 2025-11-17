import type {ISidebarItems} from '@/types';

export const generateRoutes = (sidebarItems: ISidebarItems[]) => {
    return sidebarItems.flatMap((section) =>
        section.items.map((route) => ({
            path: route.url,
            Component: route.component,
        })),
    );
};

// import type {ISidebarItems} from '@/types';

// export const generateRoutes = (sidebarItems: ISidebarItems[]) => {
//     const routes: any[] = [];

//     sidebarItems.forEach((group) => {
//         group.items.forEach((item) => {
//             routes.push({
//                 path: item.url.replace(/^\//, ''),
//                 Component: item.component,
//             });
//         });
//     });

//     return routes;
// };
