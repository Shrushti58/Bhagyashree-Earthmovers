import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowRight, CheckCircle, Loader } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { API_URL } from '../config/api';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { theme } = useTheme();

  // Fallback services in case API fails
  const fallbackServices = [
    {
      id: 1,
      title: 'Excavation Work',
      description: 'Professional excavation services for foundations, trenches, and earthwork with precision and efficiency.',
      features: ['Foundation Digging', 'Trench Excavation', 'Basement Excavation', 'Soil Removal'],
      image: 'https://5.imimg.com/data5/SELLER/Default/2023/7/328210615/GH/DU/QW/13027365/tata-hitachi-ex-130-super-construction-excavator-1000x1000.jpg'
    },
    {
      id: 2,
      title: 'Land Leveling',
      description: 'Expert land grading and leveling services to prepare your site for construction or landscaping projects.',
      features: ['Site Grading', 'Ground Leveling', 'Slope Management', 'Terrain Preparation'],
      image: 'https://5.imimg.com/data5/SELLER/Default/2023/7/328281044/NY/HO/OU/13027365/tata-hitachi-shinrai-prime-backhoe-loader-1000x1000.jpg'
    },
    {
      id: 3,
      title: 'Site Preparation',
      description: 'Complete site preparation services including clearing, grading, and infrastructure setup for your project.',
      features: ['Land Clearing', 'Debris Removal', 'Site Access', 'Ground Compaction'],
      image: 'https://www.adhikaritransport.com/images/EM/EM-3.jpg'
    },
    {
      id: 4,
      title: 'Material Loading',
      description: 'Efficient material handling and loading services with modern equipment and skilled operators.',
      features: ['Bulk Loading', 'Material Transport', 'Heavy Lifting', 'Quick Turnaround'],
      image: 'https://www.tatahitachi.co.in/wp-content/uploads/2018/12/ex-200-lc-mob-banner.jpg'
    }
  ];

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(API_URL.SERVICES);
        
        // Handle different response formats
        const servicesData = Array.isArray(data) ? data : (data?.services || data?.data || []);
        
        if (servicesData.length > 0) {
          setServices(servicesData);
        } else {
          // Use fallback if no services found
          setServices(fallbackServices);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err.message);
        // Use fallback services on error
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || services.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, services.length]);

  // Loading state
  if (loading) {
    return (
      <div className={`relative py-12 lg:py-20 overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-brand-black' : 'bg-brand-white'
      }`}>
        <div className="flex justify-center items-center min-h-[500px]">
          <Loader className="w-12 h-12 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  // No services state
  if (services.length === 0) {
    return (
      <div className={`relative py-12 lg:py-20 overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-brand-black' : 'bg-brand-white'
      }`}>
        <div className="flex justify-center items-center min-h-[500px]">
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            No services available at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative py-12 lg:py-20 overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-brand-black' : 'bg-brand-white'
    }`}>
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#CC6500 1px, transparent 1px), linear-gradient(90deg, #CC6500 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Ambient Glow Effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 bg-primary animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 bg-primary animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 space-y-4">
          <div className={`inline-flex items-center px-4 py-2 rounded-full border backdrop-blur-sm mb-4 ${
            theme === 'dark' ? 'border-primary/30 bg-primary/5' : 'border-primary/30 bg-primary/5'
          }`}>
            <span className="text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase">Our Services</span>
          </div>
          
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold transition-colors ${
            theme === 'dark' ? 'text-brand-white' : 'text-brand-black'
          }`}>
            Professional Equipment
            <span className="block mt-2 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              & Expert Services
            </span>
          </h2>
          
          <p className={`text-base sm:text-lg transition-colors ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Comprehensive earthmoving solutions with modern machinery and experienced operators.
          </p>
        </div>

        {/* Premium Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-1000 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {services.map((service, idx) => (
                <div
                  key={service._id || service.id || idx}
                  onMouseEnter={() => {
                    setHoveredService(service._id || service.id || idx);
                    setIsAutoPlaying(false);
                  }}
                  onMouseLeave={() => {
                    setHoveredService(null);
                    setIsAutoPlaying(true);
                  }}
                  className="relative flex-shrink-0 w-full"
                >
                  <div className={`relative overflow-hidden rounded-3xl border transition-all duration-700 ${
                    theme === 'dark'
                      ? 'bg-gray-900/90 border-gray-800 hover:border-primary/50'
                      : 'bg-white border-gray-200 hover:border-primary/50'
                  } ${hoveredService === (service._id || service.id || idx) ? 'shadow-glow-orange-lg' : 'shadow-2xl'}`}
                  style={{ minHeight: '500px' }}>
                    
                    {/* Background Image with Parallax Effect */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div 
                        className="absolute inset-0 transition-all duration-1000 ease-out"
                        style={{
                          backgroundImage: service.image ? `url(${service.image})` : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundColor: service.image ? 'transparent' : '#1a1a1a',
                          transform: hoveredService === (service._id || service.id || idx) ? 'scale(1.1)' : 'scale(1.05)',
                          opacity: hoveredService === (service._id || service.id || idx) ? 0.3 : 0.15
                        }}
                      ></div>
                      <div className={`absolute inset-0 ${
                        theme === 'dark' 
                          ? 'bg-gradient-to-br from-brand-black/95 via-gray-900/90 to-brand-black/95' 
                          : 'bg-gradient-to-br from-brand-white/95 via-gray-50/90 to-brand-white/95'
                      }`}></div>
                    </div>

                    {/* Content Grid */}
                    <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 p-6 sm:p-8 lg:p-12 min-h-[500px]">
                      
                      {/* Left Column - Text Content */}
                      <div className="flex flex-col justify-center space-y-6">
                        {/* Number Badge */}
                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-500 ${
                          hoveredService === (service._id || service.id || idx)
                            ? 'bg-primary shadow-glow-orange scale-110 rotate-6'
                            : theme === 'dark'
                            ? 'bg-gray-800/80 backdrop-blur-sm'
                            : 'bg-gray-100 backdrop-blur-sm'
                        }`}>
                          <span className={`text-2xl font-bold transition-colors ${
                            hoveredService === (service._id || service.id || idx) ? 'text-brand-white' : 'text-primary'
                          }`}>
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <div className="space-y-4">
                          <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-bold transition-colors leading-tight ${
                            theme === 'dark' ? 'text-brand-white' : 'text-brand-black'
                          }`}>
                            {service.title}
                          </h3>

                          <p className={`text-base sm:text-lg leading-relaxed transition-colors ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {service.description}
                          </p>
                        </div>

                        {/* CTA Button */}
                        <button className={`group inline-flex items-center gap-3 font-semibold py-4 px-8 rounded-xl transition-all duration-500 self-start ${
                          hoveredService === (service._id || service.id || idx)
                            ? 'bg-primary text-brand-white shadow-glow-orange translate-x-2'
                            : theme === 'dark'
                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                          <span>Learn More</span>
                          <ArrowRight className={`w-5 h-5 transition-transform ${
                            hoveredService === (service._id || service.id || idx) ? 'translate-x-1' : ''
                          }`} />
                        </button>
                      </div>

                      {/* Right Column - Features */}
                      <div className="flex flex-col justify-center">
                        <div className="space-y-3">
                          {(service.features && service.features.length > 0 ? service.features : ['No features available']).map((feature, featureIdx) => (
                            <div 
                              key={featureIdx}
                              className={`flex items-center gap-4 p-4 rounded-2xl backdrop-blur-sm transition-all duration-500 ${
                                hoveredService === (service._id || service.id || idx)
                                  ? theme === 'dark' 
                                    ? 'bg-gray-800/80 border border-gray-700 translate-x-2' 
                                    : 'bg-white/90 border border-gray-200 translate-x-2'
                                  : theme === 'dark' 
                                  ? 'bg-gray-900/50' 
                                  : 'bg-white/50'
                              }`}
                              style={{ transitionDelay: `${featureIdx * 50}ms` }}
                            >
                              <div className={`flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 transition-all duration-500 ${
                                hoveredService === (service._id || service.id || idx)
                                  ? 'bg-primary/20 scale-110'
                                  : theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                              }`}>
                                <CheckCircle className={`w-5 h-5 transition-colors ${
                                  hoveredService === (service._id || service.id || idx) ? 'text-primary' : 'text-primary/60'
                                }`} />
                              </div>
                              <span className={`text-sm sm:text-base font-medium transition-colors ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Gradient Accents */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-700 ${
                      hoveredService === (service._id || service.id || idx) ? 'opacity-100' : 'opacity-0'
                    }`}></div>
                    
                    <div className={`absolute bottom-0 left-0 h-2 bg-gradient-to-r from-primary via-primary-light to-primary transition-all duration-700 ${
                      hoveredService === (service._id || service.id || idx) ? 'w-full shadow-glow-orange' : 'w-0'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-500 rounded-full ${
                  currentIndex === index
                    ? 'w-12 h-3 bg-primary shadow-glow-orange'
                    : 'w-3 h-3 bg-gray-400 hover:bg-primary/60 hover:w-6'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`mt-16 lg:mt-20 p-8 lg:p-12 rounded-3xl border relative overflow-hidden backdrop-blur-sm ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-gray-800'
            : 'bg-gradient-to-br from-gray-50/80 to-white/80 border-gray-200'
        }`}>
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 bg-primary"></div>
          
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center lg:text-left">
              <h3 className={`text-2xl sm:text-3xl font-bold transition-colors ${
                theme === 'dark' ? 'text-brand-white' : 'text-brand-black'
              }`}>
                Need Custom Equipment Solutions?
              </h3>
              <p className={`text-base sm:text-lg transition-colors ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Contact us for tailored earthmoving services that match your project requirements.
              </p>
            </div>

            <button className="group px-8 py-4 rounded-xl font-semibold text-brand-white bg-primary hover:shadow-glow-orange flex items-center gap-3 transition-all whitespace-nowrap">
              Get Custom Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}