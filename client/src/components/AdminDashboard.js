import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Image, 
  FileText, 
  Newspaper, 
  Settings, 
  LogOut, 
  Upload, 
  Plus,
  Trash2,
  Edit3,
  Eye,
  CheckCircle,
  AlertTriangle,
  Menu,
  X
} from 'lucide-react';
import axios from 'axios';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [news, setNews] = useState([]);
  const [activities, setActivities] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [newsRes, activitiesRes] = await Promise.all([
        axios.get('http://localhost:5000/api/news'),
        axios.get('http://localhost:5000/api/activities')
      ]);
      setNews(newsRes.data);
      setActivities(activitiesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminUser');
    onLogout();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadStatus('uploading');
    
    // Simulate upload (replace with actual Cloudinary/Firebase upload later)
    setTimeout(() => {
      setUploadStatus('success');
      setTimeout(() => setUploadStatus(''), 2000);
    }, 1500);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'media', label: 'Media Gallery', icon: Image },
    { id: 'news', label: 'News & Updates', icon: Newspaper },
    { id: 'activities', label: 'Activities', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent news={news} activities={activities} />;
      case 'media':
        return <MediaContent uploadStatus={uploadStatus} onUpload={handleImageUpload} />;
      case 'news':
        return <NewsContent news={news} />;
      case 'activities':
        return <ActivitiesContent activities={activities} />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <DashboardContent news={news} activities={activities} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside 
        className={`bg-police-dark text-white transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-police-blue/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-police-accent rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-police-dark font-bold text-lg">A</span>
            </div>
            {isSidebarOpen && (
              <div>
                <h2 className="font-bold text-sm">Admin Panel</h2>
                <p className="text-xs text-gray-400">Anilao MPS</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? 'bg-police-blue text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-police-blue/30">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-sm">Administrator</p>
              <p className="text-xs text-gray-500">{sessionStorage.getItem('adminUser')}</p>
            </div>
            <div className="w-10 h-10 bg-police-blue rounded-full flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

// Dashboard Content Component
const DashboardContent = ({ news, activities }) => {
  const stats = [
    { label: 'Total News', value: news.length, icon: Newspaper, color: 'bg-blue-500' },
    { label: 'Activities', value: activities.length, icon: FileText, color: 'bg-green-500' },
    { label: 'Media Files', value: '12', icon: Image, color: 'bg-purple-500' },
    { label: 'Reports', value: '0', icon: AlertTriangle, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} text-white p-3 rounded-xl`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 bg-police-blue/10 text-police-blue rounded-xl hover:bg-police-blue/20 transition-all hover-lift">
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add News Article</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-green-500/10 text-green-600 rounded-xl hover:bg-green-500/20 transition-all hover-lift">
            <Upload className="w-5 h-5" />
            <span className="font-medium">Upload Images</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-purple-500/10 text-purple-600 rounded-xl hover:bg-purple-500/20 transition-all hover-lift">
            <FileText className="w-5 h-5" />
            <span className="font-medium">Add Activity</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Updates</h2>
        <div className="space-y-3">
          {news.slice(0, 3).map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover-lift">
              <div className="w-10 h-10 bg-police-blue/10 rounded-full flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-police-blue" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">Published</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Media Content Component
const MediaContent = ({ uploadStatus, onUpload }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Media Gallery</h1>
        <label className="flex items-center gap-2 px-4 py-2 bg-police-blue text-white rounded-xl cursor-pointer hover:bg-police-dark transition-all hover-lift">
          <Upload className="w-5 h-5" />
          <span>Upload Image</span>
          <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
        </label>
      </div>

      {uploadStatus === 'uploading' && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Uploading image...
        </div>
      )}

      {uploadStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Image uploaded successfully!
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6">
        <p className="text-gray-500 text-center py-12">
          Image gallery will appear here. Upload functionality ready for Cloudinary/Firebase integration.
        </p>
      </div>
    </div>
  );
};

// News Content Component
const NewsContent = ({ news }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">News & Updates</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-police-blue text-white rounded-xl hover:bg-police-dark transition-all hover-lift">
          <Plus className="w-5 h-5" />
          <span>Add News</span>
        </button>
      </div>

      <div className="grid gap-4">
        {news.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm p-6 card-hover">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{item.category}</span>
                  <span className="text-gray-400 text-sm">{item.date}</span>
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-police-blue transition-colors hover-lift">
                  <Edit3 className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors hover-lift">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Activities Content Component
const ActivitiesContent = ({ activities }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Activities</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-police-blue text-white rounded-xl hover:bg-police-dark transition-all hover-lift">
          <Plus className="w-5 h-5" />
          <span>Add Activity</span>
        </button>
      </div>

      <div className="grid gap-4">
        {activities.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm p-6 card-hover">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <Image className="w-8 h-8 text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-police-accent/20 text-police-dark text-xs rounded-full">{item.category}</span>
                  <span className="text-gray-400 text-sm">{item.date}</span>
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <p className="text-gray-400 text-sm mt-1">📍 {item.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-police-blue transition-colors hover-lift">
                  <Edit3 className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors hover-lift">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Settings Content Component
const SettingsContent = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Admin Account</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input type="text" value="admin" disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input type="password" value="********" disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500" />
          </div>
          <p className="text-sm text-gray-500">Password can be changed after Firebase Auth integration.</p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-yellow-800 mb-2">Firebase Auth Integration</h2>
        <p className="text-yellow-700 text-sm mb-4">
          This admin panel currently uses simple hardcoded authentication. For production, integrate Firebase Authentication for secure login.
        </p>
        <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
          Learn About Firebase Auth
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
