export default function HowItWorks() {
    const steps = [
        {
            title: 'Set Your Pickup',
            desc: 'Your location auto-detected or pinned manually.',
            icon: '📍',
        },
        {
            title: 'Choose Your Destination',
            desc: 'Search anywhere and select your drop-off.',
            icon: '🎯',
        },
        {
            title: 'Match Instantly',
            desc: 'Get the nearest, best-rated driver in seconds.',
            icon: '⚡',
        },
        {
            title: 'Track & Ride',
            desc: 'Live tracking and smooth payments end-to-end.',
            icon: '🚗',
        },
    ];

    return (
        <section className='py-20 px-4'>
            <div className='max-w-6xl mx-auto text-center mb-12'>
                <h2 className='text-4xl font-bold'>How It Works</h2>
                <p className='text-muted-foreground mt-2'>
                    A simple flow designed to get you moving faster.
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto'>
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className='rounded-2xl border p-6 bg-white shadow-sm hover:shadow-md transition'
                    >
                        <div className='text-4xl mb-4'>{step.icon}</div>
                        <h3 className='text-xl font-semibold mb-2'>
                            {step.title}
                        </h3>
                        <p className='text-sm text-muted-foreground'>
                            {step.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
