/* eslint-disable @typescript-eslint/no-explicit-any */
import {Button} from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {FieldGroup} from '@/components/ui/field';
import {Input} from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {useDriverRegistrationMutation} from '@/redux/features/driver/driver.api';
import {Spinner} from '@/components/ui/Spinner';
import {useState} from 'react';
import {
    vehicleRegistrationFormSchema,
    type TVehicleRegistrationForm,
} from './driverRegistrationFormSchema';

interface DriverRegistrationFormProps
    extends React.ComponentProps<typeof Card> {
    onSuccess?: () => void;
    onError?: (error: any) => void;
}

export function DriverRegistrationForm({
    onSuccess,
    onError,
    ...props
}: DriverRegistrationFormProps) {
    const [driverRegistration, {isLoading}] = useDriverRegistrationMutation();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<TVehicleRegistrationForm>({
        resolver: zodResolver(vehicleRegistrationFormSchema),
        defaultValues: {
            drivingLicenseNo: '',
            registrationNo: '',
            vehicleType: undefined,
            brand: '',
            model: '',
            color: '',
            capacity: 4,
            insuranceProvider: '',
            insurancePolicyNo: '',
            insuranceExpiryDate: '',
        },
    });

    const onSubmit = async (data: TVehicleRegistrationForm) => {
        try {
            const registrationData = {
                drivingLicenseNo: data.drivingLicenseNo,
                vehicle: {
                    registrationNo: data.registrationNo,
                    vehicleType: data.vehicleType,
                    brand: data.brand,
                    model: data.model,
                    color: data.color,
                    capacity: data.capacity,
                },
            };

            console.log('driver registration data:', registrationData);

            const res = await driverRegistration(registrationData).unwrap();
            console.log('res:', res);

            setIsSubmitted(true);
            form.reset();

            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            console.error('Driver registration failed:', error);

            let errorMessage = 'Registration failed. Please try again.';
            if (error?.data?.message) {
                errorMessage = error.data.message;
            } else if (error?.status === 400) {
                if (error?.data?.errorSources?.[0]?.message) {
                    errorMessage = error.data.errorSources[0].message;
                } else {
                    errorMessage = 'Driver profile or vehicle already exists.';
                }
            }

            form.setError('root', {
                type: 'manual',
                message: errorMessage,
            });

            if (onError) {
                onError(error);
            }
        }
    };

    // Success state
    if (isSubmitted) {
        return (
            <Card className='w-full max-w-4xl mx-auto' {...props}>
                <CardHeader className='text-center'>
                    <div className='w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4'>
                        <span className='text-2xl'>✅</span>
                    </div>
                    <CardTitle className='text-green-600'>
                        Application Submitted!
                    </CardTitle>
                    <CardDescription>
                        Your driver and vehicle registration has been received.
                    </CardDescription>
                </CardHeader>
                <CardContent className='text-center space-y-4'>
                    <p className='text-sm text-gray-600'>
                        We'll review your application and notify you once
                        approved. This usually takes 1-2 business days.
                    </p>
                    <Button
                        onClick={() => {
                            setIsSubmitted(false);
                        }}
                        variant='outline'
                        className='w-full'
                    >
                        Submit Another Application
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className='w-full max-w-4xl mx-auto' {...props}>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <div>
                        <CardTitle>Become a Driver</CardTitle>
                        <CardDescription>
                            Complete your driver and vehicle registration
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        <FieldGroup>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                {/* left column - driver & vehicle info */}
                                <div className='space-y-6'>
                                    {/* Driver Information */}
                                    <div className='space-y-4'>
                                        <h3 className='text-lg font-semibold text-gray-900 border-b pb-2'>
                                            Driver Information
                                        </h3>
                                        <FormField
                                            control={form.control}
                                            name='drivingLicenseNo'
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Driving License Number *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type='text'
                                                            placeholder='DL-123456789'
                                                            className='uppercase'
                                                            disabled={isLoading}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Enter your valid driving
                                                        license number
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* vehicle  */}
                                    <div className='space-y-4'>
                                        <h3 className='text-lg font-semibold text-gray-900 border-b pb-2'>
                                            Vehicle Information
                                        </h3>

                                        <FormField
                                            control={form.control}
                                            name='registrationNo'
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Registration No *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder='DHAKA-METRO-1234'
                                                            className='uppercase'
                                                            disabled={isLoading}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='vehicleType'
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Vehicle Type *
                                                    </FormLabel>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder='Select vehicle type' />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value='CAR'>
                                                                Car
                                                            </SelectItem>
                                                            <SelectItem value='BIKE'>
                                                                Bike
                                                            </SelectItem>
                                                            <SelectItem value='CNG'>
                                                                CNG
                                                            </SelectItem>
                                                            <SelectItem value='MICROBUS'>
                                                                Microbus
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className='grid grid-cols-2 gap-4'>
                                            <FormField
                                                control={form.control}
                                                name='brand'
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Brand *
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder='Toyota'
                                                                disabled={
                                                                    isLoading
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name='model'
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Model *
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder='Corolla'
                                                                disabled={
                                                                    isLoading
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name='color'
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Color *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder='White'
                                                            disabled={isLoading}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className='space-y-6'>
                                    {/* Vehicle Specifications */}
                                    <div className='space-y-4'>
                                        <h3 className='text-lg font-semibold text-gray-900 border-b pb-2'>
                                            Vehicle Specifications
                                        </h3>

                                        <div className='grid grid-cols-2 gap-4'>
                                            <FormField
                                                control={form.control}
                                                name='capacity'
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Capacity *
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                type='number'
                                                                min={1}
                                                                max={20}
                                                                onChange={(e) =>
                                                                    field.onChange(
                                                                        parseInt(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        ),
                                                                    )
                                                                }
                                                                disabled={
                                                                    isLoading
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    {/* insurance information */}
                                    <div className='space-y-4'>
                                        <h3 className='text-lg font-semibold text-gray-900 border-b pb-2'>
                                            Insurance Information
                                        </h3>

                                        <FormField
                                            control={form.control}
                                            name='insuranceProvider'
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Insurance Provider *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder='Company Name'
                                                            disabled={isLoading}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='insurancePolicyNo'
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Policy Number *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder='POL-123456'
                                                            disabled={isLoading}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='insuranceExpiryDate'
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Expiry Date *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type='date'
                                                            disabled={isLoading}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Document Uploads */}
                                    {/* <div className='space-y-4'>
                                        <h3 className='text-lg font-semibold text-gray-900 border-b pb-2'>
                                            Documents (Optional)
                                        </h3>

                                        <FormField
                                            control={form.control}
                                            name='registrationCard'
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Registration Card URL
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type='url'
                                                            placeholder='https://example.com/registration.pdf'
                                                            disabled={isLoading}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Link to vehicle
                                                        registration
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='insuranceDocument'
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Insurance Document URL
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type='url'
                                                            placeholder='https://example.com/insurance.pdf'
                                                            disabled={isLoading}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Link to insurance
                                                        document
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div> */}
                                </div>
                            </div>

                            {/* submit button */}
                            <div className='flex gap-3 pt-6 border-t'>
                                <Button
                                    type='submit'
                                    disabled={isLoading}
                                    className='flex-1 py-3'
                                    size='lg'
                                >
                                    {isLoading ? (
                                        <span className='flex items-center gap-2'>
                                            <Spinner size='sm' />
                                            Submitting Application...
                                        </span>
                                    ) : (
                                        <span className='flex items-center gap-2'>
                                            <span>🚗</span>
                                            Submit Driver Application
                                        </span>
                                    )}
                                </Button>
                            </div>

                            {/* Root Error Message */}
                            {form.formState.errors.root && (
                                <div className='p-3 bg-red-50 border border-red-200 rounded-md'>
                                    <p className='text-sm text-red-600'>
                                        {form.formState.errors.root.message}
                                    </p>
                                </div>
                            )}
                        </FieldGroup>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
