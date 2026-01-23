// src/pages/AdminDashboard.js
import React, { useState } from 'react';
import { 
  Package, Wrench, FolderKanban, Building2, 
  MessageSquare, LayoutDashboard, Menu, X,
  LogOut, Settings
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import AdminServices from '../components/AdminServices';
import AdminEquipment from '../components/AdminEquipment';
import AdminProjects from '../components/AdminProjects';
import AdminOfficeInfo from '../components/AdminOfficeInfo';
import AdminContactMethods from '../components/AdminContactMethods';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'services', label: 'Services', icon: Package },
    { id: 'equipment', label: 'Equipment', icon: Wrench },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'office-info', label: 'Office Info', icon: Building2 },
    { id: 'contact-methods', label: 'Contact Methods', icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return <AdminServices />;
      case 'equipment':
        return <AdminEquipment />;
      case 'projects':
        return <AdminProjects />;
      case 'office-info':
        return <AdminOfficeInfo />;
      case 'contact-methods':
        return <AdminContactMethods />;
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
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
              theme === 'dark'
                ? 'text-red-400 hover:bg-red-900/20'
                : 'text-red-600 hover:bg-red-100'
            } ${!sidebarOpen && 'justify-center'}`}
            title={!sidebarOpen ? 'Logout' : ''}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
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

// Overview Dashboard Component
function OverviewDashboard({ menuItems, setActiveTab }) {
  const { theme } = useTheme();

  const stats = [
    { label: 'Total Services', value: '24', icon: Package, color: 'bg-blue-500' },
    { label: 'Equipment Items', value: '48', icon: Wrench, color: 'bg-green-500' },
    { label: 'Active Projects', value: '12', icon: FolderKanban, color: 'bg-purple-500' },
    { label: 'Office Locations', value: '3', icon: Building2, color: 'bg-orange-500' },
  ];

  const quickActions = menuItems.filter(item => item.id !== 'overview');

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
          {stats.map((stat, index) => {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary transition-colors">
                      <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-left">
                      <h3 className={`text-lg font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`}>
                        Manage {action.label}
                      </h3>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        View and edit {action.label.toLowerCase()}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className={`text-2xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            Recent Activity
          </h2>
          <div className={`rounded-2xl border-2 overflow-hidden ${
            theme === 'dark' 
              ? 'bg-gray-900/50 border-gray-800' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="p-6 space-y-4">
              {[
                { action: 'New service added', item: 'Web Development', time: '2 hours ago', icon: Package },
                { action: 'Equipment updated', item: 'Excavator XL-200', time: '5 hours ago', icon: Wrench },
                { action: 'Project completed', item: 'Downtown Plaza', time: '1 day ago', icon: FolderKanban },
                { action: 'Office info updated', item: 'Main Office', time: '2 days ago', icon: Building2 },
              ].map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-4 pb-4 ${
                      index !== 3 ? 'border-b' : ''
                    } ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`}>
                        {activity.action}
                      </p>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {activity.item}
                      </p>
                    </div>
                    <span className={`text-xs ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {activity.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}