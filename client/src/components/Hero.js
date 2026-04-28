import React from 'react';
import { Clock, Users, Cloud } from 'lucide-react';
import BannerSlideshow from './BannerSlideshow';

const Hero = ({ stationData, weatherData }) => {
  return (
    <section className="relative animated-gradient text-white py-20 px-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-police-accent rounded-full blur-3xl animate-float delay-500"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-police-light rounded-full blur-3xl animate-float delay-300"></div>
      </div>

      {/* Banner Slideshow */}
      <div className="relative z-10 max-w-6xl mx-auto mb-12 animate-fade-in-up">
        <BannerSlideshow />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Title with Animation */}
        <div className="text-center mb-12 animate-fade-in-up delay-200">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-full animate-float hover-glow">
              <img src="/images/pnp-logo-hero.png" alt="PNP Logo" className="w-32 h-32 hover-scale" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 shimmer-text">
            Anilao Municipal Police Station
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto animate-fade-in-up delay-300">
            Serving and Protecting Our Community with Integrity and Excellence
          </p>
        </div>

        {/* Stats Cards with Animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {stationData && (
            <>
              <div className="glass rounded-xl p-6 text-center card-hover animate-fade-in-up delay-100">
                <Clock className="w-12 h-12 text-police-accent mx-auto mb-3 animate-float" />
                <h3 className="font-semibold text-lg mb-2">24/7 Service</h3>
                <p className="text-gray-300 text-sm">Always ready to serve and protect our community</p>
              </div>

              <div className="glass rounded-xl p-6 text-center card-hover animate-fade-in-up delay-200">
                <Users className="w-12 h-12 text-police-accent mx-auto mb-3 animate-float delay-200" />
                <h3 className="font-semibold text-lg mb-2">{stationData.personnel} Personnel</h3>
                <p className="text-gray-300 text-sm">Dedicated officers serving the municipality</p>
              </div>

              {weatherData && (
                <div className="glass rounded-xl p-6 text-center card-hover animate-fade-in-up delay-300">
                  <Cloud className="w-12 h-12 text-police-accent mx-auto mb-3 animate-float delay-400" />
                  <h3 className="font-semibold text-lg mb-2">
                    {Math.round(weatherData.main?.temp || 30)}°C
                  </h3>
                  <p className="text-gray-300 text-sm capitalize">
                    {weatherData.weather?.[0]?.description || 'Clear Sky'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* CTA Buttons with Animations */}
        <div className="flex flex-wrap justify-center gap-4 mt-12 animate-fade-in-up delay-400">
          <a
            href="/report"
            className="bg-police-accent text-police-dark px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg btn-ripple animate-pulse-glow"
          >
            Report a Crime
          </a>
          <a
            href="/services"
            className="glass text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-all hover-lift"
          >
            Our Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
