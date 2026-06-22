import React from 'react';
import { motion } from 'framer-motion';
import { Video, Cpu, Network, Smartphone, Lightbulb, ArrowUpRight } from 'lucide-react';

const FutureScope = () => {
    const items = [
        {
            icon: Video,
            title: 'Real-time Live Camera Detection',
            text: 'Integration with live conferencing and security cameras for on-the-fly verification.'
        },
        {
            icon: Cpu,
            title: 'Better Transformer Integration',
            text: 'Implementing advanced Vision Transformers to capture long-range dependencies in video.'
        },
        {
            icon: Network,
            title: 'Higher Accuracy Models',
            text: 'Continuous training on expanding datasets to maintain lead against new generation tools.'
        },
        {
            icon: Smartphone,
            title: 'Mobile App Support',
            text: 'Native applications for iOS and Android providing on-device media verification.'
        },
        {
            icon: Lightbulb,
            title: 'API Integration',
            text: 'Enterprise-grade APIs for third-party platforms to bake detection into their workflow.'
        }
    ];

    return (
        <section className='py-24 bg-background border-t border-border relative overflow-hidden'>
            <div className='container mx-auto px-6'>
                <div className='flex flex-col lg:flex-row gap-16 items-center'>
                    <div className='flex-1'>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className='inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4'
                        >
                            The Roadmap
                        </motion.div>
                        <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
                            Future <span className='text-primary'>Scope</span> & <br />
                            Innovation
                        </h2>
                        <p className='text-muted-foreground text-lg mb-8'>
                            As deepfake technology evolves, our systems stay ahead of the curve through constant
                            research and integration of emerging AI paradigms.
                        </p>
                        <div className='p-8 rounded-3xl bg-gradient-to-br from-primary to-accent text-primary-foreground relative group overflow-hidden'>
                            <div className='relative z-10'>
                                <h3 className='text-2xl font-bold mb-4'>Want to contribute?</h3>
                                <p className='opacity-90 mb-6'>
                                    Join our research initiative to help make the digital world a more authentic place.
                                </p>
                                <button className='flex items-center gap-2 font-bold hover:underline'>
                                    Explore Open Research <ArrowUpRight className='w-5 h-5' />
                                </button>
                            </div>
                            <div className='absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700' />
                        </div>
                    </div>

                    <div className='flex-1 grid grid-cols-1 gap-4'>
                        {items.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className='group p-6 rounded-2xl bg-secondary/30 border border-border hover:bg-secondary/50 transition-all flex gap-6 backdrop-blur-sm'
                            >
                                <div className='shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all'>
                                    <item.icon className='w-6 h-6' />
                                </div>
                                <div>
                                    <h4 className='font-bold text-foreground mb-1 group-hover:text-primary transition-colors'>
                                        {item.title}
                                    </h4>
                                    <p className='text-sm text-muted-foreground leading-relaxed'>{item.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FutureScope;
