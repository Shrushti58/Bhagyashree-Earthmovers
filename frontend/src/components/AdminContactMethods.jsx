// src/components/AdminContactMethods.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, Edit2, Trash2, X, Loader, Save, Mail, Phone, 
  MessageSquare, Globe, MapPin, Clock, Shield, Users, Award,
  ExternalLink, Building, Navigation,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { API_URL } from '../config/api';

export default function AdminContactMethods() {
  const [contactInfo, setContactInfo] = useState({
    businessName: '',
    businessEmail: '',
    website: '',
    phones: [],
    addresses: [],
    workingHours: [],
    socialMedia: [],
    emergencyContact: '',
    supportEmail: '',
    salesEmail: '',
    gstNumber: '',
    cinNumber: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('phones');
  
  const { theme } = useTheme();
  const toast = useToast();

  const [phoneForm, setPhoneForm] = useState({
    type: 'primary',
    number: '',
    countryCode: '+91',
    isActive: true,
    displayOrder: 0
  });

  const [addressForm, setAddressForm] = useState({
    type: 'main',
    name: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    googleMapsUrl: '',
    isActive: true
  });

  const [workingHourForm, setWorkingHourForm] = useState({
    day: 'monday',
    openTime: '09:00',
    closeTime: '18:00',
    isClosed: false,
    note: ''
  });

  const [socialForm, setSocialForm] = useState({
    platform: 'facebook',
    url: '',
    displayName: '',
    isActive: true
  });

  const [basicInfoForm, setBasicInfoForm] = useState({
    businessName: '',
    businessEmail: '',
    website: '',
    emergencyContact: '',
    supportEmail: '',
    salesEmail: '',
    gstNumber: '',
    cinNumber: ''
  });

  const phoneTypes = [
    { value: 'primary', label: 'Primary Phone', icon: Phone },
    { value: 'secondary', label: 'Secondary Phone', icon: Phone },
    { value: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
    { value: 'emergency', label: 'Emergency', icon: Shield },
    { value: 'sales', label: 'Sales', icon: Users },
    { value: 'support', label: 'Support', icon: Award }
  ];

  const addressTypes = [
    { value: 'main', label: 'Main Office', icon: Building },
    { value: 'branch', label: 'Branch Office', icon: Building },
    { value: 'warehouse', label: 'Warehouse', icon: Shield }
  ];

  const days = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  const socialPlatforms = [
    { value: 'facebook', label: 'Facebook', icon: Globe },
    { value: 'twitter', label: 'Twitter', icon: Globe },
    { value: 'instagram', label: 'Instagram', icon: Globe },
    { value: 'linkedin', label: 'LinkedIn', icon: Globe },
    { value: 'youtube', label: 'YouTube', icon: Globe },
    { value: 'whatsapp', label: 'WhatsApp Business', icon: MessageSquare },
    { value: 'telegram', label: 'Telegram', icon: MessageSquare }
  ];

  const tabs = [
    { id: 'phones', label: 'Phone Numbers', icon: Phone, color: 'text-blue-500' },
    { id: 'addresses', label: 'Addresses', icon: MapPin, color: 'text-green-500' },
    { id: 'hours', label: 'Working Hours', icon: Clock, color: 'text-purple-500' },
    { id: 'social', label: 'Social Media', icon: Globe, color: 'text-pink-500' },
    { id: 'info', label: 'Basic Info', icon: Shield, color: 'text-orange-500' }
  ];

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_URL.CONTACT_INFO, { withCredentials: true });
      if (data) {
        setContactInfo({
          businessName: data.businessName || '',
          businessEmail: data.businessEmail || '',
          website: data.website || '',
          phones: data.phones || [],
          addresses: data.addresses || [],
          workingHours: data.workingHours || [],
          socialMedia: data.socialMedia || [],
          emergencyContact: data.emergencyContact || '',
          supportEmail: data.supportEmail || '',
          salesEmail: data.salesEmail || '',
          gstNumber: data.gstNumber || '',
          cinNumber: data.cinNumber || ''
        });
      }
    } catch (err) {
      console.error('Fetch error:', err);
      toast.error(err.response?.data?.message || 'Failed to fetch contact information');
    } finally {
      setLoading(false);
    }
  };

  const openPhoneModal = (phone = null) => {
    setModalType('phone');
    setEditingItem(phone);
    setEditingItemId(phone?._id);
    
    if (phone) {
      setPhoneForm({
        type: phone.type,
        number: phone.number,
        countryCode: phone.countryCode || '+91',
        isActive: phone.isActive !== false,
        displayOrder: phone.displayOrder || 0
      });
    } else {
      setPhoneForm({
        type: 'primary',
        number: '',
        countryCode: '+91',
        isActive: true,
        displayOrder: contactInfo.phones?.length || 0
      });
    }
    setShowModal(true);
  };

  const openAddressModal = (address = null) => {
    setModalType('address');
    setEditingItem(address);
    setEditingItemId(address?._id);
    
    if (address) {
      setAddressForm({
        type: address.type,
        name: address.name,
        line1: address.line1,
        line2: address.line2 || '',
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country || 'India',
        googleMapsUrl: address.googleMapsUrl || '',
        isActive: address.isActive !== false
      });
    } else {
      setAddressForm({
        type: 'main',
        name: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India',
        googleMapsUrl: '',
        isActive: true
      });
    }
    setShowModal(true);
  };

  const openHoursModal = (hour = null) => {
    setModalType('hours');
    setEditingItem(hour);
    setEditingItemId(hour?._id);
    
    if (hour) {
      setWorkingHourForm({
        day: hour.day,
        openTime: hour.openTime,
        closeTime: hour.closeTime,
        isClosed: hour.isClosed || false,
        note: hour.note || ''
      });
    } else {
      setWorkingHourForm({
        day: 'monday',
        openTime: '09:00',
        closeTime: '18:00',
        isClosed: false,
        note: ''
      });
    }
    setShowModal(true);
  };

  const openSocialModal = (social = null) => {
    setModalType('social');
    setEditingItem(social);
    setEditingItemId(social?._id);
    
    if (social) {
      setSocialForm({
        platform: social.platform,
        url: social.url,
        displayName: social.displayName || '',
        isActive: social.isActive !== false
      });
    } else {
      setSocialForm({
        platform: 'facebook',
        url: '',
        displayName: '',
        isActive: true
      });
    }
    setShowModal(true);
  };

  const openBasicInfoModal = () => {
    setModalType('info');
    setEditingItem(null);
    setEditingItemId(null);
    setBasicInfoForm({
      businessName: contactInfo.businessName || '',
      businessEmail: contactInfo.businessEmail || '',
      website: contactInfo.website || '',
      emergencyContact: contactInfo.emergencyContact || '',
      supportEmail: contactInfo.supportEmail || '',
      salesEmail: contactInfo.salesEmail || '',
      gstNumber: contactInfo.gstNumber || '',
      cinNumber: contactInfo.cinNumber || ''
    });
    setShowModal(true);
  };

  const getArrayNameForModalType = (modalType) => {
    switch(modalType) {
      case 'phone': return 'phones';
      case 'address': return 'addresses';
      case 'hours': return 'workingHours';
      case 'social': return 'socialMedia';
      default: return '';
    }
  };

  const getArrayNameForType = (type) => {
    switch(type) {
      case 'phone': return 'phones';
      case 'address': return 'addresses';
      case 'hours': return 'workingHours';
      case 'social': return 'socialMedia';
      default: return type;
    }
  };

  const getEndpointForModalType = (modalType) => {
    switch(modalType) {
      case 'phone': return '/phones';
      case 'address': return '/addresses';
      case 'hours': return '/working-hours';
      case 'social': return '/social-media';
      default: return '';
    }
  };

  const getFormDataForModalType = (modalType) => {
    switch(modalType) {
      case 'phone': return phoneForm;
      case 'address': return addressForm;
      case 'hours': return workingHourForm;
      case 'social': return socialForm;
      default: return {};
    }
  };

  const getModalTypeLabel = (modalType) => {
    switch(modalType) {
      case 'phone': return 'Phone';
      case 'address': return 'Address';
      case 'hours': return 'Working hours';
      case 'social': return 'Social media';
      default: return 'Item';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (modalType === 'info') {
        const response = await axios.put(
          API_URL.CONTACT_INFO,
          { ...contactInfo, ...basicInfoForm },
          { withCredentials: true }
        );
        setContactInfo(response.data);
        toast.success('Basic info updated successfully!');
      } 
      else if (editingItemId) {
        const arrayName = getArrayNameForModalType(modalType);
        const response = await axios.put(
          `${API_URL.CONTACT_INFO}/${arrayName}/${editingItemId}`,
          getFormDataForModalType(modalType),
          { withCredentials: true }
        );
        setContactInfo(response.data);
        toast.success(`${getModalTypeLabel(modalType)} updated successfully!`);
      } 
      else {
        const endpoint = getEndpointForModalType(modalType);
        const formData = getFormDataForModalType(modalType);
        
        const response = await axios.post(
          `${API_URL.CONTACT_INFO}${endpoint}`,
          formData,
          { withCredentials: true }
        );
        setContactInfo(response.data);
        toast.success(`${getModalTypeLabel(modalType)} added successfully!`);
      }

      closeModal();
    } catch (err) {
      console.error('Submit error:', err);
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (type, itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const arrayName = getArrayNameForType(type);
      const response = await axios.delete(
        `${API_URL.CONTACT_INFO}/${arrayName}/${itemId}`,
        { withCredentials: true }
      );
      setContactInfo(response.data);
      toast.success('Item deleted successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleReorder = async (type, itemId, direction) => {
    try {
      const array = contactInfo[getArrayNameForType(type)];
      const itemIndex = array.findIndex(item => item._id === itemId);
      
      if ((direction === 'up' && itemIndex === 0) || 
          (direction === 'down' && itemIndex === array.length - 1)) {
        return;
      }

      const newIndex = direction === 'up' ? itemIndex - 1 : itemIndex + 1;
      const updatedArray = [...array];
      [updatedArray[itemIndex], updatedArray[newIndex]] = [updatedArray[newIndex], updatedArray[itemIndex]];
      
      updatedArray.forEach((item, idx) => {
        item.displayOrder = idx;
      });

      const updatedContactInfo = {
        ...contactInfo,
        [getArrayNameForType(type)]: updatedArray
      };

      const response = await axios.put(
        API_URL.CONTACT_INFO,
        updatedContactInfo,
        { withCredentials: true }
      );

      setContactInfo(response.data);
      toast.success('Order updated!');
    } catch (err) {
      toast.error('Failed to save order');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setEditingItem(null);
    setEditingItemId(null);
    setPhoneForm({ type: 'primary', number: '', countryCode: '+91', isActive: true, displayOrder: 0 });
    setAddressForm({ type: 'main', name: '', line1: '', line2: '', city: '', state: '', postalCode: '', country: 'India', googleMapsUrl: '', isActive: true });
    setWorkingHourForm({ day: 'monday', openTime: '09:00', closeTime: '18:00', isClosed: false, note: '' });
    setSocialForm({ platform: 'facebook', url: '', displayName: '', isActive: true });
    setBasicInfoForm({ businessName: '', businessEmail: '', website: '', emergencyContact: '', supportEmail: '', salesEmail: '', gstNumber: '', cinNumber: '' });
  };

  const getIconForPhone = (type) => {
    const phoneType = phoneTypes.find(p => p.value === type);
    return phoneType ? phoneType.icon : Phone;
  };

  const getIconForSocial = (platform) => {
    const social = socialPlatforms.find(s => s.value === platform);
    return social ? social.icon : Globe;
  };

  const renderPhones = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          Phone Numbers ({contactInfo.phones?.length || 0})
        </h3>
        <button
          onClick={() => openPhoneModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Add Phone
        </button>
      </div>
      
      {contactInfo.phones?.length === 0 ? (
        <div className={`text-center py-8 rounded-lg border-2 border-dashed ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
        }`}>
          <Phone className={`w-12 h-12 mx-auto mb-3 ${
            theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
          }`} />
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            No phone numbers added yet
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {contactInfo.phones.map((phone) => {
            const Icon = getIconForPhone(phone.type);
            return (
              <div key={phone._id} className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-900/30 border-gray-800' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-primary" />
                    <div>
                      <div className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`}>
                        {phoneTypes.find(p => p.value === phone.type)?.label}
                      </div>
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                      }`}>
                        Order: {phone.displayOrder || 0}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleReorder('phone', phone._id, 'up')}
                        disabled={contactInfo.phones.findIndex(p => p._id === phone._id) === 0}
                        className={`p-1 rounded ${
                          contactInfo.phones.findIndex(p => p._id === phone._id) === 0 
                            ? 'opacity-30 cursor-not-allowed' 
                            : 'hover:bg-gray-700'
                        }`}
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReorder('phone', phone._id, 'down')}
                        disabled={contactInfo.phones.findIndex(p => p._id === phone._id) === contactInfo.phones.length - 1}
                        className={`p-1 rounded ${
                          contactInfo.phones.findIndex(p => p._id === phone._id) === contactInfo.phones.length - 1
                            ? 'opacity-30 cursor-not-allowed' 
                            : 'hover:bg-gray-700'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => openPhoneModal(phone)}
                      className="p-1 hover:text-primary transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete('phone', phone._id)}
                      className="p-1 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-white font-mono text-lg">
                  {phone.countryCode} {phone.number}
                </div>
                <div className={`text-xs mt-2 flex items-center gap-2 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  <span className={`px-2 py-1 rounded ${
                    phone.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {phone.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderAddresses = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          Addresses ({contactInfo.addresses?.length || 0})
        </h3>
        <button
          onClick={() => openAddressModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Add Address
        </button>
      </div>
      
      {contactInfo.addresses?.length === 0 ? (
        <div className={`text-center py-8 rounded-lg border-2 border-dashed ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
        }`}>
          <MapPin className={`w-12 h-12 mx-auto mb-3 ${
            theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
          }`} />
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            No addresses added yet
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {contactInfo.addresses.map((address) => (
            <div key={address._id} className={`p-4 rounded-xl border ${
              theme === 'dark' ? 'bg-gray-900/30 border-gray-800' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-primary" />
                  <div>
                    <div className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}>
                      {address.name}
                    </div>
                    <div className={`text-xs ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                    }`}>
                      {addressTypes.find(a => a.value === address.type)?.label}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openAddressModal(address)}
                    className="p-1 hover:text-primary transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete('address', address._id)}
                    className="p-1 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-white">{address.line1}</div>
                {address.line2 && <div className="text-white">{address.line2}</div>}
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {address.city}, {address.state} - {address.postalCode}
                </div>
                
                {address.googleMapsUrl && (
                  <a
                    href={address.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    <Navigation className="w-4 h-4" />
                    View on Map
                  </a>
                )}
                
                <div className={`text-xs mt-2 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  <span className={`px-2 py-1 rounded ${
                    address.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {address.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderWorkingHours = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          Working Hours ({contactInfo.workingHours?.length || 0})
        </h3>
        <button
          onClick={() => openHoursModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Add Hours
        </button>
      </div>
      
      {contactInfo.workingHours?.length === 0 ? (
        <div className={`text-center py-8 rounded-lg border-2 border-dashed ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
        }`}>
          <Clock className={`w-12 h-12 mx-auto mb-3 ${
            theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
          }`} />
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            No working hours added yet
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contactInfo.workingHours.map((hour) => (
            <div key={hour._id} className={`p-4 rounded-xl border ${
              theme === 'dark' ? 'bg-gray-900/30 border-gray-800' : 'bg-white border-gray-200'
            }`}>
              <div className="flex justify-between items-center mb-3">
                <span className={`font-semibold capitalize ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  {hour.day}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => openHoursModal(hour)}
                    className="p-1 hover:text-primary transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete('hours', hour._id)}
                    className="p-1 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {hour.isClosed ? (
                <div className="text-red-500 font-semibold">Closed</div>
              ) : (
                <div className="text-white text-lg">
                  {hour.openTime} - {hour.closeTime}
                </div>
              )}
              
              {hour.note && (
                <div className={`text-sm mt-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {hour.note}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSocialMedia = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          Social Media ({contactInfo.socialMedia?.length || 0})
        </h3>
        <button
          onClick={() => openSocialModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Add Social
        </button>
      </div>
      
      {contactInfo.socialMedia?.length === 0 ? (
        <div className={`text-center py-8 rounded-lg border-2 border-dashed ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
        }`}>
          <Globe className={`w-12 h-12 mx-auto mb-3 ${
            theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
          }`} />
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            No social media added yet
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contactInfo.socialMedia.map((social) => {
            const Icon = getIconForSocial(social.platform);
            return (
              <div key={social._id} className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-900/30 border-gray-800' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <div>
                      <div className={`font-semibold capitalize ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`}>
                        {social.platform}
                      </div>
                      {social.displayName && (
                        <div className={`text-xs ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                        }`}>
                          {social.displayName}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openSocialModal(social)}
                      className="p-1 hover:text-primary transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete('social', social._id)}
                      className="p-1 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline break-all text-sm inline-flex items-center gap-1"
                >
                  {social.url}
                  <ExternalLink className="w-3 h-3" />
                </a>
                
                <div className={`text-xs mt-2 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  <span className={`px-2 py-1 rounded ${
                    social.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {social.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderBasicInfo = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          Basic Information
        </h3>
        <button
          onClick={openBasicInfoModal}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary/90"
        >
          <Edit2 className="w-4 h-4" />
          Edit Info
        </button>
      </div>
      
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900/30 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-semibold mb-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Business Name
              </label>
              <div className={`text-lg ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                {contactInfo.businessName || 'Not set'}
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-semibold mb-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Business Email
              </label>
              <div className="text-lg text-primary">
                {contactInfo.businessEmail || 'Not set'}
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-semibold mb-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Website
              </label>
              <div className="text-lg text-primary">
                {contactInfo.website ? (
                  <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {contactInfo.website}
                  </a>
                ) : 'Not set'}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-semibold mb-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Emergency Contact
              </label>
              <div className={`text-lg ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                {contactInfo.emergencyContact || 'Not set'}
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-semibold mb-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Support Email
              </label>
              <div className={`text-lg ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                {contactInfo.supportEmail || 'Not set'}
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-semibold mb-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                GST Number
              </label>
              <div className={`text-lg ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                {contactInfo.gstNumber || 'Not set'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-black' : 'bg-gray-50'
      }`}>
        <Loader className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-3xl sm:text-4xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            Contact Information Management
          </h1>
          <p className={`mt-2 text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Manage all your business contact information
          </p>
        </div>

        <div className={`mb-8 rounded-xl border ${
          theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className="flex flex-wrap gap-1 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : theme === 'dark'
                        ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                        : 'text-gray-600 hover:text-black hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className={`p-6 rounded-xl border ${
          theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          {activeTab === 'phones' && renderPhones()}
          {activeTab === 'addresses' && renderAddresses()}
          {activeTab === 'hours' && renderWorkingHours()}
          {activeTab === 'social' && renderSocialMedia()}
          {activeTab === 'info' && renderBasicInfo()}
        </div>
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
                {modalType === 'phone' && (editingItem ? 'Edit Phone' : 'Add Phone')}
                {modalType === 'address' && (editingItem ? 'Edit Address' : 'Add Address')}
                {modalType === 'hours' && (editingItem ? 'Edit Working Hours' : 'Add Working Hours')}
                {modalType === 'social' && (editingItem ? 'Edit Social Media' : 'Add Social Media')}
                {modalType === 'info' && 'Edit Basic Information'}
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
              {modalType === 'phone' && (
                <>
                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Phone Type *
                    </label>
                    <select
                      value={phoneForm.type}
                      onChange={(e) => setPhoneForm({...phoneForm, type: e.target.value})}
                      className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                          : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                      }`}
                    >
                      {phoneTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Country Code *
                      </label>
                      <input
                        type="text"
                        value={phoneForm.countryCode}
                        onChange={(e) => setPhoneForm({...phoneForm, countryCode: e.target.value})}
                        className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                            : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Phone Number *
                      </label>
                      <input
                        type="text"
                        value={phoneForm.number}
                        onChange={(e) => setPhoneForm({...phoneForm, number: e.target.value})}
                        placeholder="9876543210"
                        className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                            : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Display Order
                      </label>
                      <input
                        type="number"
                        value={phoneForm.displayOrder}
                        onChange={(e) => setPhoneForm({...phoneForm, displayOrder: parseInt(e.target.value) || 0})}
                        className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                            : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                        }`}
                      />
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                      <input
                        type="checkbox"
                        id="phoneActive"
                        checked={phoneForm.isActive}
                        onChange={(e) => setPhoneForm({...phoneForm, isActive: e.target.checked})}
                        className="w-5 h-5 rounded border-2 border-gray-700 text-primary focus:ring-primary"
                      />
                      <label 
                        htmlFor="phoneActive"
                        className={`text-sm font-semibold cursor-pointer ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        Active
                      </label>
                    </div>
                  </div>
                </>
              )}

              {modalType === 'address' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Address Type *
                      </label>
                      <select
                        value={addressForm.type}
                        onChange={(e) => setAddressForm({...addressForm, type: e.target.value})}
                        className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                            : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                        }`}
                      >
                        {addressTypes.map((type) => (
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
                        Address Name *
                      </label>
                      <input
                        type="text"
                        value={addressForm.name}
                        onChange={(e) => setAddressForm({...addressForm, name: e.target.value})}
                        placeholder="Main Office"
                        className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                            : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      value={addressForm.line1}
                      onChange={(e) => setAddressForm({...addressForm, line1: e.target.value})}
                      placeholder="Street address"
                      className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                          : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      value={addressForm.line2}
                      onChange={(e) => setAddressForm({...addressForm, line2: e.target.value})}
                      placeholder="Landmark, Area"
                      className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                          : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        City *
                      </label>
                      <input
                        type="text"
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                        placeholder="City"
                        className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                            : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        State *
                      </label>
                      <input
                        type="text"
                        value={addressForm.state}
                        onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
                        placeholder="State"
                        className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                            : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        value={addressForm.postalCode}
                        onChange={(e) => setAddressForm({...addressForm, postalCode: e.target.value})}
                        placeholder="PIN Code"
                        className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                            : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Google Maps URL
                    </label>
                    <input
                      type="url"
                      value={addressForm.googleMapsUrl}
                      onChange={(e) => setAddressForm({...addressForm, googleMapsUrl: e.target.value})}
                      placeholder="https://maps.google.com/..."
                      className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                          : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                      }`}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="addressActive"
                      checked={addressForm.isActive}
                      onChange={(e) => setAddressForm({...addressForm, isActive: e.target.checked})}
                      className="w-5 h-5 rounded border-2 border-gray-700 text-primary focus:ring-primary"
                    />
                    <label 
                      htmlFor="addressActive"
                      className={`text-sm font-semibold cursor-pointer ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Active Address
                    </label>
                  </div>
                </>
              )}

              {modalType === 'hours' && (
                <>
                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Day *
                    </label>
                    <select
                      value={workingHourForm.day}
                      onChange={(e) => setWorkingHourForm({...workingHourForm, day: e.target.value})}
                      className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                          : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                      }`}
                    >
                      {days.map((day) => (
                        <option key={day.value} value={day.value}>
                          {day.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Open Time *
                      </label>
                      <input
                        type="time"
                        value={workingHourForm.openTime}
                        onChange={(e) => setWorkingHourForm({...workingHourForm, openTime: e.target.value})}
                        className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                            : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Close Time *
                      </label>
                      <input
                        type="time"
                        value={workingHourForm.closeTime}
                        onChange={(e) => setWorkingHourForm({...workingHourForm, closeTime: e.target.value})}
                        className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                            : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isClosed"
                      checked={workingHourForm.isClosed}
                      onChange={(e) => setWorkingHourForm({...workingHourForm, isClosed: e.target.checked})}
                      className="w-5 h-5 rounded border-2 border-gray-700 text-primary focus:ring-primary"
                    />
                    <label 
                      htmlFor="isClosed"
                      className={`text-sm font-semibold cursor-pointer ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Closed on this day
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Note
                    </label>
                    <input
                      type="text"
                      value={workingHourForm.note}
                      onChange={(e) => setWorkingHourForm({...workingHourForm, note: e.target.value})}
                      placeholder="e.g., Emergency only, By appointment"
                      className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                          : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                      }`}
                    />
                  </div>
                </>
              )}

              {modalType === 'social' && (
                <>
                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Platform *
                    </label>
                    <select
                      value={socialForm.platform}
                      onChange={(e) => setSocialForm({...socialForm, platform: e.target.value})}
                      className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                          : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                      }`}
                    >
                      {socialPlatforms.map((platform) => (
                        <option key={platform.value} value={platform.value}>
                          {platform.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={socialForm.displayName}
                      onChange={(e) => setSocialForm({...socialForm, displayName: e.target.value})}
                      placeholder="e.g., @bhagyashreeearthmovers"
                      className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                          : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      URL *
                    </label>
                    <input
                      type="url"
                      value={socialForm.url}
                      onChange={(e) => setSocialForm({...socialForm, url: e.target.value})}
                      placeholder="https://facebook.com/yourpage"
                      className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                          : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                      }`}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="socialActive"
                      checked={socialForm.isActive}
                      onChange={(e) => setSocialForm({...socialForm, isActive: e.target.checked})}
                      className="w-5 h-5 rounded border-2 border-gray-700 text-primary focus:ring-primary"
                    />
                    <label 
                      htmlFor="socialActive"
                      className={`text-sm font-semibold cursor-pointer ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Active
                    </label>
                  </div>
                </>
              )}

              {modalType === 'info' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Business Name *
                      </label>
                      <input
                        type="text"
                        value={basicInfoForm.businessName}
                        onChange={(e) => setBasicInfoForm({...basicInfoForm, businessName: e.target.value})}
                        className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                            : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Business Email *
                      </label>
                      <input
                        type="email"
                        value={basicInfoForm.businessEmail}
                        onChange={(e) => setBasicInfoForm({...basicInfoForm, businessEmail: e.target.value})}
                        className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                            : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Website
                    </label>
                    <input
                      type="url"
                      value={basicInfoForm.website}
                      onChange={(e) => setBasicInfoForm({...basicInfoForm, website: e.target.value})}
                      placeholder="https://example.com"
                      className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                          : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Emergency Contact
                      </label>
                      <input
                        type="text"
                        value={basicInfoForm.emergencyContact}
                        onChange={(e) => setBasicInfoForm({...basicInfoForm, emergencyContact: e.target.value})}
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                            : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Support Email
                      </label>
                      <input
                        type="email"
                        value={basicInfoForm.supportEmail}
                        onChange={(e) => setBasicInfoForm({...basicInfoForm, supportEmail: e.target.value})}
                        placeholder="support@example.com"
                        className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                            : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Sales Email
                      </label>
                      <input
                        type="email"
                        value={basicInfoForm.salesEmail}
                        onChange={(e) => setBasicInfoForm({...basicInfoForm, salesEmail: e.target.value})}
                        placeholder="sales@example.com"
                        className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                            : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        GST Number
                      </label>
                      <input
                        type="text"
                        value={basicInfoForm.gstNumber}
                        onChange={(e) => setBasicInfoForm({...basicInfoForm, gstNumber: e.target.value})}
                        placeholder="27ABCDE1234F1Z5"
                        className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                            : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      CIN Number
                    </label>
                    <input
                      type="text"
                      value={basicInfoForm.cinNumber}
                      onChange={(e) => setBasicInfoForm({...basicInfoForm, cinNumber: e.target.value})}
                      placeholder="U74999MH2020PTC123456"
                      className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                          : 'bg-gray-50 border-gray-300 text-black focus:border-primary'
                      }`}
                    />
                  </div>
                </>
              )}

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
                  className="flex-1 py-3 px-6 rounded-lg font-semibold text-white bg-primary hover:shadow-glow-orange flex items-center justify-center gap-3 transition-all disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      {editingItem ? 'Save Changes' : 'Add Item'}
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