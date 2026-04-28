import React, { useState } from 'react';
import { AlertTriangle, Send, CheckCircle } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ReportCrime = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    incident: '',
    date: '',
    location: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/report`, formData);
      setReferenceNumber(response.data.reference);
      setSubmitted(true);
      setFormData({
        name: '',
        contact: '',
        incident: '',
        date: '',
        location: '',
        description: ''
      });
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Error submitting report. Please try again.');
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-police-dark mb-4">
            Report a Crime
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Submit an incident report online. For emergencies, call 911 immediately.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-police-dark mb-4">Report Submitted Successfully</h3>
            <p className="text-gray-600 mb-2">Your report has been received and is being processed.</p>
            <p className="text-gray-800 font-semibold mb-6">
              Reference Number: <span className="text-police-blue">{referenceNumber}</span>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Please save this reference number for follow-up inquiries.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-police-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-police-dark transition-colors"
            >
              Submit Another Report
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-police-blue focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-police-blue focus:border-transparent"
                    placeholder="Enter your contact number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Type of Incident *
                  </label>
                  <select
                    name="incident"
                    value={formData.incident}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-police-blue focus:border-transparent"
                  >
                    <option value="">Select incident type</option>
                    <option value="theft">Theft / Robbery</option>
                    <option value="assault">Assault</option>
                    <option value="vandalism">Vandalism</option>
                    <option value="fraud">Fraud / Scam</option>
                    <option value="missing">Missing Person</option>
                    <option value="traffic">Traffic Incident</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Incident *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-police-blue focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location of Incident *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-police-blue focus:border-transparent"
                  placeholder="Enter the location where the incident occurred"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-police-blue focus:border-transparent resize-none"
                  placeholder="Provide a detailed description of the incident"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Disclaimer:</strong> False reporting is a criminal offense. 
                  Please ensure all information provided is accurate and truthful.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-police-blue text-white py-4 rounded-lg font-bold text-lg hover:bg-police-dark transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Submit Report
              </button>
            </form>
          </div>
        )}

        <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
          <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Emergency?
          </h4>
          <p className="text-red-700 mb-3">
            If this is an emergency or the crime is in progress, call 911 immediately.
          </p>
          <a href="tel:911" className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            Call 911 Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReportCrime;
