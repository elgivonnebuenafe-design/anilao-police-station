import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import EmergencyBanner from './components/EmergencyBanner';
import StationInfo from './components/StationInfo';
import MapSection from './components/MapSection';
import Directories from './components/Directories';
import Services from './components/Services';
import Policies from './components/Policies';
import ReportCrime from './components/ReportCrime';
import News from './components/News';
import About from './components/About';
import Media from './components/Media';
import Transparency from './components/Transparency';
import ActivitySlideshow from './components/ActivitySlideshow';

function App() {
  const [stationData, setStationData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    fetchStationData();
    fetchWeatherData();
  }, []);

  const fetchStationData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/station');
      setStationData(response.data);
    } catch (error) {
      console.error('Error fetching station data:', error);
    }
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/weather');
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <Router>
      <AppContent 
        stationData={stationData}
        weatherData={weatherData}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </Router>
  );
}

// Separate component to use useLocation inside Router
function AppContent({ stationData, weatherData, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <EmergencyBanner />
      <Header 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <main className="pt-20">
        <Routes>
          <Route path="/" element={
            <>
              <Hero stationData={stationData} weatherData={weatherData} />
              <ActivitySlideshow />
              <StationInfo stationData={stationData} />
              <MapSection stationData={stationData} />
              <Services />
              <News />
            </>
          } />
          <Route path="/directories" element={<Directories />} />
          <Route path="/services" element={<Services />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/report" element={<ReportCrime />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About stationData={stationData} />} />
          <Route path="/media" element={<Media />} />
          <Route path="/transparency" element={<Transparency />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
