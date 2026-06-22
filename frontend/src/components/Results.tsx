import React from 'react';
import { motion } from 'framer-motion';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    AreaChart,
    Area
} from 'recharts';
import { TrendingUp, Target, ShieldCheck, Zap } from 'lucide-react';

const accuracyData = [
    { name: 'MesoNet', accuracy: 58.2 },
    { name: 'MobileNet', accuracy: 62.5 },
    { name: 'Xception', accuracy: 66.3 },
    { name: 'EffNetB4', accuracy: 64.8 },
    { name: 'FreqNet', accuracy: 61.2 }
];

const convergenceData = [
    { epoch: 0, loss: 0.9, accuracy: 45 },
    { epoch: 10, loss: 0.7, accuracy: 52 },
    { epoch: 20, loss: 0.5, accuracy: 58 },
    { epoch: 30, loss: 0.4, accuracy: 63 },
    { epoch: 40, loss: 0.35, accuracy: 65 },
    { epoch: 50, loss: 0.3, accuracy: 66.3 }
];

const Results = () => {
    return (
        <section
            id='results'
            className='py-24 bg-background relative overflow-hidden'
        >
            <div className='container mx-auto px-6'>
                <div className='flex flex-col lg:flex-row items-center gap-16 mb-20'>
                    <div className='flex-1'>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className='inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4'
                        >
                            Performance Metrics
                        </motion.div>
                        <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
                            Empirical <span className='text-primary'>Results</span> & <br />
                            Validation Data
                        </h2>
                        <p className='text-muted-foreground text-lg mb-8 leading-relaxed'>
                            Our models have been rigorously tested against industry-standard datasets. The results
                            demonstrate that <span className='text-primary font-bold'>XceptionNet</span> is the best
                            performer in our ensemble for deepfake detection.
                        </p>

                        <div className='grid grid-cols-2 gap-4'>
                            <div className='p-6 rounded-2xl bg-secondary/30 border border-border'>
                                <div className='flex items-center gap-3 text-primary mb-2'>
                                    <Target className='w-5 h-5' />
                                    <span className='text-sm font-bold uppercase tracking-wider'>Accuracy</span>
                                </div>
                                <div className='text-4xl font-bold text-foreground'>66.3%</div>
                            </div>
                            <div className='p-6 rounded-2xl bg-secondary/30 border border-border'>
                                <div className='flex items-center gap-3 text-accent mb-2'>
                                    <TrendingUp className='w-5 h-5' />
                                    <span className='text-sm font-bold uppercase tracking-wider'>AUC Score</span>
                                </div>
                                <div className='text-4xl font-bold text-foreground'>72.39%</div>
                            </div>
                            <div className='p-6 rounded-2xl bg-secondary/30 border border-border'>
                                <div className='flex items-center gap-3 text-primary/80 mb-2'>
                                    <ShieldCheck className='w-5 h-5' />
                                    <span className='text-sm font-bold uppercase tracking-wider'>Precision</span>
                                </div>
                                <div className='text-4xl font-bold text-foreground'>64.5%</div>
                            </div>
                            <div className='p-6 rounded-2xl bg-secondary/30 border border-border'>
                                <div className='flex items-center gap-3 text-accent/80 mb-2'>
                                    <Zap className='w-5 h-5' />
                                    <span className='text-sm font-bold uppercase tracking-wider'>Recall</span>
                                </div>
                                <div className='text-4xl font-bold text-foreground'>65.2%</div>
                            </div>
                        </div>
                    </div>

                    <div className='flex-1 w-full lg:w-auto h-[400px] bg-secondary/30 rounded-3xl border border-border p-8 backdrop-blur-sm'>
                        <h3 className='text-foreground font-bold mb-6 flex items-center gap-2'>
                            <Zap className='w-5 h-5 text-accent' />
                            Model Comparison (Accuracy %)
                        </h3>
                        <ResponsiveContainer
                            width='100%'
                            height='100%'
                        >
                            <BarChart data={accuracyData}>
                                <CartesianGrid
                                    strokeDasharray='3 3'
                                    stroke='#ffffff10'
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey='name'
                                    stroke='#94a3b8'
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke='#94a3b8'
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    domain={[0, 100]}
                                />
                                <Tooltip
                                    cursor={{ fill: '#ffffff05' }}
                                    contentStyle={{
                                        backgroundColor: '#1E2733',
                                        borderColor: '#2F3D4D',
                                        borderRadius: '12px',
                                        color: '#FAFAFA'
                                    }}
                                />
                                <Bar
                                    dataKey='accuracy'
                                    radius={[6, 6, 0, 0]}
                                >
                                    {accuracyData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.accuracy === 66.3 ? '#00F0FF' : '#1A2A3A'}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <div className='h-[350px] bg-white/5 rounded-3xl border border-white/10 p-8 backdrop-blur-sm'>
                        <h3 className='text-white font-bold mb-6'>Training Convergence</h3>
                        <ResponsiveContainer
                            width='100%'
                            height='100%'
                        >
                            <AreaChart data={convergenceData}>
                                <defs>
                                    <linearGradient
                                        id='colorAcc'
                                        x1='0'
                                        y1='0'
                                        x2='0'
                                        y2='1'
                                    >
                                        <stop
                                            offset='5%'
                                            stopColor='#3b82f6'
                                            stopOpacity={0.3}
                                        />
                                        <stop
                                            offset='95%'
                                            stopColor='#3b82f6'
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray='3 3'
                                    stroke='#ffffff10'
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey='epoch'
                                    stroke='#94a3b8'
                                    fontSize={10}
                                    label={{ value: 'Epochs', position: 'insideBottom', offset: -5 }}
                                />
                                <YAxis
                                    stroke='#94a3b8'
                                    fontSize={10}
                                />
                                <Tooltip />
                                <Area
                                    type='monotone'
                                    dataKey='accuracy'
                                    stroke='#3b82f6'
                                    fillOpacity={1}
                                    fill='url(#colorAcc)'
                                    strokeWidth={3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className='bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-3xl border border-blue-500/20 p-8 flex flex-col justify-center'>
                        <ShieldCheck className='w-16 h-16 text-blue-400 mb-6' />
                        <h3 className='text-2xl font-bold text-white mb-4'>Unmatched Reliability</h3>
                        <ul className='space-y-4'>
                            {[
                                'High convergence performance in early epochs',
                                'Better than lightweight baseline models',
                                'Robust against common compression artifacts',
                                'Stable performance across diverse demographics'
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    className='flex items-center gap-3 text-slate-300'
                                >
                                    <div className='w-1.5 h-1.5 rounded-full bg-blue-500' />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Results;
