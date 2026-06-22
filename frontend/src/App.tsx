import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Models from './components/Models';
import Research from './components/Research';
import HowItWorks from './components/HowItWorks';
import Results from './components/Results';
import Demo from './components/Demo';
import FutureScope from './components/FutureScope';
import { Team, Contact, Footer } from './components/TeamAndContact';

function App() {
    return (
        <div className='dark bg-background min-h-screen text-foreground selection:bg-primary/30 selection:text-primary'>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Features />
                <Models />
                <Research />
                <HowItWorks />
                <Results />
                <Demo />
                <FutureScope />
                <Team />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
