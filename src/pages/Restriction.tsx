import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {AlertTriangle, Mail, Phone} from 'lucide-react';
import {useLocation, useNavigate} from 'react-router';
import {toast} from 'sonner';
import {useState, useEffect} from 'react';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';

export default function Restriction() {
    const location = useLocation();
    const navigate = useNavigate();

    // Safely access location.state with fallbacks
    const status = location.state?.status;
    const message = location.state?.message;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    useEffect(() => {
        if (!location.state) {
            console.warn('No state passed to Restriction component');
            // navigate('/');
        }
    }, [location.state, navigate]);

    const handleChange = (field: string, value: string) => {
        setFormData({...formData, [field]: value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const toastId = toast.loading('Sending your message...');

        console.log('Form submitted:', formData);

        setTimeout(() => {
            toast.success('Message sent successfully!', {id: toastId});
        }, 1000);
    };

    return (
        <div className='min-h-screen flex flex-col lg:flex-row-reverse items-center justify-center bg-gray-50 gap-6 p-6'>
            {/* Contact Form */}
            <section className='w-full lg:grow max-w-lg'>
                <Card className='shadow-lg'>
                    <CardHeader className='text-center'>
                        <CardTitle>Get in Touch</CardTitle>
                        <CardDescription>
                            We'd love to hear from you!
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

            {/* Restriction Message Card */}
            <Card className='w-full max-w-lg shadow-lg'>
                <CardHeader className='text-center'>
                    <div className='mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-yellow-100'>
                        <AlertTriangle className='w-8 h-8 text-yellow-600' />
                    </div>

                    <CardTitle className='text-2xl'>{status}</CardTitle>
                    <CardDescription className='mt-2 text-gray-600'>
                        {message}
                    </CardDescription>
                </CardHeader>

                <CardContent className='space-y-6 text-center'>
                    <p className='text-gray-700'>
                        If you believe this is a mistake or need expedited
                        review, reach out to our support team.
                    </p>

                    <div className='space-y-3'>
                        <div className='flex items-center justify-center space-x-2 text-gray-700'>
                            <Mail className='w-4 h-4' />
                            <span>support@example.com</span>
                        </div>

                        <div className='flex items-center justify-center space-x-2 text-gray-700'>
                            <Phone className='w-4 h-4' />
                            <span>+880 1234 567890</span>
                        </div>
                    </div>

                    <Button
                        variant='default'
                        className='w-full'
                        onClick={() => navigate('/')}
                    >
                        Return to Home
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
