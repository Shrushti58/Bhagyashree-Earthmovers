import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, Edit2, Trash2, X, Image as ImageIcon, 
  Loader, Save, FolderKanban, Upload, Star, MapPin, Calendar
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { API_URL } from '../config/api';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    type: 'Industrial',
    year: new Date().getFullYear().toString(),
    status: 'Completed',
    featured: false,
    clientName: '',
    projectValue: '',
    duration: '',
    tags: '',
    images: []
  });
  
  const { theme } = useTheme();
  const toast = useToast();

  const projectTypes = ['Industrial', 'Residential', 'Infrastructure', 'Commercial'];
  const projectStatuses = ['Completed', 'In Progress', 'Upcoming'];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_URL.PROJECTS, { withCredentials: true });
      setProjects(data.projects || []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch projects');
      setProjects([]);
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

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }

    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error('Some images exceed 5MB limit');
      return;
    }

    setFormData(prev => ({ ...prev, images: files }));

    const previews = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previews).then(setImagePreviews);
  };

  const removeImagePreview = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({ 
      name: '',
      description: '',
      location: '',
      type: 'Industrial',
      year: new Date().getFullYear().toString(),
      status: 'Completed',
      featured: false,
      clientName: '',
      projectValue: '',
      duration: '',
      tags: '',
      images: []
    });
    setImagePreviews([]);
    setShowModal(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name || '',
      description: project.description || '',
      location: project.location || '',
      type: project.type || 'Industrial',
      year: project.year || new Date().getFullYear().toString(),
      status: project.status || 'Completed',
      featured: project.featured || false,
      clientName: project.clientName || '',
      projectValue: project.projectValue || '',
      duration: project.duration || '',
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : '',
      images: []
    });
    setImagePreviews(project.images || [project.image] || []);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setFormData({ 
      name: '',
      description: '',
      location: '',
      type: 'Industrial',
      year: new Date().getFullYear().toString(),
      status: 'Completed',
      featured: false,
      clientName: '',
      projectValue: '',
      duration: '',
      tags: '',
      images: []
    });
    setImagePreviews([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.location || !formData.type || !formData.year) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('year', formData.year);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('featured', formData.featured);
      
      if (formData.clientName) formDataToSend.append('clientName', formData.clientName);
      if (formData.projectValue) formDataToSend.append('projectValue', formData.projectValue);
      if (formData.duration) formDataToSend.append('duration', formData.duration);
      if (formData.tags) {
        const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
        formDataToSend.append('tags', JSON.stringify(tagsArray));
      }

      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((image) => {
          formDataToSend.append('images', image);
        });
      }

      if (editingProject) {
        const { data } = await axios.put(
          `${API_URL.PROJECTS}/${editingProject._id}`,
          formDataToSend,
          { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }
        );
        toast.success('Project updated successfully!');
        setProjects(prev =>
          prev.map(p => (p._id === editingProject._id ? data.project : p))
        );
      } else {
        const { data } = await axios.post(
          API_URL.PROJECTS,
          formDataToSend,
          { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }
        );
        toast.success('Project created successfully!');
        setProjects(prev => [data.project, ...prev]);
      }

      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await axios.delete(`${API_URL.PROJECTS}/${id}`, { withCredentials: true });
      toast.success('Project deleted successfully!');
      setProjects(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete project');
    }
  };

  const toggleFeatured = async (project) => {
    try {
      const { data } = await axios.patch(
        `${API_URL.PROJECTS}/${project._id}/toggle-featured`,
        {},
        { withCredentials: true }
      );
      toast.success(`Project ${data.project.featured ? 'featured' : 'unfeatured'}!`);
      setProjects(prev =>
        prev.map(p => (p._id === project._id ? data.project : p))
      );
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update project');
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
              Manage Projects
            </h1>
            <p className={`mt-2 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Create, edit, and manage your project portfolio
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-orange-600 hover:bg-orange-500 hover:shadow-2xl hover:shadow-orange-600/50 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Project
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-8 h-8 text-orange-600 animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className={`text-center py-20 rounded-2xl border-2 ${
            theme === 'dark' 
              ? 'bg-gray-900/50 border-gray-800' 
              : 'bg-white border-gray-200'
          }`}>
            <FolderKanban className={`w-16 h-16 mx-auto mb-4 ${
              theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <p className={`text-lg ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              No projects found. Add your first project!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className={`rounded-3xl border-2 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-br from-gray-900 to-gray-900/80 border-gray-800 hover:border-orange-600/70' 
                    : 'bg-white border-gray-200 hover:border-orange-600/70'
                }`}
              >
                {(project.images?.length > 0 || project.image) && (
                  <div className="h-56 overflow-hidden bg-gray-800 relative group">
                    <img
                      src={project.images?.[0] || project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {project.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-orange-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg">
                        <Star className="w-3 h-3 fill-white" />
                        Featured
                      </div>
                    )}

                    <div className="absolute top-4 left-4">
                      <div className={`px-3 py-1.5 rounded-full backdrop-blur-md border text-xs font-bold ${
                        theme === 'dark'
                          ? 'bg-black/60 border-orange-600/40 text-orange-400'
                          : 'bg-white/80 border-orange-600/40 text-orange-600'
                      }`}>
                        {project.type}
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg">
                        <Calendar className="w-3 h-3" />
                        <span className="text-xs font-bold">{project.year}</span>
                      </div>
                    </div>

                    {project.images?.length > 1 && (
                      <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-semibold">
                        +{project.images.length - 1}
                      </div>
                    )}
                  </div>
                )}

                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}>
                    {project.name}
                  </h3>

                  <div className={`flex items-center gap-2 text-sm mb-3 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
                    <span className="font-medium">{project.location}</span>
                  </div>

                  <div className={`h-px mb-3 ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                  }`}></div>

                  <p className={`text-sm mb-4 line-clamp-3 leading-relaxed ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {project.description}
                  </p>

                  {(project.clientName || project.duration) && (
                    <div className="space-y-1.5 mb-4">
                      {project.clientName && (
                        <p className={`text-xs ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          <span className="font-semibold">Client:</span> {project.clientName}
                        </p>
                      )}
                      {project.duration && (
                        <p className={`text-xs ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          <span className="font-semibold">Duration:</span> {project.duration}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 pt-4 border-t border-gray-800">
                    <button
                      onClick={() => toggleFeatured(project)}
                      className={`p-2 rounded-lg transition-all ${
                        project.featured
                          ? 'bg-orange-600 text-white hover:bg-orange-500'
                          : theme === 'dark'
                          ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title={project.featured ? 'Remove from featured' : 'Mark as featured'}
                    >
                      <Star className={`w-4 h-4 ${project.featured ? 'fill-white' : ''}`} />
                    </button>
                    <button
                      onClick={() => openEditModal(project)}
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
                      onClick={() => handleDelete(project._id)}
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
          <div className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border-2 shadow-2xl ${
            theme === 'dark' 
              ? 'bg-gray-900 border-gray-800' 
              : 'bg-white border-gray-200'
          }`}>
            <div className={`p-6 border-b sticky top-0 z-10 flex justify-between items-center ${
              theme === 'dark' ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
            }`}>
              <h2 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                {editingProject ? 'Edit Project' : 'Create New Project'}
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
                  Project Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter project name"
                  required
                  className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-600'
                      : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-orange-600'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className={`block text-sm font-semibold ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-orange-600'
                        : 'bg-gray-50 border-gray-300 text-black focus:border-orange-600'
                    }`}
                  >
                    {projectTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className={`block text-sm font-semibold ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Year *
                  </label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="2024"
                    required
                    pattern="\d{4}"
                    className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-600'
                        : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-orange-600'
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className={`block text-sm font-semibold ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-orange-600'
                        : 'bg-gray-50 border-gray-300 text-black focus:border-orange-600'
                    }`}
                  >
                    {projectStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter project location"
                  required
                  className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-600'
                      : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-orange-600'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={`block text-sm font-semibold ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Client Name
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    placeholder="Enter client name"
                    className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-600'
                        : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-orange-600'
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className={`block text-sm font-semibold ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 6 months"
                    className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-600'
                        : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-orange-600'
                    }`}
                  />
                </div>
              </div>

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
                  placeholder="Enter project description"
                  rows="4"
                  required
                  className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all resize-none ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-600'
                      : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-orange-600'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g., excavation, grading, heavy machinery"
                  className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-600'
                      : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-orange-600'
                  }`}
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-2 border-gray-700 text-orange-600 focus:ring-orange-600 focus:ring-2"
                />
                <label htmlFor="featured" className={`text-sm font-semibold cursor-pointer ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Mark as Featured Project
                </label>
              </div>

              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Project Images (Multiple)
                </label>
                
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-3">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImagePreview(index)}
                          className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-1 left-1 px-2 py-0.5 rounded bg-orange-600 text-white text-xs font-semibold">
                            Primary
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                    : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                }`}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className={`w-8 h-8 mb-2 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Click to upload images (max 10)
                    </p>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      PNG, JPG up to 5MB each
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImagesChange}
                  />
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
                  className="flex-1 py-3 px-6 rounded-lg font-semibold text-white bg-orange-600 hover:bg-orange-500 hover:shadow-2xl hover:shadow-orange-600/50 flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      {editingProject ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      {editingProject ? 'Update Project' : 'Create Project'}
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