import React, { useState, useEffect } from 'react';
import { 
  Package, Wrench, FolderKanban, MessageSquare, 
  LayoutDashboard, Menu, X, LogOut, Settings, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { API_URL } from '../config/api';
import axios from 'axios';
import AdminServices from '../components/AdminServices';
import AdminEquipment from '../components/AdminEquipment';
import AdminProjects from '../components/AdminProjects';
import AdminContactInfo from '../components/AdminContactMethods';
import { useToast } from '../context/ToastContext';


export default function AdminDashboard() {
    const toast = useToast();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'services', label: 'Services', icon: Package },
    { id: 'equipment', label: 'Equipment', icon: Wrench },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'contact-info', label: 'Contact Info', icon: MessageSquare },
  ];

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      
      await axios.post(`${API_URL.AUTH}/logout`, {}, { withCredentials: true });
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
      navigate('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return <AdminServices />;
      case 'equipment':
        return <AdminEquipment />;
      case 'projects':
        return <AdminProjects />;
      case 'contact-info':
        return <AdminContactInfo />;
      case 'overview':
      default:
        return <OverviewDashboard menuItems={menuItems} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className={`min-h-screen flex ${
      theme === 'dark' ? 'bg-black' : 'bg-gray-50'
    }`}>
      {/* Sidebar */}
      <aside className={`${
        sidebarOpen ? 'w-64' : 'w-20'
      } transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      } border-r fixed h-screen z-40 flex flex-col`}>
        
        {/* Logo & Toggle */}
        <div className={`p-4 border-b flex items-center justify-between ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        }`}>
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <h1 className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Admin Panel
              </h1>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'hover:bg-gray-800 text-gray-400'
                : 'hover:bg-gray-100 text-gray-600'
            } ${!sidebarOpen && 'mx-auto'}`}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-glow-orange'
                    : theme === 'dark'
                    ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                } ${!sidebarOpen && 'justify-center'}`}
                title={!sidebarOpen ? item.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className={`p-4 border-t space-y-2 ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
              theme === 'dark'
                ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-black'
            } ${!sidebarOpen && 'justify-center'}`}
            title={!sidebarOpen ? 'Settings' : ''}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Settings</span>}
          </button>
          
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
              theme === 'dark'
                ? 'text-red-400 hover:bg-red-900/20'
                : 'text-red-600 hover:bg-red-100'
            } ${!sidebarOpen && 'justify-center'} ${
              isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title={!sidebarOpen ? 'Logout' : ''}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {renderContent()}
      </main>
    </div>
  );
}

// Overview Dashboard Component with Dynamic Data
function OverviewDashboard({ menuItems, setActiveTab }) {
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    services: 0,
    equipment: 0,
    projects: 0,
    contactMethods: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      const [servicesRes, equipmentRes, projectsRes, contactRes] = await Promise.all([
        axios.get(API_URL.SERVICES, { withCredentials: true }).catch(() => ({ data: [] })),
        axios.get(API_URL.EQUIPMENT, { withCredentials: true }).catch(() => ({ data: [] })),
        axios.get(API_URL.PROJECTS, { withCredentials: true }).catch(() => ({ data: [] })),
        axios.get(API_URL.CONTACT_INFO, { withCredentials: true }).catch(() => ({ data: {} }))
      ]);

      const services = servicesRes.data || [];
      const equipment = equipmentRes.data || [];
      const projects = projectsRes.data || [];
      const contact = contactRes.data || {};

      setStats({
        services: Array.isArray(services) ? services.length : 0,
        equipment: Array.isArray(equipment) ? equipment.length : 0,
        projects: Array.isArray(projects) ? projects.length : 0,
        contactMethods: contact ? (
          (contact.phones?.length || 0) +
          (contact.addresses?.length || 0) +
          (contact.socialMedia?.length || 0)
        ) : 0
      });
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setStats({
        services: 0,
        equipment: 0,
        projects: 0,
        contactMethods: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    { label: 'Total Services', value: stats.services, icon: Package, color: 'bg-blue-500' },
    { label: 'Equipment Items', value: stats.equipment, icon: Wrench, color: 'bg-green-500' },
    { label: 'Active Projects', value: stats.projects, icon: FolderKanban, color: 'bg-purple-500' },
    { label: 'Contact Methods', value: stats.contactMethods, icon: MessageSquare, color: 'bg-orange-500' },
  ];

  const quickActions = menuItems.filter(item => item.id !== 'overview');

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-black' : 'bg-gray-50'
      }`}>
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black' : 'bg-gray-50'
    }`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#CC6500 1px, transparent 1px), linear-gradient(90deg, #CC6500 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl sm:text-4xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            Dashboard Overview
          </h1>
          <p className={`mt-2 text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Welcome back! Here's what's happening with your business.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`rounded-2xl border-2 p-6 transition-all hover:shadow-xl ${
                  theme === 'dark' 
                    ? 'bg-gray-900/50 border-gray-800' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className={`text-3xl font-bold mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  {stat.value}
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => setActiveTab(action.id)}
                  className={`rounded-2xl border-2 p-6 transition-all hover:shadow-xl hover:border-primary group ${
                    theme === 'dark' 
                      ? 'bg-gray-900/50 border-gray-800' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-4 rounded-lg bg-primary/10 group-hover:bg-primary transition-colors">
                      <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold mb-1 ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`}>
                        {action.label}
                      </h3>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Manage {action.label.toLowerCase()}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Info Section */}
        <div className={`rounded-2xl border-2 p-8 ${
          theme === 'dark' 
            ? 'bg-gray-900/50 border-gray-800' 
            : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-2xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            Getting Started
          </h2>
          <p className={`mb-6 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Use the navigation menu to manage your services, equipment, projects, and contact information. Click on any quick action above to get started.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'border-gray-800 bg-gray-900/30' : 'border-gray-200 bg-gray-50'
            }`}>
              <h3 className={`font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Services Management
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Add, edit, or remove services you offer to your clients.
              </p>
            </div>
            <div className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'border-gray-800 bg-gray-900/30' : 'border-gray-200 bg-gray-50'
            }`}>
              <h3 className={`font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Equipment Tracking
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Keep track of all your equipment and their details.
              </p>
            </div>
            <div className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'border-gray-800 bg-gray-900/30' : 'border-gray-200 bg-gray-50'
            }`}>
              <h3 className={`font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Project Portfolio
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Showcase your completed and ongoing projects.
              </p>
            </div>
            <div className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'border-gray-800 bg-gray-900/30' : 'border-gray-200 bg-gray-50'
            }`}>
              <h3 className={`font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Contact Information
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Update phone numbers, addresses, and social media links.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}