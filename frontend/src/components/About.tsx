import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Cpu, Layers, Activity, Shield } from 'lucide-react';

const About = () => {
    return (
        <section
            id='about'
            className='py-24 bg-background relative overflow-hidden'
        >
            <div className='container mx-auto px-6 relative z-10'>
                <div className='flex flex-col lg:flex-row items-center gap-16'>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className='flex-1 space-y-8'
                    >
                        <div className='inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider'>
                            Project Overview
                        </div>
                        <h2 className='text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted leading-tight'>
                            Advanced Media <br />
                            <span className='text-primary'>Forensics System</span>
                        </h2>
                        <p className='text-lg text-muted-foreground leading-relaxed'>
                            Deepfake detection system uses advanced deep learning and frequency-domain models to
                            identify manipulated media with high accuracy. Our system analyzes both visual artifacts and
                            frequency inconsistencies to provide a comprehensive assessment of media authenticity.
                        </p>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4'>
                            {[
                                { icon: BrainCircuit, title: 'Hybrid AI Models', text: 'CNN + XceptionNet' },
                                { icon: Layers, title: 'Dual Analysis', text: 'Spatial & Temporal' },
                                { icon: Cpu, title: 'Hardware Optimized', text: 'Fast Inference' },
                                { icon: Activity, title: 'Real-time Scoring', text: 'Probability Analysis' }
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className='flex items-start gap-4 group'
                                >
                                    <div className='p-3 rounded-lg bg-primary/10 border border-primary/20 group-hover:border-primary/50 transition-all'>
                                        <item.icon className='w-6 h-6 text-primary' />
                                    </div>
                                    <div>
                                        <h4 className='font-semibold text-foreground'>{item.title}</h4>
                                        <p className='text-sm text-muted-foreground'>{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className='flex-1 relative'
                    >
                        <div className='relative z-10 rounded-2xl overflow-hidden border border-border bg-secondary/20 backdrop-blur-xl aspect-square flex items-center justify-center p-8 group'>
                            <div className='absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none' />
                            <div className='relative w-full h-full border border-primary/20 rounded-xl p-8 flex items-center justify-center bg-background/50 shadow-2xl'>
                                <div className='text-center space-y-4'>
                                    <div className='w-20 h-20 mx-auto bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/40 animate-pulse'>
                                        <Shield className='w-10 h-10 text-primary-foreground' />
                                    </div>
                                    <div className='space-y-2'>
                                        <div className='h-2 w-32 bg-border rounded-full mx-auto' />
                                        <div className='h-2 w-48 bg-border rounded-full mx-auto' />
                                        <div className='h-2 w-24 bg-primary/50 rounded-full mx-auto' />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Tech Badges */}
                            <div className='absolute top-8 left-8 bg-primary px-3 py-1 rounded-full text-[10px] font-bold text-primary-foreground shadow-lg animate-bounce duration-[2000ms]'>
                                FFT ANALYSIS
                            </div>
                            <div className='absolute bottom-12 right-12 bg-accent px-3 py-1 rounded-full text-[10px] font-bold text-accent-foreground shadow-lg animate-bounce duration-[2500ms]'>
                                DCT DETECTION
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
