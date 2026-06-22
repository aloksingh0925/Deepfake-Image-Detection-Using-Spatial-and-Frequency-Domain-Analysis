import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Upload, Target, BarChart3, Lock, FastForward } from 'lucide-react';

const features = [
    {
        icon: Zap,
        title: 'Real-Time Detection',
        description: 'Analyze live streams and video feeds with minimal latency using optimized inference.'
    },
    {
        icon: Upload,
        title: 'Image ',
        description: 'Securely upload media files in various formats for comprehensive forensic analysis.'
    },
    {
        icon: Target,
        title: 'AI Accuracy Prediction',
        description: 'High-precision results backed by state-of-the-art deep learning architectures.'
    },
    {
        icon: BarChart3,
        title: 'Fake Probability Score',
        description: 'Get detailed confidence metrics and heatmaps of manipulated regions.'
    },
    {
        icon: Lock,
        title: 'Secure Analysis',
        description: 'Your data is processed securely with end-to-end encryption and privacy protection.'
    },
    {
        icon: FastForward,
        title: 'Fast Processing',
        description: 'Leverage GPU-accelerated pipelines for rapid results without compromising quality.'
    }
];

const Features = () => {
    return (
        <section
            id='features'
            className='py-24 bg-background relative'
        >
            <div className='container mx-auto px-6'>
                <div className='text-center max-w-3xl mx-auto mb-20'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className='inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4'
                    >
                        Core Capabilities
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className='text-4xl md:text-5xl font-bold text-foreground mb-6'
                    >
                        Powerful Features for <br />
                        <span className='text-primary'>Digital Integrity</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className='text-muted-foreground text-lg'
                    >
                        Our platform provides a comprehensive suite of tools designed to identify and flag deepfake
                        content with unprecedented accuracy and speed.
                    </motion.p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className='group p-8 rounded-2xl bg-secondary/30 border border-border hover:border-primary/30 hover:bg-secondary/50 transition-all duration-300 backdrop-blur-sm'
                        >
                            <div className='w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all duration-300'>
                                <feature.icon className='w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors' />
                            </div>
                            <h3 className='text-xl font-bold text-foreground mb-4'>{feature.title}</h3>
                            <p className='text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors'>
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
