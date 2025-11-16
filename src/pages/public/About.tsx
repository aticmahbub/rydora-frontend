import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';

export default function AboutPage() {
    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Hero / Banner */}
            <section className='bg-white py-20 text-center'>
                <h1 className='text-5xl font-bold mb-4'>About Us</h1>
                <p className='max-w-2xl mx-auto text-lg text-gray-600'>
                    We are a team of passionate professionals committed to
                    delivering the best services to our clients. Our goal is to
                    simplify your life while providing reliable solutions.
                </p>
            </section>

            {/* Mission & Vision */}
            <section className='py-20 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center'>
                <div>
                    <h2 className='text-3xl font-bold mb-4'>Our Mission</h2>
                    <p className='text-gray-600'>
                        To provide innovative and reliable solutions that help
                        our clients achieve their goals efficiently.
                    </p>

                    <h2 className='text-3xl font-bold mt-10 mb-4'>
                        Our Vision
                    </h2>
                    <p className='text-gray-600'>
                        To become a globally recognized company known for
                        excellence, trust, and forward-thinking solutions.
                    </p>
                </div>
                <div>{/* <ArrowBigRight /> */}</div>
            </section>

            {/* Team */}
            <section className='py-20 bg-white text-center'>
                <h2 className='text-3xl font-bold mb-12'>Meet the Team</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Jane Doe</CardTitle>
                            <CardDescription>CEO & Founder</CardDescription>
                        </CardHeader>
                        <CardContent>
                            Jane leads our vision with over 10 years of industry
                            experience.
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>John Smith</CardTitle>
                            <CardDescription>CTO</CardDescription>
                        </CardHeader>
                        <CardContent>
                            John ensures our tech stays cutting-edge and
                            scalable.
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Emily Johnson</CardTitle>
                            <CardDescription>Head of Design</CardDescription>
                        </CardHeader>
                        <CardContent>
                            Emily crafts intuitive interfaces and amazing user
                            experiences.
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Call to Action */}
            <section className='py-20 bg-gray-50 text-center'>
                <h2 className='text-3xl font-bold mb-4'>
                    Join Us on Our Journey
                </h2>
                <p className='mb-6 max-w-2xl mx-auto text-gray-600'>
                    Be a part of our mission to create innovative solutions that
                    truly make a difference.
                </p>
                <button className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition'>
                    Contact Us
                </button>
            </section>
        </div>
    );
}
