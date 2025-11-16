import Logo from '../assets/icons/Logo';

import {MenuIcon} from 'lucide-react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {Button} from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {ModeToggle} from './mode-toggle';
import {Link} from 'react-router';
import {useUserInfoQuery} from '@/redux/features/user/user.api';
import {authApi, useLogoutMutation} from '@/redux/features/auth/auth.api';
import {useAppDispatch} from '@/redux/hook';
import {role} from '@/constants/role';

export default function Navbar() {
    const dispatch = useAppDispatch();

    const {data} = useUserInfoQuery(undefined);
    const [logout] = useLogoutMutation();
    console.log(data?.data);
    console.log(data?.data?.role);

    const navLinks = [
        {href: '/', label: 'Home', role: 'PUBLIC'},
        {href: '/about', label: 'About', role: 'PUBLIC'},
        {href: '/pricing', label: 'Pricing', role: 'PUBLIC'},
        {href: '/how-it-works', label: 'How it works', role: 'PUBLIC'},
        {href: '/faqs', label: 'FAQs', role: 'PUBLIC'},
        {href: '/contact', label: 'Contact', role: 'PUBLIC'},

        {href: '/admin', label: 'Dashboard', role: role.ADMIN},
        {href: '/admin', label: 'Dashboard', role: role.SUPER_ADMIN},
        {href: '/user', label: 'Dashboard', role: role.USER},
        {href: '/rider', label: 'Dashboard', role: role.RIDER},
        {href: '/driver', label: 'Dashboard', role: role.DRIVER},
    ];
    // const features = [
    //     {
    //         title: 'Dashboard',
    //         description: 'Overview of your activity',
    //         href: '#',
    //     },
    //     {
    //         title: 'Analytics',
    //         description: 'Track your performance',
    //         href: '#',
    //     },
    //     {
    //         title: 'Settings',
    //         description: 'Configure your preferences',
    //         href: '#',
    //     },
    // ];

    const handleLogout = async () => {
        await logout(undefined);
        dispatch(authApi.util.resetApiState());
    };
    return (
        <section className='py-4 sticky top-0 z-50 backdrop-blur bg-white/70 border-b'>
            <div className='container mx-auto'>
                <nav className='flex items-center justify-between'>
                    <Link to='/' className='flex items-center gap-2'>
                        <Logo />
                        <span className='text-lg font-semibold tracking-tighter'>
                            Rydora
                        </span>
                    </Link>
                    <NavigationMenu className='hidden lg:block'>
                        <NavigationMenuList>
                            {/* Features */}
                            {/* <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    Features
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className='grid w-[600px] grid-cols-2 p-3'>
                                        {features.map((feature, index) => (
                                            <NavigationMenuLink
                                                href={feature.href}
                                                key={index}
                                                className='hover:bg-muted/70 rounded-md p-3 transition-colors'
                                            >
                                                <div key={feature.title}>
                                                    <p className='text-foreground mb-1 font-semibold'>
                                                        {feature.title}
                                                    </p>
                                                    <p className='text-muted-foreground text-sm'>
                                                        {feature.description}
                                                    </p>
                                                </div>
                                            </NavigationMenuLink>
                                        ))}
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem> */}

                            {navLinks.map((item, idx) => (
                                <div key={idx}>
                                    {item.role === 'PUBLIC' && (
                                        <NavigationMenuItem key={item.href}>
                                            <NavigationMenuLink
                                                asChild
                                                className={navigationMenuTriggerStyle()}
                                            >
                                                <Link to={item.href}>
                                                    {item.label}
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    )}
                                    {item.role === data?.data?.role && (
                                        <NavigationMenuItem key={item.href}>
                                            <NavigationMenuLink
                                                asChild
                                                className={navigationMenuTriggerStyle()}
                                            >
                                                <Link to={item.href}>
                                                    {item.label}
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    )}
                                </div>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                    {/* Logout */}
                    <div className='hidden items-center gap-4 lg:flex'>
                        <ModeToggle />
                        {!data?.data?.email && (
                            <div>
                                <Button variant='outline'>
                                    <Link to='/login'>Login</Link>
                                </Button>
                                <Button>
                                    <Link to='/registration'>Register</Link>
                                </Button>
                            </div>
                        )}
                        {data?.data?.email && (
                            <Button onClick={handleLogout} variant='outline'>
                                Logout
                            </Button>
                        )}
                    </div>
                    <Sheet>
                        <SheetTrigger asChild className='lg:hidden'>
                            <Button variant='outline' size='icon'>
                                <MenuIcon className='h-4 w-4' />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side='top'
                            className='max-h-screen overflow-auto'
                        >
                            <SheetHeader>
                                <SheetTitle>
                                    <Link
                                        to=''
                                        className='flex items-center gap-2'
                                    >
                                        <Logo />
                                        <span className='text-lg font-semibold tracking-tighter'>
                                            Rydora
                                        </span>
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <div className='flex flex-col p-4'>
                                <Accordion
                                    type='single'
                                    collapsible
                                    className='mb-2 mt-4'
                                >
                                    <AccordionItem
                                        value='solutions'
                                        className='border-none'
                                    >
                                        <AccordionTrigger className='text-base hover:no-underline'>
                                            Features
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className='grid md:grid-cols-2'>
                                                {/* {features.map(
                                                    (feature, index) => (
                                                        <a
                                                            href={feature.href}
                                                            key={index}
                                                            className='hover:bg-muted/70 rounded-md p-3 transition-colors'
                                                        >
                                                            <div
                                                                key={
                                                                    feature.title
                                                                }
                                                            >
                                                                <p className='text-foreground mb-1 font-semibold'>
                                                                    {
                                                                        feature.title
                                                                    }
                                                                </p>
                                                                <p className='text-muted-foreground text-sm'>
                                                                    {
                                                                        feature.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        </a>
                                                    ),
                                                )} */}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                                <div className='flex flex-col gap-6'>
                                    <a href='#' className='font-medium'>
                                        Templates
                                    </a>
                                    <a href='#' className='font-medium'>
                                        Blog
                                    </a>
                                    <a href='#' className='font-medium'>
                                        Pricing
                                    </a>
                                </div>
                                <div className='mt-6 flex flex-col gap-4'>
                                    <ModeToggle />
                                    <div>
                                        {' '}
                                        <Button variant='outline'>Login</Button>
                                        <Button>Register</Button>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </nav>
            </div>
        </section>
    );
}
