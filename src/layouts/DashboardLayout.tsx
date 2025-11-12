import {AppSidebar} from '@/components/app-sidebar';
import {Separator} from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import {Outlet} from 'react-router';

export default function DashboardLayout() {
    const tiles = [
        {id: 1, content: <Outlet />},
        // {
        //     id: 2,
        //     content: <div className='bg-muted/50 rounded-xl p-4'>Stats</div>,
        // },
        // {
        //     id: 3,
        //     content: (
        //         <div className='bg-muted/50 rounded-xl p-4'>Recent Rides</div>
        //     ),
        // },
        // You can push more dynamically later
    ];

    const gridCols =
        tiles.length === 1
            ? 'md:grid-cols-1'
            : tiles.length === 2
            ? 'md:grid-cols-2'
            : 'md:grid-cols-3';

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
                    <SidebarTrigger className='-ml-1' />
                    <Separator
                        orientation='vertical'
                        className='mr-2 data-[orientation=vertical]:h-4'
                    />
                </header>
                <div className={`grid auto-rows-min gap-4 ${gridCols} p-4`}>
                    {tiles.map((tile) => (
                        <div
                            key={tile.id}
                            className='bg-muted/50 min-h-[80vh] rounded-xl'
                        >
                            {tile.content}
                        </div>
                    ))}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
