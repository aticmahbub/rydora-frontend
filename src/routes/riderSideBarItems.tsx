import CreateDriver from '@/pages/rider/CreateDriver';
import RequestRide from '@/pages/rider/RequestRide';
import RideDetails from '@/pages/rider/RideDetails';
import RideHistory from '@/pages/rider/RideHistory';
import RiderProfile from '@/pages/rider/RiderProfile';
import TrackRide from '@/pages/rider/TrackRide';
import type {ISidebarItems} from '@/types';

export const riderSidebarItems: ISidebarItems[] = [
    {
        title: 'Rider Features',
        items: [
            {
                title: 'Create Driver',
                url: '/rider/create',
                component: CreateDriver,
            },
            {
                title: 'Request Ride',
                url: '/rider/request',
                component: RequestRide,
            },
            {
                title: 'Ride Details',
                url: '/rider/details',
                component: RideDetails,
            },
            {
                title: 'Ride History',
                url: 'rider/-ride-history',
                component: RideHistory,
            },
            {
                title: 'Profile',
                url: '/rider/profile',
                component: RiderProfile,
            },
            {
                title: 'Track Ride',
                url: '/rider/track',
                component: TrackRide,
            },
        ],
    },
];
