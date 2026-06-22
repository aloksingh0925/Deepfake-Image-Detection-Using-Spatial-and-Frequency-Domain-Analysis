import React, { useState, useEffect } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Features', href: '#features' },
        { name: 'Models', href: '#models' },
        { name: 'Research', href: '#research' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Results', href: '#results' },
        { name: 'Demo', href: '#demo' }
    ];

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
                isScrolled
                    ? 'bg-background/80 backdrop-blur-lg border-border py-4'
                    : 'bg-transparent border-transparent py-6'
            )}
        >
            <div className='container mx-auto px-6 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Shield className='w-8 h-8 text-primary' />
                    <span className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent'>
                        DeepFake Detection
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className='hidden md:flex items-center gap-8'>
                    {navLinks.map(link => (
                        <a
                            key={link.name}
                            href={link.href}
                            className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors'
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href='#contact'
                        className='px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20'
                    >
                        Contact Us
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className='md:hidden text-foreground'
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className='md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300'>
                    {navLinks.map(link => (
                        <a
                            key={link.name}
                            href={link.href}
                            className='text-lg font-medium text-foreground'
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href='#contact'
                        className='w-full py-3 text-center rounded-xl bg-primary text-primary-foreground font-semibold'
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Contact Us
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
