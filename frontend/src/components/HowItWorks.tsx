import React from 'react';
import { motion } from 'framer-motion';
import { FileUp, Scissors, ScanFace, BrainCircuit, CheckCircle2 } from 'lucide-react';

const steps = [
    {
        icon: FileUp,
        title: 'Upload Media',
        description: 'Submit your video or image through our secure portal for analysis.'
    },
    {
        icon: Scissors,
        title: 'Extract Frames',
        description: 'Videos are decomposed into high-quality individual frames for processing.'
    },
    {
        icon: ScanFace,
        title: 'Face Detection',
        description: 'AI locates and isolates facial regions using advanced cropping algorithms.'
    },
    {
        icon: BrainCircuit,
        title: 'AI Model Analysis',
        description: 'Extracted data is passed through our ensemble of deep learning models.'
    },
    {
        icon: CheckCircle2,
        title: 'Fake or Real Result',
        description: 'Get a comprehensive report with probability scores and authenticity validation.'
    }
];

const HowItWorks = () => {
    return (
        <section
            id='how-it-works'
            className='py-24 bg-background relative overflow-hidden'
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
                        The Workflow
                    </motion.div>
                    <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
                        How It <span className='text-primary'>Works</span>
                    </h2>
                    <p className='text-muted-foreground text-lg'>
                        A streamlined, automated process to identify media manipulations with forensic precision using
                        state-of-the-art AI.
                    </p>
                </div>

                <div className='relative'>
                    {/* Connection Line */}
                    <div className='absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden lg:block -translate-y-1/2' />

                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 relative z-10'>
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className='flex flex-col items-center text-center group'
                            >
                                <div className='w-20 h-20 rounded-2xl bg-secondary/50 border border-border flex items-center justify-center mb-8 relative group-hover:border-primary/50 transition-all duration-300 backdrop-blur-sm'>
                                    <div className='absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm border-4 border-background'>
                                        {idx + 1}
                                    </div>
                                    <step.icon className='w-8 h-8 text-primary group-hover:scale-110 transition-all duration-300' />
                                </div>
                                <h3 className='text-xl font-bold text-foreground mb-3'>{step.title}</h3>
                                <p className='text-muted-foreground text-sm leading-relaxed px-4 group-hover:text-foreground transition-colors'>
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
