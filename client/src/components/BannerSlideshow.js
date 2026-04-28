import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BannerSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Banner slides data - duplicate banners for slideshow effect
  const banners = [
    {
      id: 1,
      image: '/images/pnp-banner.png',
      title: 'Bagong PNP Para Sa Bagong Pilipinas',
      subtitle: 'Serbisyong Mabilis, Tapat at Nararamdaman'
    },
    {
      id: 2,
      image: '/images/pnp-banner.png',
      title: 'Serving and Protecting Anilao',
      subtitle: 'Your Safety is Our Priority'
    },
    {
      id: 3,
      image: '/images/pnp-banner.png',
      title: 'Community Partnership',
      subtitle: 'Working Together for a Safer Municipality'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // 5 seconds interval

    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % banners.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto mb-8">
      {/* Main Slideshow Container */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[21/9]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-800 ease-in-out transform ${
              index === currentIndex
                ? 'translate-x-0 opacity-100 scale-100'
                : index < currentIndex
                ? '-translate-x-full opacity-0 scale-95'
                : 'translate-x-full opacity-0 scale-95'
            }`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all duration-300 group"
          aria-label="Previous banner"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all duration-300 group"
          aria-label="Next banner"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-police-accent transition-all duration-500 ease-linear"
            style={{
              width: `${((currentIndex + 1) / banners.length) * 100}%`,
              animation: 'progress 5s linear infinite'
            }}
          />
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-3 mt-6">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`group relative p-2 transition-all duration-300 ${
              index === currentIndex ? 'scale-110' : 'hover:scale-105'
            }`}
            aria-label={`Go to banner ${index + 1}`}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-police-accent w-8'
                  : 'bg-gray-300 group-hover:bg-police-blue'
              }`}
            />
            {/* Active indicator glow */}
            {index === currentIndex && (
              <div className="absolute inset-0 bg-police-accent/30 rounded-full animate-ping" />
            )}
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
        {currentIndex + 1} / {banners.length}
      </div>
    </div>
  );
};

export default BannerSlideshow;
