import React, { useState, useEffect } from 'react';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';

const Policies = () => {
  const [policies, setPolicies] = useState([]);
  const [filter, setFilter] = useState('All');
  const [expandedPolicy, setExpandedPolicy] = useState(null);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/policies');
      setPolicies(response.data);
    } catch (error) {
      console.error('Error fetching policies:', error);
    }
  };

  const categories = ['All', ...new Set(policies.map(p => p.category))];

  const filteredPolicies = filter === 'All' 
    ? policies 
    : policies.filter(p => p.category === filter);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-police-dark mb-4">
            Policies & Guidelines
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our policies and guidelines for transparent and accountable service
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === category
                  ? 'bg-police-blue text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredPolicies.map((policy) => (
            <div key={policy.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => setExpandedPolicy(expandedPolicy === policy.id ? null : policy.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-4 text-left">
                  <div className="bg-police-blue/10 p-3 rounded-full flex-shrink-0">
                    <FileText className="w-6 h-6 text-police-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-police-dark">{policy.title}</h3>
                    <span className="inline-block mt-1 px-3 py-1 bg-police-accent/20 text-police-dark text-xs rounded-full">
                      {policy.category}
                    </span>
                  </div>
                </div>
                {expandedPolicy === policy.id ? (
                  <ChevronUp className="w-6 h-6 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                )}
              </button>

              {expandedPolicy === policy.id && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <p className="text-gray-600 mb-3">{policy.description}</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 text-sm leading-relaxed">{policy.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Policies;
