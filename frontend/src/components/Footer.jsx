import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, ArrowRight, MessageCircle, Send, CheckCircle, Globe, Building, Shield, Users, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import { API_URL } from '../config/api';

export default function EnhancedFooter() {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const services = [
    { name: 'Excavation Work', id: 'services' },
    { name: 'Land Leveling', id: 'services' },
    { name: 'Site Preparation', id: 'services' },
    { name: 'Material Loading', id: 'services' },
    { name: 'Demolition Services', id: 'services' },
    { name: 'Road Construction', id: 'services' }
  ];

  const quickLinks = [
    { name: 'About Us', id: 'home' },
    { name: 'Our Services', id: 'services' },
    { name: 'Projects', id: 'projects' },
    { name: 'Equipment', id: 'equipment' },
    { name: 'Contact Us', id: 'contact' }
  ];

  useEffect(() => {
    fetchContactInfo();
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId, event) => {
    if (event) event.preventDefault();
    
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_URL.CONTACT_INFO);
      setContactInfo(data);
    } catch (err) {
      console.error('Failed to fetch contact info:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPrimaryPhone = () => {
    if (!contactInfo?.phones) return '+91 7620382150';
    const primaryPhone = contactInfo.phones.find(phone => phone.type === 'primary' && phone.isActive);
    return primaryPhone ? `${primaryPhone.countryCode || '+91'} ${primaryPhone.number}` : '+91 7620382150';
  };

  const getWhatsAppPhone = () => {
    if (!contactInfo?.phones) return '917620382150';
    const whatsappPhone = contactInfo.phones.find(phone => phone.type === 'whatsapp' && phone.isActive);
    return whatsappPhone ? whatsappPhone.number.replace(/\D/g, '') : '917620382150';
  };

  const getBusinessEmail = () => {
    return contactInfo?.businessEmail || 'bhagyashreeearthmovers@gmail.com';
  };

  const getMainAddress = () => {
    if (!contactInfo?.addresses) return 'Karad, Maharashtra';
    const mainAddress = contactInfo.addresses.find(addr => addr.type === 'main' && addr.isActive);
    if (!mainAddress) return 'Karad, Maharashtra';
    
    return {
      line1: mainAddress.line1,
      line2: mainAddress.line2 || 'India - 415108',
      mapsUrl: mainAddress.googleMapsUrl || 'https://maps.google.com'
    };
  };

  const getWorkingHours = () => {
    if (!contactInfo?.workingHours) {
      return {
        weekday: 'Mon - Sat: 8:00 AM - 8:00 PM',
        weekend: 'Sunday: By Appointment'
      };
    }
    
    const formattedHours = {
      monday: null, tuesday: null, wednesday: null, thursday: null, 
      friday: null, saturday: null, sunday: null
    };
    
    contactInfo.workingHours.forEach(hour => {
      if (!hour.isClosed) {
        formattedHours[hour.day] = `${hour.openTime} - ${hour.closeTime}`;
      }
    });
    
    // Create readable format
    const weekdayHours = formattedHours.monday || '8:00 AM - 8:00 PM';
    const weekendHours = formattedHours.sunday === null ? 'By Appointment' : formattedHours.sunday;
    
    return {
      weekday: `Mon - Sat: ${weekdayHours}`,
      weekend: `Sunday: ${weekendHours}`
    };
  };

  const getSocialLinks = () => {
    if (!contactInfo?.socialMedia) {
      return [
        { icon: Facebook, label: 'Facebook', href: '#', color: 'hover:bg-blue-600' },
        { icon: Twitter, label: 'Twitter', href: '#', color: 'hover:bg-sky-500' },
        { icon: Instagram, label: 'Instagram', href: '#', color: 'hover:bg-pink-600' },
        { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'hover:bg-blue-700' }
      ];
    }
    
    const iconMap = {
      'facebook': Facebook,
      'twitter': Twitter,
      'instagram': Instagram,
      'linkedin': Linkedin,
      'youtube': Globe,
      'whatsapp': MessageCircle,
      'telegram': MessageSquare
    };
    
    return contactInfo.socialMedia
      .filter(social => social.isActive)
      .map(social => ({
        icon: iconMap[social.platform] || Globe,
        label: social.platform.charAt(0).toUpperCase() + social.platform.slice(1),
        href: social.url,
        color: social.platform === 'facebook' ? 'hover:bg-blue-600' :
               social.platform === 'twitter' ? 'hover:bg-sky-500' :
               social.platform === 'instagram' ? 'hover:bg-pink-600' :
               social.platform === 'linkedin' ? 'hover:bg-blue-700' :
               'hover:bg-gray-600'
      }));
  };

  const getEmergencyContact = () => {
    if (!contactInfo?.phones) return getPrimaryPhone();
    const emergencyPhone = contactInfo.phones.find(phone => phone.type === 'emergency' && phone.isActive);
    return emergencyPhone ? `${emergencyPhone.countryCode || '+91'} ${emergencyPhone.number}` : getPrimaryPhone();
  };

  const getSupportEmail = () => {
    return contactInfo?.supportEmail || getBusinessEmail();
  };

  // Event handlers for contact actions with pre-written messages
  const handlePhoneCall = () => {
    const phoneNumber = getPrimaryPhone().replace(/\s/g, '');
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    const whatsappNumber = getWhatsAppPhone();
    const message = `Hi! I'm interested in your earthmoving services. I found your contact from your website and would like to:\n\n• Get a quote for my project\n• Discuss equipment availability\n• Learn more about your services\n\nPlease share more information about your services and pricing.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmail = () => {
    const email = getBusinessEmail();
    const subject = "Inquiry About Earthmoving Services - From Website";

    const body =
      "Dear Bhagyashree Earthmovers Team,\n\n" +
      "I am interested in your earthmoving services and would like to request:\n\n" +
      "1. A quotation for my project\n" +
      "2. Information about equipment availability\n" +
      "3. Details about your service packages\n\n" +
      "Thank you,\n" +
      "[Your Name]";

    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=${encodeURIComponent(email)}` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank");
  };

  const handleEmergencyCall = () => {
    const emergencyNumber = getEmergencyContact().replace(/\s/g, '');
    window.location.href = `tel:${emergencyNumber}`;
  };

  const handleViewOnMap = () => {
    const address = getMainAddress();
    window.open(address.mapsUrl, '_blank');
  };

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  if (loading) {
    return (
      <footer className={`relative transition-colors duration-300 font-sans ${
        theme === 'dark' ? 'bg-black' : 'bg-gray-900'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded mb-8 w-1/3 mx-auto"></div>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-40 bg-gray-800 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  const primaryPhone = getPrimaryPhone();
  const businessEmail = getBusinessEmail();
  const address = getMainAddress();
  const workingHours = getWorkingHours();
  const socialLinks = getSocialLinks();
  const emergencyContact = getEmergencyContact();

  return (
    <footer className={`relative transition-colors duration-300 font-sans ${
      theme === 'dark' ? 'bg-black' : 'bg-gray-900'
    }`}>
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-900/5"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Simple Contact Section */}
        <div className="px-4 sm:px-6 pt-12 pb-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need Help? Contact Us Today
            </h3>
            <p className="text-gray-400 text-lg">
              We're here to help with all your earthmoving needs
            </p>
          </div>
          
          {/* Simple Contact Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {/* Phone Card */}
            <div
              onClick={handlePhoneCall}
              className="group bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-xl mb-2">Call Us</h4>
                  <p className="text-gray-400 text-sm">Speak directly with our team</p>
                </div>
              </div>
              <div className="text-white font-semibold text-lg mb-2">{primaryPhone}</div>
              <div className="text-orange-400 text-sm font-medium inline-flex items-center gap-2">
                Call Now <ArrowRight className="w-4 h-4" />
              </div>
              <div className="mt-3 text-xs text-gray-500">Available 24/7</div>
            </div>

            {/* WhatsApp Card */}
            <div
              onClick={handleWhatsApp}
              className="group bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:bg-green-500/10 hover:border-green-500/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-xl mb-2">WhatsApp</h4>
                  <p className="text-gray-400 text-sm">Chat instantly with photos</p>
                </div>
              </div>
              <div className="text-white font-semibold text-lg mb-2">Quick Response</div>
              <div className="text-green-400 text-sm font-medium inline-flex items-center gap-2">
                Start Chat <ArrowRight className="w-4 h-4" />
              </div>
              <div className="mt-3 text-xs text-gray-500">Fastest way to connect</div>
            </div>

            {/* Email Card */}
            <div
              onClick={handleEmail}
              className="group bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-xl mb-2">Email Us</h4>
                  <p className="text-gray-400 text-sm">For detailed inquiries & quotes</p>
                </div>
              </div>
              <div className="text-white font-semibold text-lg mb-2 break-all">{businessEmail}</div>
              <div className="text-blue-400 text-sm font-medium inline-flex items-center gap-2">
                Send Email <ArrowRight className="w-4 h-4" />
              </div>
              <div className="mt-3 text-xs text-gray-500">24hr response time</div>
            </div>
          </div>

          {/* Office Information */}
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-2">Office Location</h5>
                  <p className="text-gray-400 text-sm">{address.line1}</p>
                  <p className="text-gray-400 text-sm">{address.line2}</p>
                  <button
                    onClick={handleViewOnMap}
                    className="text-orange-400 text-sm font-medium mt-2 inline-block hover:underline focus:outline-none"
                  >
                    View on Map →
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-2">Working Hours</h5>
                  <p className="text-gray-400 text-sm">{workingHours.weekday}</p>
                  <p className="text-gray-400 text-sm">{workingHours.weekend}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="px-6 py-12 border-t border-gray-800">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <div className="font-bold text-2xl tracking-tight text-white">
                  {contactInfo?.businessName?.toUpperCase() || 'BHAGYASHREE'}
                </div>
                <div className="text-xs tracking-widest font-light text-orange-500 mb-4">EARTHMOVERS</div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your trusted partner for heavy machinery services. Delivering excellence in earthmoving operations across Maharashtra.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <button
                      onClick={(e) => scrollToSection(service.id, e)}
                      className="text-gray-400 hover:text-orange-500 transition-colors block py-1 w-full text-left focus:outline-none"
                    >
                      {service.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={(e) => scrollToSection(link.id, e)}
                      className="text-gray-400 hover:text-orange-500 transition-colors block py-1 w-full text-left focus:outline-none"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Emergency Contact */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Emergency Contact</h4>
              <div className="bg-gray-800/50 rounded-xl p-5 border border-orange-500/30">
                <div className="text-orange-500 font-semibold text-sm mb-2">24/7 Available</div>
                <button
                  onClick={handleEmergencyCall}
                  className="text-white font-bold text-xl mb-3 block hover:text-orange-500 transition-colors text-left w-full focus:outline-none"
                >
                  {emergencyContact}
                </button>
                <p className="text-gray-400 text-sm mb-4">For urgent equipment needs</p>
                <button
                  onClick={handleEmergencyCall}
                  className="w-full px-4 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors text-center focus:outline-none"
                >
                  Call Now
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-400">
            <div className="text-center md:text-left">
              © {new Date().getFullYear()} {contactInfo?.businessName || 'Bhagyashree Earthmovers'}. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Import missing icon
const MessageSquare = MessageCircle;