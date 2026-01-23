// src/components/AdminContactMethods.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, Edit2, Trash2, X, Loader, Save, 
  Mail, Phone, MessageSquare, Globe
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { API_URL } from '../config/api';

export default function AdminContactMethods() {
  const [contactMethods, setContactMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: 'email',
    label: '',
    value: '',
    description: '',
    isPrimary: false
  });
  
  const { theme } = useTheme();
  const toast = useToast();

  const methodTypes = [
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'phone', label: 'Phone', icon: Phone },
    { value: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
    { value: 'website', label: 'Website', icon: Globe }
  ];

  useEffect(() => {
    fetchContactMethods();
  }, []);

  const fetchContactMethods = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_URL.CONTACT_METHODS, { withCredentials: true });
      // Handle both array and object responses
      setContactMethods(Array.isArray(data) ? data : (data?.contactMethods || data?.data || []));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch contact methods');
      setContactMethods([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const openCreateModal = () => {
    setEditingMethod(null);
    setFormData({ 
      type: 'email', 
      label: '', 
      value: '', 
      description: '', 
      isPrimary: false 
    });
    setShowModal(true);
  };

  const openEditModal = (method) => {
    setEditingMethod(method);
    setFormData({
      type: method.type || 'email',
      label: method.label || '',
      value: method.value || '',
      description: method.description || '',
      isPrimary: method.isPrimary || false
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMethod(null);
    setFormData({ 
      type: 'email', 
      label: '', 
      value: '', 
      description: '', 
      isPrimary: false 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.label || !formData.value) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      if (editingMethod) {
        const { data } = await axios.put(
          `${API_URL.CONTACT_METHODS}/${editingMethod._id}`,
          formData,
          { withCredentials: true }
        );
        toast.success('Contact method updated successfully!');
        setContactMethods(prev =>
          prev.map(m => (m._id === editingMethod._id ? data.contactMethod : m))
        );
      } else {
        const { data } = await axios.post(
          API_URL.CONTACT_METHODS,
          formData,
          { withCredentials: true }
        );
        toast.success('Contact method created successfully!');
        setContactMethods(prev => [data.contactMethod, ...prev]);
      }

      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact method?')) return;

    try {
      await axios.delete(`${API_URL.CONTACT_METHODS}/${id}`, { withCredentials: true });
      toast.success('Contact method deleted successfully!');
      setContactMethods(prev => prev.filter(m => m._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete contact method');
    }
  };

  const getIconForType = (type) => {
    const methodType = methodTypes.find(m => m.value === type);
    return methodType ? methodType.icon : Mail;
  };

  return (
    <div className={`min-h-screen px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#CC6500 1px, transparent 1px), linear-gradient(90deg, #CC6500 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className={`text-3xl sm:text-4xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}>
              Manage Contact Methods
            </h1>
            <p className={`mt-2 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Create, edit, and manage contact methods
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-primary hover:shadow-glow-orange transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Contact Method
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : contactMethods.length === 0 ? (
          <div className={`text-center py-20 rounded-2xl border-2 ${
            theme === 'dark' 
              ? 'bg-gray-900/50 border-gray-800' 
              : 'bg-white border-gray-200'
          }`}>
            <MessageSquare className={`w-16 h-16 mx-auto mb-4 ${
              theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <p className={`text-lg ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              No contact methods found. Add your first contact method!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactMethods.map((method) => {
              const Icon = getIconForType(method.type);
              return (
                <div
                  key={method._id}
                  className={`rounded-2xl border-2 overflow-hidden transition-all hover:shadow-xl ${
                    theme === 'dark' 
                      ? 'bg-gray-900/50 border-gray-800' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`text-xl font-bold ${
                            theme === 'dark' ? 'text-white' : 'text-black'
                          }`}>
                            {method.label}
                          </h3>
                          {method.isPrimary && (
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-primary text-white">
                              Primary
                            </span>
                          )}
                        </div>
                        <p className={`text-xs mt-1 ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          {method.type.charAt(0).toUpperCase() + method.type.slice(1)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div>
                        <p className={`text-xs font-semibold mb-1 ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          Contact Value
                        </p>
                        <p className={`text-sm font-mono ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {method.value}
                        </p>
                      </div>

                      {method.description && (
                        <div>
                          <p className={`text-xs font-semibold mb-1 ${
                            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            Description
                          </p>
                          <p className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {method.description}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-gray-800">
                      <button
                        onClick={() => openEditModal(method)}
                        className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                          theme === 'dark'
                            ? 'bg-gray-800 text-white hover:bg-gray-700'
                            : 'bg-gray-100 text-black hover:bg-gray-200'
                        }`}
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(method._id)}
                        className="flex-1 py-2 px-4 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border-2 shadow-2xl ${
            theme === 'dark' 
              ? 'bg-gray-900 border-gray-800' 
              : 'bg-white border-gray-200'
          }`}>
            <div className={`p-6 border-b flex justify-between items-center ${
              theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
            }`}>
              <h2 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                {editingMethod ? 'Edit Contact Method' : 'Add New Contact Method'}
              </h2>
              <button
                onClick={closeModal}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-800 text-gray-400' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Contact Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                      : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                  }`}
                >
                  {methodTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Label *
                </label>
                <input
                  type="text"
                  name="label"
                  value={formData.label}
                  onChange={handleChange}
                  placeholder="e.g., Customer Support, Sales Inquiry"
                  className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-primary'
                      : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-primary'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Contact Value *
                </label>
                <input
                  type="text"
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                  placeholder={
                    formData.type === 'email' ? 'email@example.com' :
                    formData.type === 'phone' ? '+1 234 567 8900' :
                    formData.type === 'whatsapp' ? '+1 234 567 8900' :
                    'https://example.com'
                  }
                  className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-primary'
                      : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-primary'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter additional details about this contact method"
                  rows="3"
                  className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all resize-none ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-primary'
                      : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-primary'
                  }`}
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isPrimary"
                  name="isPrimary"
                  checked={formData.isPrimary}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-2 border-gray-700 text-primary focus:ring-primary focus:ring-2"
                />
                <label 
                  htmlFor="isPrimary"
                  className={`text-sm font-semibold cursor-pointer ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Mark as Primary Contact Method
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-gray-200 text-black hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold text-white bg-primary hover:shadow-glow-orange flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      {editingMethod ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      {editingMethod ? 'Update Method' : 'Create Method'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}