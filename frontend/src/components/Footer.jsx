import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, ArrowRight, ChevronRight, MessageCircle, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-scroll';

export default function Footer() {
  const { theme } = useTheme();

  const services = [
    { name: 'Excavation Work', to: 'services' },
    { name: 'Land Leveling', to: 'services' },
    { name: 'Site Preparation', to: 'services' },
    { name: 'Material Loading', to: 'services' },
    { name: 'Demolition Services', to: 'services' },
    { name: 'Road Construction', to: 'services' }
  ];

  const quickLinks = [
    { name: 'About Us', to: 'home' },
    { name: 'Our Services', to: 'services' },
    { name: 'Projects', to: 'projects' },
    { name: 'Equipment', to: 'equipment' },
    { name: 'Contact Us', to: 'contact' }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us Now',
      primary: '+91 98765 43210',
      secondary: '+91 98765 43211',
      action: 'tel:+919876543210',
      btnText: 'Call Now',
      bgColor: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Us',
      primary: '+91 98765 43210',
      secondary: 'Quick Response',
      action: 'https://wa.me/919876543210',
      btnText: 'Chat Now',
      bgColor: 'bg-green-600',
      hoverColor: 'hover:bg-green-700'
    },
    {
      icon: Mail,
      title: 'Email Us',
      primary: 'info@bhagyashree.com',
      secondary: 'Quick Reply',
      action: 'mailto:info@bhagyashreeearthmovers.com',
      btnText: 'Send Email',
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    }
  ];

  const officeInfo = [
    {
      icon: MapPin,
      title: 'Office Address',
      details: ['Nagpur, Maharashtra', 'India - 440001']
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Sat: 8:00 AM - 7:00 PM', 'Sunday: Closed']
    }
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' }
  ];

  return (
    <footer className={`relative transition-colors duration-300 font-sans ${
      theme === 'dark' ? 'bg-black' : 'bg-gray-900'
    }`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#CC6500 1px, transparent 1px), linear-gradient(90deg, #CC6500 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Orange glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 bg-primary"></div>

      <div className="relative">
        {/* Quick Contact Section - NEW */}
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-2">Get In Touch</h3>
            <p className="text-gray-400">Choose your preferred way to contact us</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div 
                  key={method.title}
                  className={`relative p-6 rounded-2xl border-2 transition-all ${
                    theme === 'dark' 
                      ? 'bg-gray-900/50 border-gray-800 hover:border-primary/50' 
                      : 'bg-gray-800/50 border-gray-700 hover:border-primary/50'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-full ${method.bgColor} flex items-center justify-center mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{method.title}</h4>
                    <p className="text-gray-300 font-semibold mb-1">{method.primary}</p>
                    <p className="text-gray-400 text-sm mb-4">{method.secondary}</p>
                    <a
                      href={method.action}
                      target={method.action.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className={`w-full px-6 py-3 rounded-lg font-semibold text-white ${method.bgColor} ${method.hoverColor} flex items-center justify-center gap-2 transition-all`}
                    >
                      {method.btnText}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-800'} mx-6`}></div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="font-bold text-xl tracking-tight leading-tight text-white">BHAGYASHREE</div>
              <div className="text-xs tracking-widest font-light text-primary mb-4">EARTHMOVERS</div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your trusted partner for heavy machinery services. Delivering excellence in earthmoving operations across Maharashtra.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all ${
                        theme === 'dark'
                          ? 'bg-gray-900 border-gray-800 hover:bg-primary hover:border-primary text-gray-400 hover:text-white'
                          : 'bg-gray-800 border-gray-700 hover:bg-primary hover:border-primary text-gray-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                Our Services
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      to={service.to}
                      smooth={true}
                      duration={800}
                      offset={-80}
                      className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      smooth={true}
                      duration={800}
                      offset={-80}
                      className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Office Info */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                Office Info
              </h4>
              <div className="space-y-5">
                {officeInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <div key={info.title} className="flex gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        theme === 'dark'
                          ? 'bg-gray-900 text-primary'
                          : 'bg-gray-800 text-primary'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm mb-1">{info.title}</div>
                        {info.details.map((detail, idx) => (
                          <div key={idx} className="text-gray-400 text-sm">{detail}</div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Newsletter Section */}
        <div className={`border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-800'}`}>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h5 className="text-white font-bold text-lg mb-1">Get Project Updates</h5>
                <p className="text-gray-400 text-sm">Subscribe to our newsletter for latest projects and offers</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-primary transition-all w-full sm:w-64 ${
                    theme === 'dark'
                      ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-500'
                      : 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                  }`}
                />
                <button className="px-6 py-3 rounded-lg font-semibold text-white bg-primary hover:shadow-glow-orange flex items-center justify-center gap-2 transition-all whitespace-nowrap">
                  Subscribe
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-800'}`}>
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
              <div className="text-center md:text-left">
                © {new Date().getFullYear()} Bhagyashree Earthmovers. All rights reserved.
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-primary transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}