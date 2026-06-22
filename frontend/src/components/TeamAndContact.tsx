import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Phone, Send, Shield } from 'lucide-react';
import { contactService } from '@/services/contactService';

const mentor = { 
    name: 'Dr. Saqib Ul Sabha', 
    role: 'Mentor', 
    initial: 'S',
    image: '/images/sakib.png' // Add your mentor image here
};
const teamMembers = [
    { name: 'Omakr', role: 'Project Team Member', initial: 'O', image: '/images/omakr.png' },
    { name: 'Saras', role: 'Project Team Member', initial: 'S', image: '/images/saras.png' },
    { name: 'Alok', role: 'Project Team Member', initial: 'A', image: '/images/alok.png' },
    { name: 'Ambashish', role: 'Project Team Member', initial: 'A', image: '/images/ambashish.jpeg' },
    { name: 'Shyam', role: 'Project Team Member', initial: 'S', image: '/images/shyam.png' }
];

const Team = () => {
    return (
        <section
            id='team'
            className='py-24 bg-background relative overflow-hidden'
        >
            <div className='container mx-auto px-6 text-center'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className='inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4'
                >
                    The Team
                </motion.div>
                <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-16'>
                    Meet Our <span className='text-primary'>Research Team</span>
                </h2>

                {/* Mentor Card - Centered at Top */}
                <div className='flex justify-center mb-12'>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className='group relative p-6 rounded-2xl bg-secondary/30 border border-border backdrop-blur-xl overflow-hidden hover:border-primary/50 transition-all w-full max-w-xs'
                    >
                        <div className='absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none' />

                        <div className='relative z-10'>
                            <div className='w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-primary to-accent p-0.5 mb-4 group-hover:scale-110 transition-transform overflow-hidden'>
                                <div className='w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden'>
                                    {mentor.image ? (
                                        <img 
                                            src={mentor.image} 
                                            alt={mentor.name}
                                            className='w-full h-full object-cover'
                                        />
                                    ) : (
                                        <span className='text-2xl font-bold text-foreground'>{mentor.initial}</span>
                                    )}
                                </div>
                            </div>
                            <h3 className='text-xl font-bold text-foreground mb-1'>{mentor.name}</h3>
                            <p className='text-primary text-xs font-medium mb-4 uppercase tracking-widest'>
                                {mentor.role}
                            </p>

                            <div className='flex items-center justify-center gap-3'>
                                {[Github, Linkedin, Mail].map((Icon, idx) => (
                                    <a
                                        key={idx}
                                        href='#'
                                        className='w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all'
                                    >
                                        <Icon className='w-4 h-4' />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Team Members Grid */}
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6'>
                    {teamMembers.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className='group relative p-6 rounded-2xl bg-secondary/30 border border-border backdrop-blur-xl overflow-hidden hover:border-primary/50 transition-all'
                        >
                            <div className='absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none' />

                            <div className='relative z-10'>
                                <div className='w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-primary to-accent p-0.5 mb-4 group-hover:scale-110 transition-transform overflow-hidden'>
                                    <div className='w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden'>
                                        {member.image ? (
                                            <img 
                                                src={member.image} 
                                                alt={member.name}
                                                className='w-full h-full object-cover'
                                            />
                                        ) : (
                                            <span className='text-2xl font-bold text-foreground'>{member.initial}</span>
                                        )}
                                    </div>
                                </div>
                                <h3 className='text-xl font-bold text-foreground mb-1'>{member.name}</h3>
                                <p className='text-primary text-xs font-medium mb-4 uppercase tracking-widest'>
                                    {member.role}
                                </p>

                                <div className='flex items-center justify-center gap-3'>
                                    {[Github, Linkedin, Mail].map((Icon, idx) => (
                                        <a
                                            key={idx}
                                            href='#'
                                            className='w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all'
                                        >
                                            <Icon className='w-4 h-4' />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [status, setStatus] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus(null);

        try {
            await contactService.submit(formData);
            setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
            setFormData({ name: '', email: '', message: '' });
        } catch (err: any) {
            console.error(err);
            setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <section
            id='contact'
            className='py-24 bg-background relative overflow-hidden border-t border-border'
        >
            <div className='container mx-auto px-6'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className='inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4'
                        >
                            Get In Touch
                        </motion.div>
                        <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
                            Contact <span className='text-primary'>Us</span>
                        </h2>
                        <p className='text-muted-foreground text-lg mb-12'>
                            Have questions about our deepfake detection research or need custom integration for your
                            organization? Reach out to our team.
                        </p>

                        <div className='space-y-6'>
{[
    { icon: Mail, label: 'Email', value: 'research@deepfakedetect.ai' },
    { icon: MapPin, label: 'Location', value: 'Lovely Professional University' },
    { icon: Phone, label: 'Phone', value: '+91 9876543210' }
].map((item, i) => (
                                <div
                                    key={i}
                                    className='flex items-center gap-4 group'
                                >
                                    <div className='w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all'>
                                        <item.icon className='w-5 h-5' />
                                    </div>
                                    <div>
                                        <p className='text-xs text-muted-foreground uppercase tracking-widest'>
                                            {item.label}
                                        </p>
                                        <p className='text-foreground font-medium'>{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className='p-8 md:p-10 rounded-3xl bg-secondary/30 border border-border backdrop-blur-xl'
                    >
                        <form
                            onSubmit={handleSubmit}
                            className='space-y-6'
                        >
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <label className='text-sm text-muted-foreground ml-1'>Name</label>
                                    <input
                                        type='text'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder='Your Name'
                                        className='w-full px-5 py-4 rounded-xl bg-input border border-border text-foreground placeholder:text-muted focus:border-primary focus:outline-none transition-colors'
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-sm text-muted-foreground ml-1'>Email</label>
                                    <input
                                        type='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder='your@email.com'
                                        className='w-full px-5 py-4 rounded-xl bg-input border border-border text-foreground placeholder:text-muted focus:border-primary focus:outline-none transition-colors'
                                    />
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <label className='text-sm text-muted-foreground ml-1'>Message</label>
                                <textarea
                                    rows={4}
                                    name='message'
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder='How can we help you?'
                                    className='w-full px-5 py-4 rounded-xl bg-input border border-border text-foreground placeholder:text-muted focus:border-primary focus:outline-none transition-colors resize-none'
                                />
                            </div>

                            {status && (
                                <div
                                    className={`p-4 rounded-xl text-sm ${
                                        status.type === 'success'
                                            ? 'bg-green-500/10 border border-green-500/20 text-green-500'
                                            : 'bg-destructive/10 border border-destructive/20 text-destructive'
                                    }`}
                                >
                                    {status.message}
                                </div>
                            )}

                            <button
                                type='submit'
                                disabled={isSubmitting}
                                className='w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                {!isSubmitting && (
                                    <Send className='w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className='py-12 bg-background border-t border-border text-center'>
            <div className='container mx-auto px-6'>
                <div className='flex flex-col md:flex-row items-center justify-between gap-8 mb-12'>
                    <div className='flex items-center gap-2'>
                        <Shield className='w-8 h-8 text-primary' />
                        <span className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent'>
                            DeepFake Detection
                        </span>
                    </div>
                    <div className='flex items-center gap-8'>
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, i) => (
                            <a
                                key={i}
                                href='#'
                                className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
                <div className='pt-8 border-t border-border'>
                    <p className='text-muted-foreground text-sm'>
                        © {new Date().getFullYear()} DeepFake Detection. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export { Team, Contact, Footer };
