import type {UserContextType} from '@/providers/user.provider';
import {createContext} from 'react';

export const UserContext = createContext<UserContextType | undefined>(
    undefined,
);
