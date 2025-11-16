import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import {UserRoundIcon} from 'lucide-react';

export default function Testimonials() {
    const testimonials = [
        {
            name: 'Sarah Ahmed',
            role: 'Frequent Rider',
            text: 'The rides are always smooth and the drivers are super friendly. The live tracking honestly gives me peace of mind.',
            avatar: <UserRoundIcon />,
        },
        {
            name: 'Daniel Rahman',
            role: 'Daily Commuter',
            text: 'Fast pickups, fair pricing, and no hassle. This service made my everyday commute way easier.',
            avatar: <UserRoundIcon />,
        },
        {
            name: 'Lina Chowdhury',
            role: 'Student',
            text: "Affordable and reliable. The app layout is clean and easy to use — even when I'm half asleep.",
            avatar: <UserRoundIcon />,
        },
    ];

    return (
        <section className='py-20 px-4'>
            <div className='max-w-5xl mx-auto text-center mb-12'>
                <h2 className='text-4xl font-bold'>What Riders Say</h2>
                <p className='text-muted-foreground mt-2'>
                    Real feedback from users who actually rely on the platform.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
                {testimonials.map((t, i) => (
                    <Card
                        key={i}
                        className='rounded-2xl shadow-sm hover:shadow-md transition'
                    >
                        <CardHeader>
                            <div className='text-5xl mb-2'>{t.avatar}</div>
                            <CardTitle>{t.name}</CardTitle>
                            <CardDescription>{t.role}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className='text-sm text-muted-foreground leading-relaxed'>
                                “{t.text}”
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
