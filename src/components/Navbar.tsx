import Logo from '../assets/icons/Logo';

import {MenuIcon} from 'lucide-react';

import {Accordion, AccordionItem} from '@/components/ui/accordion';
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

    const handleLogout = async () => {
        const res = await logout(undefined);
        dispatch(authApi.util.resetApiState());
        console.log(res);
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
                            <div className='flex gap-2'>
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
                                    ></AccordionItem>
                                </Accordion>

                                {/* Wrap mobile nav links inside NavigationMenu */}
                                <NavigationMenu>
                                    <NavigationMenuList className='flex flex-col gap-6'>
                                        {navLinks.map(
                                            (item) =>
                                                (item.role === 'PUBLIC' ||
                                                    item.role ===
                                                        data?.data?.role) && (
                                                    <NavigationMenuItem
                                                        key={item.href}
                                                    >
                                                        <NavigationMenuLink
                                                            asChild
                                                            className={navigationMenuTriggerStyle()}
                                                        >
                                                            <Link
                                                                to={item.href}
                                                            >
                                                                {item.label}
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    </NavigationMenuItem>
                                                ),
                                        )}
                                        <NavigationMenuItem>
                                            <div className='mt-6 flex flex-col gap-4'>
                                                {!data?.data?.email ? (
                                                    <div className='flex flex-col gap-2'>
                                                        <NavigationMenuLink>
                                                            <Button variant='outline'>
                                                                <Link to='/login'>
                                                                    Login
                                                                </Link>
                                                            </Button>
                                                        </NavigationMenuLink>
                                                        <NavigationMenuLink>
                                                            <Button>
                                                                <Link to='/registration'>
                                                                    Register
                                                                </Link>
                                                            </Button>
                                                        </NavigationMenuLink>
                                                    </div>
                                                ) : (
                                                    <NavigationMenuLink>
                                                        <Button
                                                            onClick={
                                                                handleLogout
                                                            }
                                                            variant='outline'
                                                        >
                                                            Logout
                                                        </Button>
                                                    </NavigationMenuLink>
                                                )}
                                            </div>
                                        </NavigationMenuItem>
                                    </NavigationMenuList>
                                </NavigationMenu>
                            </div>
                        </SheetContent>
                    </Sheet>
                </nav>
            </div>
        </section>
    );
}
