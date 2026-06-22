import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Play } from 'lucide-react';

const Hero = () => {
    return (
        <section className='relative min-h-screen flex items-center justify-center pt-20 overflow-hidden'>
            {/* Background Animation Elements */}
            <div className='absolute inset-0 z-0'>
                <div className='absolute inset-0 bg-[#030711]' />
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e3a8a33,transparent)]' />
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-50 contrast-150" />

                {/* Animated Grid */}
                <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]' />
            </div>

            <div className='container mx-auto px-6 relative z-10 text-center'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8'
                >
                    <Shield className='w-4 h-4' />
                    <span>Advanced AI Protection for Digital Integrity</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className='text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400'
                >
                    DeepFake <span className='text-primary'>Detection</span> using AI
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className='max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed'
                >
                    Detect manipulated images using Deep Learning models. Protect your identity
                    and ensure digital truth with our advanced forensic tools.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className='flex flex-col sm:flex-row items-center justify-center gap-4'
                >
                    <a
                        href='#demo'
                        className='w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all shadow-xl shadow-primary/25 flex items-center justify-center gap-2 group'
                    >
                        Try Demo
                        <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                    </a>
                    <a
                        href='#research'
                        className='w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center gap-2'
                    >
                        <Play className='w-4 h-4' />
                        View Research
                    </a>
                    <a
                        href='#contact'
                        className='w-full sm:w-auto px-8 py-4 rounded-xl border border-primary/30 text-primary font-bold hover:bg-primary/10 transition-all backdrop-blur-sm flex items-center justify-center gap-2'
                    >
                        Contact Us
                    </a>
                </motion.div>
            </div>

            {/* Decorative Orbs */}
            <div className='absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none' />
            <div className='absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none' />
        </section>
    );
};

export default Hero;
