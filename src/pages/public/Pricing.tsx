'use client';

import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import type {ICoordinates} from '@/types';
import {
    calculateDistance,
    calculateFare,
    formatDistance,
} from '@/utils/rideCalculator';

export default function PricingPage() {
    const [start, setStart] = useState<ICoordinates>({lat: 0, lng: 0});
    const [end, setEnd] = useState<ICoordinates>({lat: 0, lng: 0});
    const [distance, setDistance] = useState<number | null>(null);
    const [fare, setFare] = useState<number | null>(null);

    const handleCalculate = () => {
        const dist = calculateDistance(start, end);
        setDistance(dist);
        setFare(calculateFare(dist));
    };

    return (
        <div className='min-h-screen bg-gray-50 py-20'>
            {/* Hero */}
            <section className='text-center mb-20'>
                <h1 className='text-5xl font-bold mb-4'>Pricing</h1>
                <p className='max-w-2xl mx-auto text-gray-600'>
                    Calculate your fare based on your trip distance. Transparent
                    pricing, no surprises.
                </p>
            </section>

            {/* Pricing Tiers / Highlights */}
            <section className='max-w-6xl mx-auto mb-8 text-center'>
                <h2 className='text-3xl font-bold mb-12'>Our Pricing</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Short Trips</CardTitle>
                        </CardHeader>
                        <CardContent>
                            Base fare ৳60 + ৳25/km after 2km. Perfect for city
                            rides.
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Medium Trips</CardTitle>
                        </CardHeader>
                        <CardContent>
                            Optimized pricing for trips between 5-20km.
                            Comfortable and affordable.
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Long Trips</CardTitle>
                        </CardHeader>
                        <CardContent>
                            Best rates for trips over 20km. Travel far without
                            worrying about cost.
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Distance Input Form */}
            <section className='max-w-3xl mx-auto  bg-white p-8 rounded-lg shadow-md mb-20'>
                <h2 className='text-2xl font-bold mb-6 text-center'>
                    Calculate Your Fare
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                    <div>
                        <label className='block text-gray-700 mb-2'>
                            Start Coordinates (lat, lng)
                        </label>
                        <div className='flex space-x-2'>
                            <Input
                                type='number'
                                placeholder='Latitude'
                                value={start.lat}
                                onChange={(e) =>
                                    setStart({
                                        ...start,
                                        lat: parseFloat(e.target.value),
                                    })
                                }
                            />
                            <Input
                                type='number'
                                placeholder='Longitude'
                                value={start.lng}
                                onChange={(e) =>
                                    setStart({
                                        ...start,
                                        lng: parseFloat(e.target.value),
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <label className='block text-gray-700 mb-2'>
                            End Coordinates (lat, lng)
                        </label>
                        <div className='flex space-x-2'>
                            <Input
                                type='number'
                                placeholder='Latitude'
                                value={end.lat}
                                onChange={(e) =>
                                    setEnd({
                                        ...end,
                                        lat: parseFloat(e.target.value),
                                    })
                                }
                            />
                            <Input
                                type='number'
                                placeholder='Longitude'
                                value={end.lng}
                                onChange={(e) =>
                                    setEnd({
                                        ...end,
                                        lng: parseFloat(e.target.value),
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>

                <Button
                    onClick={handleCalculate}
                    className='w-full md:w-auto mx-auto block'
                >
                    Calculate Fare
                </Button>

                {distance !== null && fare !== null && (
                    <div className='mt-6 text-center'>
                        <p className='text-lg'>
                            Distance:{' '}
                            <span className='font-semibold'>
                                {formatDistance(distance)}
                            </span>
                        </p>
                        <p className='text-lg'>
                            Estimated Fare:{' '}
                            <span className='font-semibold'>৳{fare}</span>
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}
