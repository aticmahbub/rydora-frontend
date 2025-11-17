/* eslint-disable @typescript-eslint/no-explicit-any */
import {UserContext} from '@/contexts/user.context';
import {useUserInfoQuery} from '@/redux/features/user/user.api';
import type {ReactNode} from 'react';

export interface UserContextType {
    user: any | null;
    isLoading: boolean;
}

export const UserProvider = ({children}: {children: ReactNode}) => {
    const {data, isLoading} = useUserInfoQuery(undefined);

    const user = data?.data;

    return (
        <UserContext.Provider value={{user, isLoading}}>
            {children}
        </UserContext.Provider>
    );
};
