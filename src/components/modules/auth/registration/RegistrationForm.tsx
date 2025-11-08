import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from '@/components/ui/field';
import {Input} from '@/components/ui/input';

import z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import {Link} from 'react-router';
import Password from '@/components/ui/password-strength-indicator';
import {Checkbox} from '@/components/ui/checkbox';
import {useRegisterMutation} from '@/redux/features/auth/auth.api';

const registrationFormSchema = z
    .object({
        name: z
            .string()
            .min(2, {message: 'Name must be at least 2 characters long'})
            .max(20, {message: 'Name cannot exceed 20 characters'})
            .optional(),
        email: z.string().email({message: 'Invalid email'}),
        NID: z.coerce
            .number()
            .min(1, {message: 'NID is required and must be a valid number'}),
        password: z
            .string()
            .min(8, {message: 'Password must be at least 8 characters long'})
            .max(20, {message: 'Password cannot exceed 20 characters'})
            .regex(/^(?=.*[A-Z])/, {
                message: 'Must contain at least 1 uppercase letter',
            })
            .regex(/^(?=.*[!@#$%^&*])/, {
                message: 'Must contain at least one special character',
            })
            .regex(/^(?=.*\d)/, {message: 'Must contain at least one number'}),
        confirmPassword: z.string(),
        isDriver: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

type FormValues = z.input<typeof registrationFormSchema>;

export function RegistrationForm({
    className,
    ...props
}: React.ComponentProps<'form'>) {
    const [register] = useRegisterMutation();

    const form = useForm<FormValues>({
        resolver: zodResolver(registrationFormSchema),
        defaultValues: {
            name: '',
            email: '',
            NID: '',
            password: '',
            confirmPassword: '',
            isDriver: false,
        },
    });
    const isDriver = form.watch('isDriver');
    console.log(isDriver);

    const onSubmit = async (data: FormValues) => {
        const userInfo = {
            name: data.name,
            email: data.email,
            NID: data.NID,
            password: data.password,
            confirmPassword: data.confirmPassword,
            isDriver: data.isDriver,
        };
        console.log(userInfo);
        const res = await register(userInfo).unwrap();
        console.log(res);
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
                    name='isDriver'
                    control={form.control}
                    render={({field}) => (
                        <Field>
                            <FieldLabel htmlFor='email'>
                                Create account as a driver
                            </FieldLabel>

                            <Checkbox
                                id='isDriver'
                                checked={field.value}
                                className='w-2'
                                onCheckedChange={(checked) =>
                                    field.onChange(checked === true)
                                }
                            />
                        </Field>
                    )}
                />
                <Button form='registration-form' type='submit'>
                    Register
                </Button>
                <FieldSeparator>Or continue with</FieldSeparator>
                <Field>
                    {/* github login */}
                    <Button variant='outline' type='button'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                        >
                            <path
                                d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
                                fill='currentColor'
                            />
                        </svg>
                        Login with GitHub
                    </Button>
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

// <Field>
//     <div className='flex items-center'>
//         <FieldLabel htmlFor='password'>
//             Password
//         </FieldLabel>
//     </div>
//     <Input
//         {...field}
//         id='password'
//         type='password'
//         placeholder='********'
//         required
//     />
//     <FieldDescription className='text-red-500'>
//         {form.formState.errors.password?.message}
//     </FieldDescription>
// </Field>
