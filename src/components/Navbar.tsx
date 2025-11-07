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
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
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

export default function Navbar() {
    const navLinks = [
        {href: '/', label: 'Home', role: 'PUBLIC'},
        {href: '/about', label: 'About', role: 'PUBLIC'},
    ];
    const features = [
        {
            title: 'Dashboard',
            description: 'Overview of your activity',
            href: '#',
        },
        {
            title: 'Analytics',
            description: 'Track your performance',
            href: '#',
        },
        {
            title: 'Settings',
            description: 'Configure your preferences',
            href: '#',
        },
    ];

    return (
        <section className='py-4 '>
            <div className='container mx-auto'>
                <nav className='flex items-center justify-between'>
                    <a
                        href='https://www.shadcnblocks.com'
                        className='flex items-center gap-2'
                    >
                        <Logo />
                        <span className='text-lg font-semibold tracking-tighter'>
                            Rydora
                        </span>
                    </a>
                    <NavigationMenu className='hidden lg:block'>
                        <NavigationMenuList>
                            {/* Features */}
                            <NavigationMenuItem>
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
                            </NavigationMenuItem>

                            {navLinks.map((item) => (
                                <NavigationMenuItem key={item.href}>
                                    <NavigationMenuLink
                                        asChild
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <Link to={item.href}>{item.label}</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className='hidden items-center gap-4 lg:flex'>
                        <ModeToggle />
                        <Button variant='outline'>
                            <Link to='/login'>Login</Link>
                        </Button>
                        <Button>
                            <Link to='/registration'>Register</Link>
                        </Button>
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
                                    <a
                                        href='https://www.shadcnblocks.com'
                                        className='flex items-center gap-2'
                                    >
                                        <Logo />
                                        <span className='text-lg font-semibold tracking-tighter'>
                                            Rydora
                                        </span>
                                    </a>
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
                                                {features.map(
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
                                                )}
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
                                    <Button variant='outline'>Login</Button>
                                    <Button>Register</Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </nav>
            </div>
        </section>
    );
}
