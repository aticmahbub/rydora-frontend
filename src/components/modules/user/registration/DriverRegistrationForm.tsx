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
    const [currentStep, setCurrentStep] = useState(1);

    const form = useForm<TVehicleRegistrationForm>({
        resolver: zodResolver(vehicleRegistrationFormSchema),
        defaultValues: {
            drivingLicenseNo: '',
            registrationNo: '',
            vehicleType: undefined,
            brand: '',
            model: '',
            color: '',
            manufacturingYear: new Date().getFullYear(),
            capacity: 4,
            insuranceProvider: '',
            insurancePolicyNo: '',
            insuranceExpiryDate: '',
            registrationCard: '',
            insuranceDocument: '',
        },
    });

    const onSubmit = async (data: TVehicleRegistrationForm) => {
        try {
            // Prepare the registration data
            const registrationData = {
                drivingLicenseNo: data.drivingLicenseNo,
                vehicle: {
                    registrationNo: data.registrationNo,
                    vehicleType: data.vehicleType,
                    brand: data.brand,
                    model: data.model,
                    color: data.color,
                    manufacturingYear: data.manufacturingYear,
                    capacity: data.capacity,
                    registrationCard: data.registrationCard || '',
                    insurance: {
                        provider: data.insuranceProvider,
                        policyNo: data.insurancePolicyNo,
                        expiryDate: data.insuranceExpiryDate,
                        document: data.insuranceDocument || '',
                    },
                },
            };

            console.log('Submitting driver registration:', registrationData); // Debug log

            const result = await driverRegistration(registrationData).unwrap();
            console.log('Driver registration successful:', result);

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

    const nextStep = () => {
        // Validate current step before proceeding
        const fields =
            currentStep === 1
                ? [
                      'drivingLicenseNo',
                      'registrationNo',
                      'vehicleType',
                      'brand',
                      'model',
                      'color',
                  ]
                : [
                      'manufacturingYear',
                      'capacity',
                      'insuranceProvider',
                      'insurancePolicyNo',
                      'insuranceExpiryDate',
                  ];

        form.trigger(fields as any).then((isValid) => {
            if (isValid) {
                setCurrentStep(currentStep + 1);
            }
        });
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    // Success state
    if (isSubmitted) {
        return (
            <Card className='w-full max-w-2xl mx-auto' {...props}>
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
                            setCurrentStep(1);
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
        <Card className='w-full max-w-2xl mx-auto' {...props}>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <div>
                        <CardTitle>Become a Driver</CardTitle>
                        <CardDescription>
                            Step {currentStep} of 2 -{' '}
                            {currentStep === 1
                                ? 'Driver & Vehicle Info'
                                : 'Insurance & Details'}
                        </CardDescription>
                    </div>
                    <div className='flex gap-1'>
                        {[1, 2].map((step) => (
                            <div
                                key={step}
                                className={`w-3 h-3 rounded-full ${
                                    step === currentStep
                                        ? 'bg-blue-600'
                                        : step < currentStep
                                        ? 'bg-green-500'
                                        : 'bg-gray-300'
                                }`}
                            />
                        ))}
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
                            {currentStep === 1 && (
                                <>
                                    {/* Driver Information */}
                                    <div className='border-b pb-4 mb-4'>
                                        <h3 className='text-lg font-semibold text-gray-900 mb-3'>
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

                                    {/* Vehicle Basic Information */}
                                    <div className='space-y-4'>
                                        <h3 className='text-lg font-semibold text-gray-900'>
                                            Vehicle Information
                                        </h3>

                                        <div className='grid grid-cols-2 gap-4'>
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
                                        </div>

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
                                                                placeholder='Toyota, Honda, etc.'
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
                                                                placeholder='Corolla, Civic, etc.'
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
                                                            placeholder='White, Black, Red, etc.'
                                                            disabled={isLoading}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </>
                            )}

                            {currentStep === 2 && (
                                <>
                                    {/* Vehicle Specifications */}
                                    <div className='grid grid-cols-2 gap-4'>
                                        <FormField
                                            control={form.control}
                                            name='manufacturingYear'
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Manufacturing Year *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type='number'
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    parseInt(
                                                                        e.target
                                                                            .value,
                                                                    ),
                                                                )
                                                            }
                                                            disabled={isLoading}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='capacity'
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Passenger Capacity *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type='number'
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    parseInt(
                                                                        e.target
                                                                            .value,
                                                                    ),
                                                                )
                                                            }
                                                            disabled={isLoading}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Insurance Information */}
                                    <div className='border-t pt-4'>
                                        <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                                            Insurance Information
                                        </h3>

                                        <div className='grid grid-cols-2 gap-4'>
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
                                            name='insuranceExpiryDate'
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Insurance Expiry Date *
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

                                        {/* Document Uploads (Placeholder) */}
                                        <div className='grid grid-cols-2 gap-4'>
                                            <FormField
                                                control={form.control}
                                                name='registrationCard'
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Registration Card
                                                            URL
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                type='url'
                                                                placeholder='https://example.com/registration.pdf'
                                                                disabled={
                                                                    isLoading
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Upload your vehicle
                                                            registration card
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
                                                            Insurance Document
                                                            URL
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                type='url'
                                                                placeholder='https://example.com/insurance.pdf'
                                                                disabled={
                                                                    isLoading
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Upload your
                                                            insurance document
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Navigation Buttons */}
                            <div className='flex gap-3 pt-4'>
                                {currentStep > 1 && (
                                    <Button
                                        type='button'
                                        variant='outline'
                                        onClick={prevStep}
                                        disabled={isLoading}
                                        className='flex-1'
                                    >
                                        Previous
                                    </Button>
                                )}

                                {currentStep < 2 ? (
                                    <Button
                                        type='button'
                                        onClick={nextStep}
                                        disabled={isLoading}
                                        className='flex-1'
                                    >
                                        Next
                                    </Button>
                                ) : (
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
                                                Submit Application
                                            </span>
                                        )}
                                    </Button>
                                )}
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
