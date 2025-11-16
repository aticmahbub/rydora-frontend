import {HeroSection} from '@/components/modules/home/HeroSection';
import HowItWorks from './HowItWorks';
import Services from './Services';

import FAQs from './FAQs';
import Testimonials from './Testimonials';

export default function HomePage() {
    return (
        <div className='flex justify-center'>
            <div className='container'>
                <HeroSection />
                <HowItWorks />
                <Services />
                <Testimonials />
                <FAQs />
            </div>
        </div>
    );
}
