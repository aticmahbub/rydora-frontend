import {Spinner} from '@/components/ui/Spinner';
import UnauthorizedPage from '@/pages/UnauthorizedPage';
import {useUserInfoQuery} from '@/redux/features/user/user.api';
import type {TRole} from '@/types';
import type {ComponentType} from 'react';
import {Navigate} from 'react-router';

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
    return function AuthWrapper() {
        const {data, isLoading} = useUserInfoQuery(undefined);

        if (isLoading) return <Spinner />;

        if (!data?.data?.role) {
            return <Navigate to='/login' replace />;
        }

        if (requiredRole && requiredRole !== data.data.role) {
            return <UnauthorizedPage />;
        }

        return <Component />;
    };
};
