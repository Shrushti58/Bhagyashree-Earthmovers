// src/components/AdminEquipment.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, Edit2, Trash2, X, Image as ImageIcon, 
  Loader, Save, Wrench, Upload
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { API_URL } from '../config/api';

export default function AdminEquipment() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    available: true,
    hourlyRate: '',
    bestFor: '',
    image: null
  });
  
  const { theme } = useTheme();
  const toast = useToast();

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_URL.EQUIPMENT, { withCredentials: true });
      setEquipment(Array.isArray(data) ? data : (data?.equipment || data?.data || []));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch equipment');
      setEquipment([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setFormData(prev => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({ 
      name: '', 
      category: '',
      description: '',
      available: true,
      hourlyRate: '',
      bestFor: '', 
      image: null 
    });
    setImagePreview(null);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category || '',
      description: item.description,
      available: item.available !== false,
      hourlyRate: item.hourlyRate || '',
      bestFor: item.bestFor || '',
      image: null
    });
    setImagePreview(item.image || null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({ name: '', category: '', description: '', available: true, hourlyRate: '', bestFor: '', image: null });
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.description || !formData.hourlyRate) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('available', formData.available);
      formDataToSend.append('hourlyRate', formData.hourlyRate);
      if (formData.bestFor) formDataToSend.append('bestFor', formData.bestFor);
      if (formData.image) formDataToSend.append('image', formData.image);

      if (editingItem) {
        const { data } = await axios.put(
          `${API_URL.EQUIPMENT}/${editingItem._id}`,
          formDataToSend,
          { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }
        );
        toast.success('Equipment updated successfully!');
        setEquipment(prev =>
          prev.map(item => (item._id === editingItem._id ? (data.equipment || data) : item))
        );
      } else {
        const { data } = await axios.post(
          API_URL.EQUIPMENT,
          formDataToSend,
          { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }
        );
        toast.success('Equipment created successfully!');
        setEquipment(prev => [(data.equipment || data), ...prev]);
      }

      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this equipment?')) return;

    try {
      await axios.delete(`${API_URL.EQUIPMENT}/${id}`, { withCredentials: true });
      toast.success('Equipment deleted successfully!');
      setEquipment(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete equipment');
    }
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
              Manage Equipment
            </h1>
            <p className={`mt-2 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Create, edit, and manage your equipment inventory
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-primary hover:shadow-glow-orange transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Equipment
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : equipment.length === 0 ? (
          <div className={`text-center py-20 rounded-2xl border-2 ${
            theme === 'dark' 
              ? 'bg-gray-900/50 border-gray-800' 
              : 'bg-white border-gray-200'
          }`}>
            <Wrench className={`w-16 h-16 mx-auto mb-4 ${
              theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <p className={`text-lg ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              No equipment found. Add your first equipment!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((item) => (
              <div
                key={item._id}
                className={`rounded-2xl border-2 overflow-hidden transition-all hover:shadow-xl ${
                  theme === 'dark' 
                    ? 'bg-gray-900/50 border-gray-800 hover:border-primary/50' 
                    : 'bg-white border-gray-200 hover:border-primary/50'
                }`}
              >
                {item.image && (
                  <div className="h-48 overflow-hidden bg-gray-800">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}>
                    {item.name}
                  </h3>

                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                    theme === 'dark' ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'
                  }`}>
                    {item.category}
                  </div>

                  <p className={`text-sm mb-3 line-clamp-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {item.description}
                  </p>

                  {item.hourlyRate && (
                    <div className={`text-lg font-bold mb-3 ${
                      theme === 'dark' ? 'text-primary' : 'text-primary'
                    }`}>
                      {item.hourlyRate} <span className={`text-sm font-normal ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>per hour</span>
                    </div>
                  )}

                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold mb-4 ${
                    item.available
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      item.available ? 'bg-green-400' : 'bg-red-400'
                    }`}></div>
                    {item.available ? 'Available' : 'Unavailable'}
                  </div>

                  {item.bestFor && (
                    <div className={`text-xs mb-4 p-3 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      <span className="font-semibold text-primary">Best For: </span>
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        {item.bestFor}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4 border-t border-gray-800">
                    <button
                      onClick={() => openEditModal(item)}
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
                      onClick={() => handleDelete(item._id)}
                      className="flex-1 py-2 px-4 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
            <div className={`p-6 border-b flex justify-between items-center sticky top-0 z-10 ${
              theme === 'dark' ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
            }`}>
              <h2 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                {editingItem ? 'Edit Equipment' : 'Add New Equipment'}
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
              {/* Equipment Name */}
              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Equipment Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., JCB NXT 205 Excavator"
                  required
                  className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-primary'
                      : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-primary'
                  }`}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Excavator, Mini Excavator, Bulldozer"
                  required
                  className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-primary'
                      : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-primary'
                  }`}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter detailed description of the equipment"
                  rows="4"
                  required
                  className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all resize-none ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-primary'
                      : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-primary'
                  }`}
                />
              </div>

              {/* Hourly Rate */}
              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Hourly Rate *
                </label>
                <input
                  type="text"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  placeholder="e.g., ₹2,500"
                  required
                  className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-primary'
                      : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-primary'
                  }`}
                />
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Availability
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="available"
                      checked={formData.available === true}
                      onChange={() => setFormData(prev => ({ ...prev, available: true }))}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                      Available
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="available"
                      checked={formData.available === false}
                      onChange={() => setFormData(prev => ({ ...prev, available: false }))}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                      Unavailable
                    </span>
                  </label>
                </div>
              </div>

              {/* Best For */}
              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Best For
                </label>
                <input
                  type="text"
                  name="bestFor"
                  value={formData.bestFor}
                  onChange={handleChange}
                  placeholder="e.g., Heavy excavation, road construction, foundations"
                  className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-primary'
                      : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-primary'
                  }`}
                />
              </div>

              {/* Equipment Image */}
              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Equipment Image
                </label>
                
                {imagePreview && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-800 mb-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, image: null }));
                      }}
                      className="absolute top-2 right-2 p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                    : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                }`}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {imagePreview ? (
                      <Upload className={`w-8 h-8 mb-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                    ) : (
                      <ImageIcon className={`w-8 h-8 mb-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                    )}
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {imagePreview ? 'Click to change image' : 'Click to upload image'}
                    </p>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-700">
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
                      {editingItem ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      {editingItem ? 'Update Equipment' : 'Create Equipment'}
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