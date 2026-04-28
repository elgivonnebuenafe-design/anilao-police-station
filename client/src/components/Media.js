import React, { useState, useEffect } from 'react';
import { Camera, Video, FileText, Download, Play, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';

const Media = () => {
  const [activeTab, setActiveTab] = useState('photos');
  const [mediaData, setMediaData] = useState({ photos: [], videos: [], pressReleases: [] });

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/media');
      setMediaData(response.data);
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  const tabs = [
    { id: 'photos', label: 'Photo Gallery', icon: ImageIcon },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'press', label: 'Press Releases', icon: FileText },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-police-dark mb-4">
            Media Center
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Official photos, videos, and press releases from Anilao Municipal Police Station
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-police-blue text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {activeTab === 'photos' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaData.photos.map((photo, index) => (
                <div key={index} className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer">
                  <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm font-medium">{photo.caption}</p>
                      <p className="text-gray-300 text-xs">{photo.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mediaData.videos.map((video, index) => (
                <div key={index} className="bg-gray-50 rounded-xl overflow-hidden">
                  <div className="relative aspect-video bg-gray-200 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white opacity-80" />
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-police-dark mb-2">{video.title}</h3>
                    <p className="text-gray-600 text-sm">{video.description}</p>
                    <p className="text-gray-400 text-xs mt-2">{video.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'press' && (
            <div className="space-y-4">
              {mediaData.pressReleases.map((release, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-police-blue/10 text-police-blue text-xs rounded-full mb-2">
                        {release.category}
                      </span>
                      <h3 className="font-bold text-lg text-police-dark mb-2">{release.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{release.summary}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{release.date}</span>
                        <span>•</span>
                        <span>{release.author}</span>
                      </div>
                    </div>
                    <button className="ml-4 p-2 text-police-blue hover:bg-police-blue/10 rounded-lg transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Media;
