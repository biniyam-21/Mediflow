import React from 'react';
import Hero from "../components/Hero";
import Demo from "../components/Demo";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <main className="relative min-h-screen flex flex-col justify-between items-center w-full overflow-x-hidden">
      {/* Background Gradients & Grid Pattern */}
      <div className="main">
        <div className="gradient" />
      </div>

      {/* Main Content Layout Container */}
      <div className="app w-full min-h-screen flex flex-col justify-between items-center">
        <div className="w-full flex flex-col items-center flex-grow pt-0 pb-6">
          <Hero />
          <Demo />
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default Home;
