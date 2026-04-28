import React, { useState, useEffect } from 'react';
import { Phone, Mail, Building, Search } from 'lucide-react';
import axios from 'axios';

const Directories = () => {
  const [directories, setDirectories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDirectories();
  }, []);

  const fetchDirectories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/directories');
      setDirectories(response.data);
    } catch (error) {
      console.error('Error fetching directories:', error);
    }
  };

  const filteredDirectories = directories.filter(dir =>
    dir.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dir.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-police-dark mb-4">
            Station Directories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Contact information for all departments and divisions
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search directories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-police-blue focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDirectories.map((dir) => (
            <div key={dir.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-police-blue/10 p-3 rounded-full">
                  <Building className="w-6 h-6 text-police-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-police-dark">{dir.name}</h3>
                  <p className="text-gray-600 text-sm">{dir.description}</p>
                </div>
              </div>
              <div className="space-y-2">
                <a
                  href={`tel:${dir.contact}`}
                  className="flex items-center gap-2 text-police-blue hover:text-police-dark transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{dir.contact}</span>
                </a>
                <a
                  href={`mailto:${dir.email}`}
                  className="flex items-center gap-2 text-police-blue hover:text-police-dark transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{dir.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Directories;
