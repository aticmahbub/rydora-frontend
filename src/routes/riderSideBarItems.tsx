import RequestRide from '@/pages/ride/RequestRide';
import RideDetails from '@/pages/ride/RideDetails';
import RideHistory from '@/pages/ride/RideHistory';
import RiderProfile from '@/pages/rider/RiderProfile';
import TrackRide from '@/pages/ride/TrackRide';
import DriverRegistration from '@/pages/user/driverRegistration/DriverRegistration';
import type {ISidebarItems} from '@/types';

export const riderSidebarItems: ISidebarItems[] = [
    {
        title: 'Rider Features',
        items: [
            {
                title: 'Become a Driver',
                url: '/rider/driver-registration',
                component: DriverRegistration,
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
                url: '/rider/-ride-history',
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
