export default function DashboardGrid({tiles}: {tiles: React.ReactNode[]}) {
    const gridCols =
        tiles.length === 1
            ? 'md:grid-cols-1'
            : tiles.length === 2
            ? 'md:grid-cols-2'
            : 'md:grid-cols-3';

    return (
        <div className={`grid auto-rows-min gap-4 ${gridCols} p-4`}>
            {tiles.map((tile, idx) => (
                <div key={idx} className='bg-muted/50 min-h-[80vh] rounded-xl'>
                    {tile}
                </div>
            ))}
        </div>
    );
}
