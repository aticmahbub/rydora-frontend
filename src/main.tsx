import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {RouterProvider} from 'react-router';
import {router} from './routes/index.ts';
import {ThemeProvider} from './providers/theme.provider.tsx';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './redux/store.ts';
import {Toaster} from 'sonner';
import {LocationProvider} from './contexts/location.context.tsx';
import {UserProvider} from './providers/user.provider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
            <LocationProvider>
                <ReduxProvider store={store}>
                    <UserProvider>
                        <RouterProvider router={router} />
                        <Toaster richColors />
                    </UserProvider>
                </ReduxProvider>
            </LocationProvider>
        </ThemeProvider>
    </StrictMode>,
);
