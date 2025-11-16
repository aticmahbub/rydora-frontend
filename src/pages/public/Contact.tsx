import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import {useState} from 'react';
import {Textarea} from '@/components/ui/textarea';
import {toast} from 'sonner';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (field: string, value: string) => {
        setFormData({...formData, [field]: value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        // const toastId = toast.loading('Sending your message...');
        e.preventDefault();
        console.log('Form submitted:', formData);
        toast.success('Sent your message successfully');
        setFormData({name: '', email: '', message: ''});
    };

    return (
        <div className='min-h-screen bg-gray-50 py-20'>
            {/* Hero / Header */}
            <section className='text-center mb-16'>
                <h1 className='text-5xl font-bold mb-4'>Contact Us</h1>
                <p className='max-w-2xl mx-auto text-gray-600'>
                    Have questions? Send us a message and we'll get back to you
                    as soon as possible.
                </p>
            </section>

            {/* Contact Form */}
            <section className='max-w-3xl mx-auto'>
                <Card className='shadow-lg'>
                    <CardHeader className='text-center'>
                        <CardTitle>Get in Touch</CardTitle>
                        <CardDescription>
                            We’d love to hear from you!
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className='space-y-4' onSubmit={handleSubmit}>
                            <div>
                                <label className='block text-gray-700 mb-1'>
                                    Name
                                </label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) =>
                                        handleChange('name', e.target.value)
                                    }
                                    placeholder='Your Name'
                                    required
                                />
                            </div>

                            <div>
                                <label className='block text-gray-700 mb-1'>
                                    Email
                                </label>
                                <Input
                                    type='email'
                                    value={formData.email}
                                    onChange={(e) =>
                                        handleChange('email', e.target.value)
                                    }
                                    placeholder='you@example.com'
                                    required
                                />
                            </div>

                            <div>
                                <label className='block text-gray-700 mb-1'>
                                    Message
                                </label>
                                <Textarea
                                    value={formData.message}
                                    onChange={(e) =>
                                        handleChange('message', e.target.value)
                                    }
                                    placeholder='Write your message here...'
                                    required
                                    rows={5}
                                />
                            </div>

                            <Button type='submit' className='w-full'>
                                Send Message
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </section>

            {/* Contact Info (Optional) */}
            <section className='mt-16 max-w-3xl mx-auto text-center space-y-4'>
                <p className='text-gray-600'>Email: support@example.com</p>
                <p className='text-gray-600'>Phone: +880 1234 567890</p>
                <p className='text-gray-600'>
                    Address: 123 Main Street, Dhaka, Bangladesh
                </p>
            </section>
        </div>
    );
}
