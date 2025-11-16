export default function Services() {
    const highlights = [
        {
            title: 'Fast & Reliable',
            desc: 'Low wait times, smart routing, and zero ghost drivers.',
            icon: '⚡',
        },
        {
            title: 'Safe & Secure',
            desc: 'Verified drivers and real-time tracking on every trip.',
            icon: '🔒',
        },
        {
            title: 'Affordable Pricing',
            desc: 'Transparent fares with no surprise fees at checkout.',
            icon: '💸',
        },
        {
            title: '24/7 Support',
            desc: 'Human-backed support whenever chaos hits.',
            icon: '🎧',
        },
    ];

    return (
        <section className='py-20 px-4'>
            <div className='max-w-6xl mx-auto text-center mb-12'>
                <h2 className='text-4xl font-bold'>Service Highlights</h2>
                <p className='text-muted-foreground mt-2'>
                    The core advantages that make the ride experience smooth.
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto'>
                {highlights.map((item, i) => (
                    <div
                        key={i}
                        className='rounded-2xl border p-6 bg-white shadow-sm hover:shadow-md transition'
                    >
                        <div className='text-4xl mb-4'>{item.icon}</div>
                        <h3 className='text-xl font-semibold mb-2'>
                            {item.title}
                        </h3>
                        <p className='text-sm text-muted-foreground'>
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
