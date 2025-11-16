import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/accordion';

export default function FAQs() {
    return (
        <section className='py-20 px-4'>
            <div className='max-w-4xl mx-auto text-center mb-10'>
                <h2 className='text-4xl font-bold'>
                    Frequently Asked Questions
                </h2>
                <p className='text-muted-foreground mt-2'>
                    Quick answers to the questions people ask the most.
                </p>
            </div>

            <Accordion
                type='single'
                collapsible
                className='max-w-4xl mx-auto space-y-4'
            >
                <AccordionItem value='item-1'>
                    <AccordionTrigger>How do I book a ride?</AccordionTrigger>
                    <AccordionContent>
                        Set your pickup, choose your destination, and confirm. A
                        nearby driver gets assigned instantly.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='item-2'>
                    <AccordionTrigger>
                        How are fares calculated?
                    </AccordionTrigger>
                    <AccordionContent>
                        Pricing is based on distance, time, traffic, and demand.
                        No hidden fees — you always see the fare upfront.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='item-3'>
                    <AccordionTrigger>Is my driver verified?</AccordionTrigger>
                    <AccordionContent>
                        Yes. All drivers go through identity checks, training,
                        and background verification before joining.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='item-4'>
                    <AccordionTrigger>Can I track my ride?</AccordionTrigger>
                    <AccordionContent>
                        Absolutely. You can monitor the car’s position live from
                        pickup to drop-off.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    );
}
