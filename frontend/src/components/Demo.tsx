import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload,
    Search,
    FileVideo,
    FileImage,
    X,
    AlertTriangle,
    ShieldCheck,
    Loader2,
    ChevronDown
} from 'lucide-react';
import { predictionService, PredictionResponse } from '@/services/predictionService';

const MODELS = [
    { id: 'xceptionnet', name: 'XceptionNet', description: 'Best overall accuracy' },
    { id: 'mesonet', name: 'MesoNet', description: 'Optimized for facial compression' },
    { id: 'mobilenetv2', name: 'MobileNetV2', description: 'Fast processing for mobile' },
    { id: 'efficientnetb4', name: 'EfficientNetB4', description: 'High precision analysis' },
    { id: 'frequencynet', name: 'FrequencyNet', description: 'Spectral artifact detection' }
];

const Demo = () => {
    const [file, setFile] = useState<File | null>(null);
    const [selectedModel, setSelectedModel] = useState(MODELS[0].id);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<PredictionResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setResult(null);
            setError(null);
        }
    };

    const handleAnalyze = async () => {
        if (!file) return;
        setIsAnalyzing(true);
        setError(null);

        try {
            const data = await predictionService.predict(file, selectedModel);
            setResult(data);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to analyze media. Please try again.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const reset = () => {
        setFile(null);
        setResult(null);
        setError(null);
    };

    return (
        <section
            id='demo'
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
                        Interactive Demo
                    </motion.div>
                    <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
                        Test Your <span className='text-primary'>Media</span>
                    </h2>
                    <p className='text-muted-foreground text-lg'>
                        Upload an image or video to see our AI models in action. We analyze pixels and frequencies to
                        detect deepfake manipulation.
                    </p>
                </div>

                <div className='max-w-4xl mx-auto'>
                    <div className='p-8 md:p-12 rounded-3xl bg-secondary/30 border border-border backdrop-blur-xl relative'>
                        <div className='absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5 pointer-events-none rounded-3xl' />

                        {!file ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className='flex flex-col items-center justify-center border-2 border-dashed border-border rounded-2xl p-12 hover:border-primary/50 transition-colors cursor-pointer group'
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className='w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                                    <Upload className='w-10 h-10 text-primary' />
                                </div>
                                <h3 className='text-xl font-bold text-foreground mb-2'>
                                    Drag & drop or click to upload
                                </h3>
                                <p className='text-muted-foreground mb-8'>Supports JPG, PNG up to 10MB</p>
                                <button className='px-6 py-3 bg-secondary/50 border border-border rounded-xl text-foreground font-semibold hover:bg-secondary transition-colors'>
                                    Select Files
                                </button>
                                <input
                                    type='file'
                                    className='hidden'
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept='image/*,video/*'
                                />
                            </motion.div>
                        ) : (
                            <div className='space-y-8'>
                                <div className='flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border'>
                                    <div className='flex items-center gap-4'>
                                        <div className='p-3 rounded-lg bg-primary/10'>
                                            {file.type.startsWith('image') ? (
                                                <FileImage className='w-6 h-6 text-primary' />
                                            ) : (
                                                <FileVideo className='w-6 h-6 text-primary' />
                                            )}
                                        </div>
                                        <div>
                                            <p className='text-foreground font-medium truncate max-w-[200px] md:max-w-md'>
                                                {file.name}
                                            </p>
                                            <p className='text-xs text-muted-foreground'>
                                                {(file.size / (1024 * 1024)).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={reset}
                                        className='p-2 hover:bg-secondary rounded-full text-muted-foreground hover:text-foreground transition-colors'
                                        disabled={isAnalyzing}
                                    >
                                        <X className='w-5 h-5' />
                                    </button>
                                </div>

                                {!result && !isAnalyzing && (
                                    <div className='space-y-6'>
                                        <div className='relative'>
                                            <label className='block text-sm font-medium text-muted-foreground mb-2 px-1'>
                                                Select Analysis Model
                                            </label>
                                            <div className='relative'>
                                                <select
                                                    value={selectedModel}
                                                    onChange={e => setSelectedModel(e.target.value)}
                                                    className='w-full appearance-none bg-secondary/50 border border-border rounded-xl px-4 py-3.5 pr-10 text-foreground font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none'
                                                >
                                                    {MODELS.map(m => (
                                                        <option
                                                            key={m.id}
                                                            value={m.id}
                                                        >
                                                            {m.name} - {m.description}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className='absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none' />
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleAnalyze}
                                            className='w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/25 flex items-center justify-center gap-3'
                                        >
                                            <Search className='w-5 h-5' />
                                            Analyze Deepfake
                                        </button>
                                    </div>
                                )}

                                {error && (
                                    <div className='p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-3'>
                                        <AlertTriangle className='w-5 h-5 shrink-0' />
                                        {error}
                                    </div>
                                )}

                                {isAnalyzing && (
                                    <div className='text-center space-y-6 py-8'>
                                        <div className='flex justify-center'>
                                            <Loader2 className='w-16 h-16 text-primary animate-spin' />
                                        </div>
                                        <div>
                                            <h4 className='text-xl font-bold text-foreground mb-2 tracking-wide'>
                                                Analyzing Media...
                                            </h4>
                                            <p className='text-muted-foreground animate-pulse'>
                                                Running {MODELS.find(m => m.id === selectedModel)?.name} & frequency
                                                analysis
                                            </p>
                                        </div>
                                        <div className='max-w-xs mx-auto h-2 bg-secondary rounded-full overflow-hidden'>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '100%' }}
                                                transition={{ duration: 5 }}
                                                className='h-full bg-primary'
                                            />
                                        </div>
                                    </div>
                                )}

                                <AnimatePresence>
                                    {result && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className='space-y-8'
                                        >
                                            {/* Main Result Card */}
                                            <motion.div
                                                className={`p-8 md:p-12 rounded-3xl border-2 relative overflow-hidden ${
                                                    result.prediction === 'Fake'
                                                        ? 'bg-gradient-to-br from-red-500/10 to-orange-500/5 border-red-500/30'
                                                        : 'bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/30'
                                                }`}
                                            >
                                                {/* Background animation */}
                                                <div className='absolute inset-0 opacity-20 pointer-events-none'>
                                                    <motion.div
                                                        animate={{ scale: [1, 1.2, 1] }}
                                                        transition={{ duration: 3, repeat: Infinity }}
                                                        className={`absolute inset-0 rounded-3xl ${
                                                            result.prediction === 'Fake'
                                                                ? 'bg-red-500/5'
                                                                : 'bg-green-500/5'
                                                        }`}
                                                    />
                                                </div>

                                                <div className='relative z-10'>
                                                    {/* Header */}
                                                    <div className='flex flex-col lg:flex-row items-center gap-8 mb-12'>
                                                        {/* Icon Circle */}
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                                            className={`w-32 h-32 rounded-full flex items-center justify-center shrink-0 relative ${
                                                                result.prediction === 'Fake'
                                                                    ? 'bg-red-500/20 border-2 border-red-500/30'
                                                                    : 'bg-green-500/20 border-2 border-green-500/30'
                                                            }`}
                                                        >
                                                            <motion.div
                                                                animate={{ scale: [1, 1.1, 1] }}
                                                                transition={{ duration: 2, repeat: Infinity }}
                                                                className='absolute inset-4 rounded-full border-2 border-dashed opacity-50'
                                                                style={{
                                                                    borderColor: result.prediction === 'Fake' ? '#ef4444' : '#10b981'
                                                                }}
                                                            />
                                                            {result.prediction === 'Fake' ? (
                                                                <AlertTriangle className='w-16 h-16 text-red-500 relative z-10' />
                                                            ) : (
                                                                <ShieldCheck className='w-16 h-16 text-green-500 relative z-10' />
                                                            )}
                                                        </motion.div>

                                                        {/* Title and Description */}
                                                        <div className='flex-1 text-center lg:text-left'>
                                                            <motion.h3
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                transition={{ delay: 0.2 }}
                                                                className={`text-4xl md:text-5xl font-bold mb-3 ${
                                                                    result.prediction === 'Fake'
                                                                        ? 'text-red-500'
                                                                        : 'text-green-500'
                                                                }`}
                                                            >
                                                                {result.prediction === 'Fake'
                                                                    ? 'Deepfake Detected'
                                                                    : 'Authentic Media'}
                                                            </motion.h3>
                                                            <p className='text-muted-foreground text-lg'>
                                                                {result.prediction === 'Fake'
                                                                    ? 'This media shows strong indicators of AI manipulation or synthetic generation.'
                                                                    : 'This media appears to be authentic with no signs of AI-based manipulation.'}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Confidence Gauge */}
                                                    <div className='mb-10 p-8 rounded-2xl bg-secondary/30 border border-border/50'>
                                                        <div className='flex items-center justify-between mb-6'>
                                                            <h4 className='text-lg font-bold text-foreground'>Confidence Score</h4>
                                                            <span className='text-3xl font-bold text-primary'>
                                                                {(result.confidence * 100).toFixed(1)}%
                                                            </span>
                                                        </div>
                                                        {/* Animated Progress Bar */}
                                                        <div className='w-full h-4 bg-secondary rounded-full overflow-hidden'>
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${result.confidence * 100}%` }}
                                                                transition={{ duration: 1.5, ease: 'easeOut' }}
                                                                className={`h-full rounded-full ${
                                                                    result.prediction === 'Fake'
                                                                        ? 'bg-gradient-to-r from-red-500 to-orange-500'
                                                                        : 'bg-gradient-to-r from-green-500 to-emerald-500'
                                                                }`}
                                                            />
                                                        </div>
                                                        <div className='flex justify-between text-xs text-muted-foreground mt-3'>
                                                            <span>Low</span>
                                                            <span>Medium</span>
                                                            <span>High</span>
                                                        </div>
                                                    </div>

                                                    {/* Risk Level Indicator */}
                                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.3 }}
                                                            className={`p-6 rounded-2xl border ${
                                                                result.confidence > 0.8
                                                                    ? result.prediction === 'Fake'
                                                                        ? 'bg-red-500/10 border-red-500/20'
                                                                        : 'bg-green-500/10 border-green-500/20'
                                                                    : 'bg-yellow-500/10 border-yellow-500/20'
                                                            }`}
                                                        >
                                                            <div className='text-sm font-semibold text-muted-foreground mb-2'>Risk Level</div>
                                                            <div className={`text-2xl font-bold ${
                                                                result.confidence > 0.8
                                                                    ? result.prediction === 'Fake'
                                                                        ? 'text-red-500'
                                                                        : 'text-green-500'
                                                                    : 'text-yellow-500'
                                                            }`}>
                                                                {result.confidence > 0.8 ? 'HIGH' : result.confidence > 0.6 ? 'MEDIUM' : 'LOW'}
                                                            </div>
                                                        </motion.div>

                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.4 }}
                                                            className='p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20'
                                                        >
                                                            <div className='text-sm font-semibold text-muted-foreground mb-2'>Model Used</div>
                                                            <div className='text-2xl font-bold text-blue-400'>
                                                                {MODELS.find(m => m.id === result.model)?.name || 'Ensemble'}
                                                            </div>
                                                        </motion.div>

                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.5 }}
                                                            className='p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20'
                                                        >
                                                            <div className='text-sm font-semibold text-muted-foreground mb-2'>Probability</div>
                                                            <div className='text-2xl font-bold text-purple-400'>
                                                                {(result.score * 100).toFixed(2)}%
                                                            </div>
                                                        </motion.div>
                                                    </div>

                                                    {/* Detailed Analysis */}
                                                    <div className='p-6 rounded-2xl bg-secondary/50 border border-border/30'>
                                                        <h5 className='font-bold text-foreground mb-4 flex items-center gap-2'>
                                                            <Search className='w-4 h-4 text-primary' />
                                                            Analysis Details
                                                        </h5>
                                                        <div className='space-y-3 text-sm'>
                                                            <div className='flex justify-between'>
                                                                <span className='text-muted-foreground'>Confidence Score:</span>
                                                                <span className='font-semibold text-foreground'>{(result.confidence * 100).toFixed(1)}%</span>
                                                            </div>
                                                            <div className='flex justify-between'>
                                                                <span className='text-muted-foreground'>Prediction:</span>
                                                                <span className={`font-semibold ${result.prediction === 'Fake' ? 'text-red-500' : 'text-green-500'}`}>
                                                                    {result.prediction}
                                                                </span>
                                                            </div>
                                                            <div className='flex justify-between'>
                                                                <span className='text-muted-foreground'>Overall Score:</span>
                                                                <span className='font-semibold text-foreground'>{(result.score * 100).toFixed(2)}%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Action Button */}
                                            <motion.button
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.6 }}
                                                onClick={reset}
                                                className='w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-lg hover:shadow-lg hover:shadow-primary/25 transition-all'
                                            >
                                                🔄 Analyze Another Image
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    <div className='mt-8 flex items-center justify-center gap-8 opacity-50'>
                        <div className='flex items-center gap-2 grayscale brightness-200'>
                            <div className='w-4 h-4 bg-white rounded-full' />
                            <span className='text-xs font-bold text-white tracking-widest'>NVIDIA GPU READY</span>
                        </div>
                        <div className='flex items-center gap-2 grayscale brightness-200'>
                            <div className='w-4 h-4 bg-white rounded-full' />
                            <span className='text-xs font-bold text-white tracking-widest'>PYTORCH NATIVE</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Demo;
