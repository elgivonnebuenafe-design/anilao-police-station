import React from 'react';
import { MapPin, Phone, Mail, Clock, User, Building } from 'lucide-react';

const StationInfo = ({ stationData }) => {
  if (!stationData) return null;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-police-dark mb-4">
            Station Information
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn more about our police station and how we serve the Anilao community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-2xl p-8 card-hover animate-slide-in-left">
            <h3 className="text-2xl font-bold text-police-dark mb-6 flex items-center gap-3">
              <Building className="w-6 h-6 text-police-blue" />
              About the Station
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 hover-lift p-2 rounded-lg transition-all">
                <MapPin className="w-5 h-5 text-police-blue flex-shrink-0 mt-1 animate-float" />
                <div>
                  <h4 className="font-semibold text-gray-800">Address</h4>
                  <p className="text-gray-600">{stationData.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 hover-lift p-2 rounded-lg transition-all">
                <User className="w-5 h-5 text-police-blue flex-shrink-0 mt-1 animate-float delay-100" />
                <div>
                  <h4 className="font-semibold text-gray-800">Station Chief</h4>
                  <p className="text-gray-600">{stationData.chief}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 hover-lift p-2 rounded-lg transition-all">
                <Building className="w-5 h-5 text-police-blue flex-shrink-0 mt-1 animate-float delay-200" />
                <div>
                  <h4 className="font-semibold text-gray-800">Total Personnel</h4>
                  <p className="text-gray-600">{stationData.personnel} officers and staff</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 card-hover animate-slide-in-right">
            <h3 className="text-2xl font-bold text-police-dark mb-6 flex items-center gap-3">
              <Phone className="w-6 h-6 text-police-blue" />
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 hover-lift p-2 rounded-lg transition-all">
                <Phone className="w-5 h-5 text-police-blue flex-shrink-0 mt-1 animate-pulse" />
                <div>
                  <h4 className="font-semibold text-gray-800">Emergency Hotline</h4>
                  <a href="tel:911" className="text-police-blue font-bold text-lg hover:underline hover-glow">911</a>
                </div>
              </div>
              <div className="flex items-start gap-4 hover-lift p-2 rounded-lg transition-all">
                <Phone className="w-5 h-5 text-police-blue flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Mobile Hotline</h4>
                  <a href={`tel:${stationData.contact.hotline}`} className="text-police-blue font-bold hover:underline hover-glow">
                    {stationData.contact.hotline}
                  </a>
                </div>
              </div>
              {stationData.contact.landline && (
                <div className="flex items-start gap-4 hover-lift p-2 rounded-lg transition-all">
                  <Phone className="w-5 h-5 text-police-blue flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Landline</h4>
                    <a href={`tel:${stationData.contact.landline}`} className="text-police-blue font-bold hover:underline hover-glow">
                      {stationData.contact.landline}
                    </a>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-4 hover-lift p-2 rounded-lg transition-all">
                <Mail className="w-5 h-5 text-police-blue flex-shrink-0 mt-1 animate-float" />
                <div>
                  <h4 className="font-semibold text-gray-800">Email</h4>
                  <a href={`mailto:${stationData.contact.email}`} className="text-police-blue hover:underline hover-glow">
                    {stationData.contact.email}
                  </a>
                </div>
              </div>
              {stationData.contact.facebook && (
                <div className="flex items-start gap-4 hover-lift p-2 rounded-lg transition-all">
                  <div className="w-5 h-5 text-police-blue flex-shrink-0 mt-1 flex items-center justify-center">
                    <span className="font-bold text-sm">f</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Facebook</h4>
                    <a href={`https://facebook.com/${stationData.contact.facebook.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-police-blue font-bold hover:underline hover-glow">
                      {stationData.contact.facebook}
                    </a>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-4 hover-lift p-2 rounded-lg transition-all">
                <Clock className="w-5 h-5 text-police-blue flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Operating Hours</h4>
                  <p className="text-gray-600">24/7 - Always Open</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StationInfo;
