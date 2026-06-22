import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Fingerprint, Waves, Layers, Binary } from 'lucide-react';

const models = [
    {
        name: 'MesoNet',
        icon: Binary,
        tag: 'Microscopic Analysis',
        description:
            'Specialized CNN architecture focusing on microscopic artifacts and forged regions in video frames.'
    },
    {
        name: 'MobileNetV2',
        icon: Layers,
        tag: 'Efficient Inference',
        description:
            'Streamlined architecture optimized for fast, real-time detection without sacrificing forensic depth.'
    },
    {
        name: 'XceptionNet',
        icon: Fingerprint,
        tag: 'Best Performer',
        description:
            'Our flagship model using depthwise separable convolutions to achieve peak accuracy in deepfake detection.'
    },
    {
        name: 'EfficientNetB4',
        icon: ShieldAlert,
        tag: 'Balanced Precision',
        description:
            'Highly scalable model that achieves superior results by balancing network depth, width, and resolution.'
    },
    {
        name: 'FrequencyNet',
        icon: Waves,
        tag: 'Signal Forensic',
        description: 'Analyzes the frequency domain (FFT/DCT) to detect synthetic patterns invisible to the human eye.'
    }
];

const Models = () => {
    return (
        <section
            id='models'
            className='py-24 bg-background relative overflow-hidden'
        >
            <div className='container mx-auto px-6'>
                <div className='flex flex-col lg:flex-row items-end justify-between mb-20 gap-8'>
                    <div className='max-w-2xl'>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className='inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4'
                        >
                            Our Core Architectures
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className='text-4xl md:text-5xl font-bold text-foreground mb-6'
                        >
                            AI <span className='text-primary'>Models</span> For <br />
                            DeepFake Detection
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className='text-muted-foreground max-w-sm mb-2'
                    >
                        We utilize only the most advanced deep learning architectures, carefully tuned for forensic
                        media analysis and fake detection.
                    </motion.div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
                    {models.map((model, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className='group p-6 rounded-2xl bg-secondary/30 border border-border hover:border-primary/30 hover:bg-gradient-to-b hover:from-secondary/50 hover:to-primary/5 transition-all duration-300 backdrop-blur-sm'
                        >
                            <div className='w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary transition-all duration-300'>
                                <model.icon className='w-6 h-6 text-primary group-hover:text-primary-foreground' />
                            </div>
                            <h3 className='text-xl font-bold text-foreground mb-2'>{model.name}</h3>
                            <div className='text-[10px] font-bold text-accent uppercase tracking-widest mb-4'>
                                {model.tag}
                            </div>
                            <p className='text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors'>
                                {model.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Glow */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[180px] pointer-events-none' />
        </section>
    );
};

export default Models;
