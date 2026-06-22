import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, ShieldCheck } from 'lucide-react';

const Research = () => {
    return (
        <section
            id='research'
            className='py-24 bg-background relative overflow-hidden'
        >
            {/* Background decoration */}
            <div className='absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none' />

            <div className='container mx-auto px-6 relative z-10'>
                <div className='text-center max-w-3xl mx-auto mb-16'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className='inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4'
                    >
                        Academic Foundation
                    </motion.div>
                    <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
                        Scientific <span className='text-primary'>Documentation</span>
                    </h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className='max-w-4xl mx-auto'
                >
                    <div className='relative group'>
                        {/* Glow effect */}
                        <div className='absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200' />

                        <div className='relative p-8 md:p-12 rounded-3xl bg-secondary/40 border border-border backdrop-blur-2xl flex flex-col md:flex-row items-center gap-10'>
                            <div className='w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0'>
                                <FileText className='w-12 h-12 md:w-16 md:h-16 text-primary' />
                            </div>

                            <div className='flex-1 text-center md:text-left'>
                                <h3 className='text-2xl md:text-3xl font-bold text-foreground mb-4'>
                                    Published Research Paper
                                </h3>
                                <p className='text-muted-foreground text-lg mb-8 leading-relaxed'>
                                    Our methodologies, model architectures, and experimental results are thoroughly
                                    documented in our latest publication. Click below to view the complete DeepFake
                                    Detection research paper.
                                </p>

                                <div className='flex flex-col sm:flex-row items-center gap-6'>
                                    <a
                                        href='https://drive.google.com/file/d/1YAQo3TuKO1fP7nJ--6kznuvA-KBeUEFc/view?usp=drive_link'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all shadow-xl shadow-primary/25 flex items-center justify-center gap-3 group'
                                    >
                                        View Research Paper
                                        <ExternalLink className='w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
                                    </a>

                                    <div className='flex items-center gap-2 text-sm text-muted-foreground bg-white/5 px-4 py-2 rounded-full border border-white/10'>
                                        <ShieldCheck className='w-4 h-4 text-primary' />
                                        Verified Methodology
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Research;
