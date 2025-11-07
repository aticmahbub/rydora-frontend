import {createContext} from 'react';

export type Theme = 'dark' | 'light' | 'system';

export const initialState: ThemeProviderState = {
    theme: 'system',
    setTheme: () => null,
};

export type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};
export const ThemeProviderContext =
    createContext<ThemeProviderState>(initialState);
