import React, { useState, useEffect } from 'react';
import { FileText, Download, Eye, Shield, Award, TrendingUp } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Transparency = () => {
  const [documents, setDocuments] = useState([]);
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    fetchTransparencyData();
  }, []);

  const fetchTransparencyData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/transparency`);
      setDocuments(response.data.documents);
      setStatistics(response.data.statistics);
    } catch (error) {
      console.error('Error fetching transparency data:', error);
    }
  };

  const documentCategories = ['All', 'Financial Reports', 'Performance Reports', 'Memorandums', 'Citizen Charter', 'Others'];
  const [filter, setFilter] = useState('All');

  const filteredDocs = filter === 'All' 
    ? documents 
    : documents.filter(d => d.category === filter);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-police-dark mb-4">
            Transparency & Accountability
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Committed to openness and accountability. Access public records, reports, and performance data.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="bg-police-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-police-blue" />
            </div>
            <h3 className="text-3xl font-bold text-police-dark mb-1">{statistics.crimeRate || '12%'}</h3>
            <p className="text-gray-600 text-sm">Crime Rate Reduction</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-police-dark mb-1">{statistics.caseSolved || '89%'}</h3>
            <p className="text-gray-600 text-sm">Cases Solved</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-3xl font-bold text-police-dark mb-1">{statistics.responseTime || '5min'}</h3>
            <p className="text-gray-600 text-sm">Avg Response Time</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-police-dark mb-1">{statistics.transparencyScore || '95%'}</h3>
            <p className="text-gray-600 text-sm">Transparency Score</p>
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-police-dark mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-police-blue" />
            Public Documents
          </h3>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {documentCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? 'bg-police-blue text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Documents List */}
          <div className="space-y-3">
            {filteredDocs.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-police-blue/10 p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-police-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-police-dark">{doc.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <span>{doc.category}</span>
                      <span>•</span>
                      <span>{doc.date}</span>
                      <span>•</span>
                      <span>{doc.fileSize}</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-police-blue text-white rounded-lg hover:bg-police-dark transition-colors">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Citizen's Charter */}
        <div className="mt-8 bg-police-dark rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Citizen's Charter</h3>
          <p className="text-gray-300 mb-6">
            Our commitment to provide efficient, transparent, and citizen-friendly services. 
            Learn about our service standards, processing times, and your rights as a citizen.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Service Pledge</h4>
              <p className="text-sm text-gray-300">We commit to serve with integrity, efficiency, and respect.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Processing Time</h4>
              <p className="text-sm text-gray-300">All services completed within stipulated timeframes.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Feedback System</h4>
              <p className="text-sm text-gray-300">Your feedback helps us improve our services.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transparency;
