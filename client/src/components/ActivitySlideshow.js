import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ActivitySlideshow = () => {
  const [activities, setActivities] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    // Auto-advance slideshow
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activities.length]);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/activities`);
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % activities.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + activities.length) % activities.length);
  };

  if (activities.length === 0) return null;

  const currentActivity = activities[currentIndex];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-police-dark mb-2">Latest Activities</h2>
          <p className="text-gray-600">Recent operations, events, and community engagements</p>
        </div>

        <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-video md:aspect-auto md:h-96">
              <img 
                src={currentActivity.image} 
                alt={currentActivity.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-police-accent text-police-dark px-4 py-1 rounded-full text-sm font-semibold">
                  {currentActivity.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-police-dark mb-4">{currentActivity.title}</h3>
              <p className="text-gray-600 mb-6">{currentActivity.description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-500">
                  <Calendar className="w-5 h-5" />
                  <span>{currentActivity.date}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <MapPin className="w-5 h-5" />
                  <span>{currentActivity.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {activities.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === currentIndex ? 'bg-police-blue w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-police-dark" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
          >
            <ChevronRight className="w-6 h-6 text-police-dark" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ActivitySlideshow;
