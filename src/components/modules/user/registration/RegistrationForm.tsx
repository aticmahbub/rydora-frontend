import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import {Input} from '@/components/ui/input';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router';
import Password from '@/components/ui/password-strength-indicator';
import {
    registrationFormSchema,
    type RegistrationFormData,
} from './registrationFormSchema';
import {toast} from 'sonner';
import {useRegisterMutation} from '@/redux/features/user/user.api';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {role} from '@/constants/role';

export function RegistrationForm({
    className,
    ...props
}: React.ComponentProps<'form'>) {
    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    const form = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationFormSchema),
        defaultValues: {
            name: '',
            email: '',
            NID: '',
            password: '',
            confirmPassword: '',
            role: role.RIDER,
        },
    });

    const onSubmit = async (data: RegistrationFormData) => {
        const toastId = toast.loading('Creating account...');
        const userInfo = {
            name: data.name,
            email: data.email,
            NID: data.NID as number,
            password: data.confirmPassword,
            role: data.role,
        };
        try {
            const res = await register(userInfo).unwrap();
            if (res.success) {
                toast.success('Account is created successfully', {id: toastId});

                if (res.data.role === role.DRIVER) {
                    navigate('/driver-registration', {
                        state: {
                            email: data.email,
                        },
                    });
                    return;
                }

                navigate('/', {state: {email: data.email}});
            } else {
                toast.error('Failed to create account', {id: toastId});
            }
        } catch (error) {
            toast.error('Failed to create account', {id: toastId});
            console.log(error);
        }
    };

    return (
        <form
            id='registration-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn('flex flex-col gap-6', className)}
            {...props}
        >
            <FieldGroup>
                <div className='flex flex-col items-center gap-1 text-center'>
                    <h1 className='text-2xl font-bold'>Join Rydora</h1>
                    <p className='text-muted-foreground text-sm text-balance'>
                        Create an account to start booking or driving with ease.
                    </p>
                </div>

                <Controller
                    name='name'
                    control={form.control}
                    render={({field}) => (
                        <Field>
                            <FieldLabel htmlFor='name'>Name</FieldLabel>
                            <Input {...field} placeholder='John Doe' required />
                            <FieldDescription className='text-red-500'>
                                {form.formState.errors.name?.message}
                            </FieldDescription>
                        </Field>
                    )}
                />

                <Controller
                    name='email'
                    control={form.control}
                    render={({field}) => (
                        <Field>
                            <FieldLabel htmlFor='email'>Email</FieldLabel>
                            <Input
                                {...field}
                                placeholder='john@example.com'
                                required
                            />
                            <FieldDescription className='text-red-500'>
                                {form.formState.errors.email?.message}
                            </FieldDescription>
                        </Field>
                    )}
                />

                <Controller
                    name='NID'
                    control={form.control}
                    render={({field}) => (
                        <Field>
                            <FieldLabel htmlFor='NID'>NID</FieldLabel>
                            <Input
                                {...field}
                                value={field.value as string}
                                placeholder='1234567890'
                                required
                            />
                            <FieldDescription className='text-red-500'>
                                {form.formState.errors.NID?.message}
                            </FieldDescription>
                        </Field>
                    )}
                />

                <Controller
                    name='password'
                    control={form.control}
                    render={({field}) => (
                        <Field>
                            <Password {...field} />
                        </Field>
                    )}
                />
                <Controller
                    name='confirmPassword'
                    control={form.control}
                    render={({field}) => (
                        <Field>
                            <div className='flex items-center'>
                                <FieldLabel htmlFor='confirmPassword'>
                                    Confirm Password
                                </FieldLabel>
                            </div>
                            <Input
                                {...field}
                                id='confirmPassword'
                                type='password'
                                placeholder='********'
                                required
                            />
                            <FieldDescription className='text-red-500'>
                                {form.formState.errors.confirmPassword?.message}
                            </FieldDescription>
                        </Field>
                    )}
                />

                <Controller
                    name='role'
                    control={form.control}
                    render={({field}) => (
                        <Field>
                            <FieldLabel>Select role</FieldLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                            >
                                <SelectTrigger className='w-[180px]'>
                                    <SelectValue placeholder='Select a role' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Role</SelectLabel>
                                        <SelectItem value='RIDER'>
                                            Rider
                                        </SelectItem>
                                        <SelectItem value='DRIVER'>
                                            Driver
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                    )}
                />
                <Button form='registration-form' type='submit'>
                    Register
                </Button>

                <Field>
                    <FieldDescription className='text-center'>
                        Already have an account?{' '}
                        <Link
                            to='/login'
                            className='ml-auto text-sm underline-offset-4 hover:underline'
                        >
                            Login
                        </Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    );
}
