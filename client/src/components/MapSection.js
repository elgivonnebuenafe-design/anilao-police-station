import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapSection = ({ stationData }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!stationData || !isClient) {
    return (
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-police-dark mb-8 text-center">
            Our Location
          </h2>
          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
            <p className="text-gray-500">Loading map...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-police-dark mb-4">
            Find Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visit our station or use the map below for directions
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-96 md:h-[500px]">
            <MapContainer
              center={[stationData.coordinates.lat, stationData.coordinates.lng]}
              zoom={15}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[stationData.coordinates.lat, stationData.coordinates.lng]}>
                <Popup>
                  <div className="text-center">
                    <h3 className="font-bold text-lg">{stationData.name}</h3>
                    <p className="text-sm text-gray-600">{stationData.address}</p>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${stationData.coordinates.lat},${stationData.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-police-blue text-sm hover:underline"
                    >
                      Get Directions
                    </a>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          
          <div className="p-6 bg-gray-50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg text-police-dark">{stationData.name}</h3>
                <p className="text-gray-600">{stationData.address}</p>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${stationData.coordinates.lat},${stationData.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-police-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-police-dark transition-colors flex items-center gap-2"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
