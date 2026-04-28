import React from 'react';
import { Shield, Target, Users, Award } from 'lucide-react';

const About = ({ stationData }) => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-police-dark mb-4">
            About Our Station
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Committed to serving and protecting the Anilao community with integrity and excellence
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-police-dark mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              The Anilao Municipal Police Station is dedicated to maintaining peace and order, 
              preventing and controlling crimes, and ensuring the safety and security of the 
              Anilao community. We strive to provide excellent public service through professional 
              and ethical law enforcement.
            </p>
            
            <h3 className="text-2xl font-bold text-police-dark mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be a highly competent, credible, and effective police organization that works 
              in partnership with the community towards a safer and more progressive Anilao municipality.
            </p>
          </div>

          <div className="bg-police-dark rounded-2xl p-8 text-white">
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-12 h-12 text-police-accent" />
              <div>
                <h3 className="text-2xl font-bold">{stationData?.name || 'Anilao MPS'}</h3>
                <p className="text-gray-300">Municipal Police Station</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-police-accent" />
                <span>Station Chief: {stationData?.chief || 'PCOL. JUAN DELA CRUZ'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-police-accent" />
                <span>Total Personnel: {stationData?.personnel || 45}</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-police-accent" />
                <span>Operating 24/7 to serve the community</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="bg-police-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-police-blue" />
            </div>
            <h4 className="font-bold text-lg text-police-dark mb-2">Integrity</h4>
            <p className="text-gray-600 text-sm">Upholding the highest standards of honesty and ethical conduct</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="bg-police-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-police-blue" />
            </div>
            <h4 className="font-bold text-lg text-police-dark mb-2">Service</h4>
            <p className="text-gray-600 text-sm">Dedicated to serving the community with excellence</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="bg-police-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-police-blue" />
            </div>
            <h4 className="font-bold text-lg text-police-dark mb-2">Professionalism</h4>
            <p className="text-gray-600 text-sm">Maintaining professional standards in all operations</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="bg-police-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-police-blue" />
            </div>
            <h4 className="font-bold text-lg text-police-dark mb-2">Excellence</h4>
            <p className="text-gray-600 text-sm">Striving for excellence in law enforcement</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
