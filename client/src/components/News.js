import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/news`);
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Community': 'bg-blue-100 text-blue-800',
      'Traffic': 'bg-yellow-100 text-yellow-800',
      'Announcement': 'bg-green-100 text-green-800',
      'Crime': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-police-dark mb-4">
            Local News & Announcements
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest local news, community updates, and official announcements from Anilao MPS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item) => (
            <article key={item.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>
                
                <h3 className="font-bold text-lg text-police-dark mb-3 line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {item.content}
                </p>
                
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(item.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/news"
            className="inline-block bg-police-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-police-dark transition-colors"
          >
            View All News
          </a>
        </div>
      </div>
    </section>
  );
};

export default News;
