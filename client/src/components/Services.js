import React, { useState, useEffect } from 'react';
import { FileText, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import axios from 'axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-police-dark mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive police services for the Anilao community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4 animate-slide-in-left">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`w-full text-left p-4 rounded-xl transition-all hover-lift ${
                  selectedService?.id === service.id
                    ? 'bg-police-blue text-white shadow-lg animate-pulse-glow'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className={`w-5 h-5 ${selectedService?.id === service.id ? 'text-white' : 'text-police-blue'}`} />
                    <span className="font-semibold">{service.name}</span>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${selectedService?.id === service.id ? 'text-white' : 'text-gray-400'}`} />
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2 animate-slide-in-right">
            {selectedService ? (
              <div className="bg-gray-50 rounded-2xl p-8 card-hover animate-fade-in-scale">
                <h3 className="text-2xl font-bold text-police-dark mb-4">
                  {selectedService.name}
                </h3>
                <p className="text-gray-600 mb-6">{selectedService.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="hover-lift p-2 rounded-lg transition-all">
                    <h4 className="font-semibold text-police-dark mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 animate-float" />
                      Requirements
                    </h4>
                    <ul className="space-y-2">
                      {selectedService.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600 hover-lift p-1 rounded transition-all">
                          <span className="text-police-blue mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="hover-lift p-2 rounded-lg transition-all">
                    <h4 className="font-semibold text-police-dark mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-police-accent animate-float delay-100" />
                      Processing Time
                    </h4>
                    <p className="text-gray-600 bg-white p-4 rounded-lg shadow-sm">
                      {selectedService.processingTime}
                    </p>
                  </div>
                </div>

                <div className="bg-police-blue/10 border border-police-blue/20 rounded-lg p-4 hover-glow transition-all">
                  <p className="text-sm text-police-dark">
                    <strong>Note:</strong> Please bring original and photocopies of all required documents. 
                    For inquiries, visit our station or call our hotline.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center h-full min-h-[400px] animate-fade-in-scale">
                <div className="text-center text-gray-400">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50 animate-float" />
                  <p>Select a service to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
