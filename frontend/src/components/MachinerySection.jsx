import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Phone, MessageCircle, Loader, CheckCircle2, XCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { API_URL } from '../config/api';
import MachinerySkeleton from './MachinerySkeleton';

export default function MachinerySection() {
  const [hoveredMachine, setHoveredMachine] = useState(null);
  const [machinery, setMachinery] = useState([]);
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactLoading, setContactLoading] = useState(true);
  const { theme } = useTheme();

  // Fallback machinery with enhanced data
  const fallbackMachinery = [
    {
      id: 1,
      name: 'JCB NXT 205 Excavator',
      category: 'Excavator',
      image: './JCBEX205.jpg',
      available: true,
      hourlyRate: '₹2,500',
      bestFor: 'Large excavation, foundation work, heavy lifting'
    },
    {
      id: 2,
      name: 'Tata Hitachi EX 200',
      category: 'Excavator',
      image: './TataHitachiEX_210.png',
      available: true,
      hourlyRate: '₹2,200',
      bestFor: 'Road construction, mining, material handling'
    },
    {
      id: 3,
      name: 'Hyundai R210',
      category: 'Excavator',
      image: './HyundaiR210.jpg',
      available: false,
      hourlyRate: '₹2,400',
      bestFor: 'Heavy-duty excavation, demolition, trenching'
    },
    {
      id: 4,
      name: 'Kubota U30 Mini',
      category: 'Mini Excavator',
      image: './KubotaU30.jpg',
      available: true,
      hourlyRate: '₹1,200',
      bestFor: 'Urban construction, landscaping, tight spaces'
    },
  ];

  // Fetch contact info from API
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setContactLoading(true);
        const { data } = await axios.get(API_URL.CONTACT_INFO);
        setContactInfo(data);
      } catch (err) {
        console.error('Error fetching contact info:', err);
        // Use fallback contact info
        setContactInfo({
          phones: [
            { type: 'primary', number: '8208584646', countryCode: '+91', isActive: true },
            { type: 'whatsapp', number: '8208584646', countryCode: '+91', isActive: true }
          ]
        });
      } finally {
        setContactLoading(false);
      }
    };
    fetchContactInfo();
  }, []);

  // Fetch machinery from API
  useEffect(() => {
    const fetchMachinery = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(API_URL.EQUIPMENT);
        const machineryData = Array.isArray(data) ? data : (data?.equipment || data?.data || []);
        setMachinery(machineryData.length > 0 ? machineryData : fallbackMachinery);
      } catch (err) {
        console.error('Error fetching machinery:', err);
        setMachinery(fallbackMachinery);
      } finally {
        setLoading(false);
      }
    };
    fetchMachinery();
  }, []);

  // Get contact numbers from API
  const getContactNumbers = () => {
    if (!contactInfo?.phones || contactLoading) {
      return {
        phone: '+918208584646',
        whatsapp: '+918208584646',
      };
    }

    const activePhones = contactInfo.phones.filter(phone => phone.isActive);
    
    const primaryPhone = activePhones.find(phone => phone.type === 'primary') || activePhones[0];
    const whatsappPhone = activePhones.find(phone => phone.type === 'whatsapp') || primaryPhone;

    return {
      phone: `${primaryPhone?.countryCode || '+91'}${primaryPhone?.number || '8208584646'}`.replace(/\s/g, ''),
      whatsapp: `${whatsappPhone?.countryCode || '+91'}${whatsappPhone?.number || '8208584646'}`.replace(/\s/g, '')
    };
  };

  // Get contact info dynamically
  const CONTACT_CONFIG = getContactNumbers();

  const handleWhatsAppBooking = (machine) => {
    const message = `Hi! I'm interested in booking *${machine.name}* (${machine.category || 'Equipment'}).\n\nHourly Rate: ${machine.hourlyRate || 'Contact for pricing'}\n\nPlease provide availability details.`;
    const whatsappUrl = `https://wa.me/${CONTACT_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePhoneCall = (machine) => {
    window.location.href = `tel:${CONTACT_CONFIG.phone}`;
  };

  if (loading || contactLoading) {
  return <MachinerySkeleton />;
}

  return (
    <div className={`relative py-12 lg:py-20 overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-brand-black' : 'bg-brand-white'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#CC6500 1px, transparent 1px), linear-gradient(90deg, #CC6500 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className={`inline-flex items-center px-4 py-2 rounded-full border backdrop-blur-sm mb-4 ${
            theme === 'dark' ? 'border-primary/30 bg-primary/5' : 'border-primary/30 bg-primary/5'
          }`}>
            <span className="text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase">Our Fleet</span>
          </div>
          
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold transition-colors ${
            theme === 'dark' ? 'text-brand-white' : 'text-brand-black'
          }`}>
            Available Machinery
          </h2>
          
          <p className={`text-base sm:text-lg transition-colors ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Modern, Reliable & High-Performance Equipment
          </p>
        </div>

        {/* Enhanced Machinery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {machinery.map((machine, index) => {
            const machineId = machine._id || machine.id || index;
            const isAvailable = machine.available !== false;
            
            return (
              <div
                key={machineId}
                onMouseEnter={() => setHoveredMachine(machineId)}
                onMouseLeave={() => setHoveredMachine(null)}
                className={`group relative rounded-xl overflow-hidden border transition-all duration-500 ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-800 hover:border-primary/50'
                    : 'bg-white border-gray-200 hover:border-primary/50'
                } ${hoveredMachine === machineId ? 'shadow-glow-orange transform -translate-y-1' : 'shadow-lg'}`}
              >
                {/* Image */}
                <div className={`relative h-64 overflow-hidden ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <img
                    src={machine.image}
                    alt={machine.name}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      hoveredMachine === machineId ? 'scale-105' : 'scale-100'
                    } ${!isAvailable ? 'grayscale opacity-50' : ''}`}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Equipment';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold backdrop-blur-sm ${
                      isAvailable
                        ? 'bg-green-500/90 text-white'
                        : 'bg-gray-700/90 text-gray-300'
                    }`}>
                      {isAvailable ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Available
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          Booked
                        </>
                      )}
                    </div>
                  </div>

                  {/* Category */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 backdrop-blur-md text-white border border-white/20">
                      {machine.category || 'Heavy Equipment'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="space-y-2">
                    <h3 className={`font-bold text-xl leading-tight transition-colors ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {machine.name}
                    </h3>
                  </div>

                  {/* Best For */}
                  {machine.bestFor && (
                    <div className={`p-4 rounded-lg transition-colors ${
                      theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                    }`}>
                      <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
                        theme === 'dark' ? 'text-primary' : 'text-primary'
                      }`}>
                        Ideal For
                      </p>
                      <p className={`text-sm leading-relaxed ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {machine.bestFor}
                      </p>
                    </div>
                  )}

                  {/* Pricing */}
                  {machine.hourlyRate && (
                    <div className={`flex items-baseline gap-2 pt-2 border-t ${
                      theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                    }`}>
                      <span className="text-3xl font-bold text-primary">
                        {machine.hourlyRate}
                      </span>
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        per hour
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {isAvailable ? (
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => handleWhatsAppBooking(machine)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg font-semibold text-sm text-white bg-green-600 hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Book via WhatsApp
                      </button>
                      <button
                        onClick={() => handlePhoneCall(machine)}
                        className="px-4 py-3.5 rounded-lg font-semibold text-sm text-white bg-primary hover:bg-primary/90 transition-all shadow-md hover:shadow-glow-orange"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      disabled
                      className={`w-full px-4 py-3.5 rounded-lg font-semibold text-sm transition-colors ${
                        theme === 'dark'
                          ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Currently Unavailable
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`mt-12 p-6 rounded-2xl border relative overflow-hidden ${
          theme === 'dark'
            ? 'bg-gray-900/80 border-gray-800'
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className={`text-xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Need Help Choosing Equipment?
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Our experts can help you select the perfect machinery for your project.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.open(`https://wa.me/${CONTACT_CONFIG.whatsapp}?text=${encodeURIComponent('Hi! I need help choosing the right equipment for my project.')}`, '_blank')}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Chat Now
              </button>
              <button
                onClick={() => window.location.href = `tel:${CONTACT_CONFIG.phone}`}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-primary hover:shadow-glow-orange transition-all"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}