import React from 'react';
import Footer from './Components/Footer';
import Header from './Components/Header';
import HeroPage from './Components/HeroPage';
import Home from './Components/Home';
import GWFoundation from './Components/GWFoundation';
import TestimonialComp from './Components/TestimonialComp';

function App() {
  return (
    <div className="bg-white min-h-screen flex flex-col font-montserrat">
      <Header />
      <main className="flex-grow">
        <HeroPage />
        <Home />
        <TestimonialComp />
        <GWFoundation />
      </main>
      <Footer />
    </div>
  );
}

export default App;
