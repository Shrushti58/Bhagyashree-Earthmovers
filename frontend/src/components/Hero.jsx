// src/components/Hero.js
import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-scroll';

// Contact Information
const CONTACT_INFO = {
  phone: '+91 98765 43210',
  phoneDisplay: '+91 98765 43210',
  whatsapp: '919876543210'
};

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useTheme();

  const images = [
    'https://5.imimg.com/data5/SELLER/Default/2023/7/328210615/GH/DU/QW/13027365/tata-hitachi-ex-130-super-construction-excavator-1000x1000.jpg',
    'https://5.imimg.com/data5/SELLER/Default/2023/7/328281044/NY/HO/OU/13027365/tata-hitachi-shinrai-prime-backhoe-loader-1000x1000.jpg',
    'https://www.adhikaritransport.com/images/EM/EM-3.jpg',
    'https://www.tatahitachi.co.in/wp-content/uploads/2018/12/ex-200-lc-mob-banner.jpg',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-300 font-sans ${
      theme === 'dark' ? 'bg-black' : 'bg-gray-50'
    }`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#CC6500 1px, transparent 1px), linear-gradient(90deg, #CC6500 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Orange glow */}
      <div className="absolute top-1/4 right-0 w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl opacity-20 bg-primary"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div>
              <div className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border mb-4 ${
                theme === 'dark' ? 'border-primary/50' : 'border-primary'
              }`}>
                <span className="text-primary text-xs sm:text-sm font-semibold tracking-wide">PROFESSIONAL EARTHMOVING SERVICES</span>
              </div>
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight transition-colors ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Bhagyashree
                <span className="block mt-2 text-primary">
                  Earthmovers
                </span>
              </h1>
            </div>

            <p className={`text-base sm:text-lg leading-relaxed transition-colors ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Your trusted partner for heavy machinery services. We provide JCB and earthmoving equipment with experienced operators for construction, excavation, and infrastructure projects.
            </p>

            {/* Services List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {['Excavation Work', 'Land Leveling', 'Site Preparation', 'Material Loading'].map((service) => (
                <div key={service} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                  <span className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{service}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href={`tel:${CONTACT_INFO.phone}`}
                className="group px-6 py-3 rounded-lg font-semibold text-white bg-primary hover:shadow-glow-orange flex items-center gap-3 transition-all cursor-pointer"
              >
                <Phone className="w-5 h-5" />
                Get Quote
              </a>
              
              <Link
                to="services"
                smooth={true}
                duration={800}
                offset={-80}
                className={`px-6 py-3 rounded-lg font-semibold border-2 transition-all flex items-center gap-2 cursor-pointer ${
                  theme === 'dark' 
                    ? 'text-white border-gray-700 hover:border-primary' 
                    : 'text-black border-gray-300 hover:border-primary'
                }`}
              >
                View Services
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 sm:gap-8 pt-4">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">15+</div>
                <div className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Years Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">500+</div>
                <div className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Projects Completed</div>
              </div>
            </div>
          </div>

          {/* Right - Image Slideshow */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[500px] flex items-center justify-center animate-fade-in">
            <div className={`relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 shadow-2xl ${
              theme === 'dark' ? 'border-primary/30' : 'border-primary/50'
            }`}>
              {images.map((img, index) => (
                <div
                  key={index}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    opacity: currentSlide === index ? 1 : 0,
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all z-10 ${
                  theme === 'dark'
                    ? 'bg-black/50 border-primary/50 text-white hover:bg-primary'
                    : 'bg-white/50 border-primary text-black hover:bg-primary hover:text-white'
                }`}
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              
              <button
                onClick={nextSlide}
                className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all z-10 ${
                  theme === 'dark'
                    ? 'bg-black/50 border-primary/50 text-white hover:bg-primary'
                    : 'bg-white/50 border-primary text-black hover:bg-primary hover:text-white'
                }`}
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className="rounded-full transition-all"
                    style={{
                      background: currentSlide === index ? '#CC6500' : '#ffffff50',
                      width: currentSlide === index ? '24px' : '8px',
                      height: '8px'
                    }}
                  />
                ))}
              </div>

              {/* Image Counter */}
              <div className={`absolute top-4 sm:top-6 right-4 sm:right-6 px-2.5 sm:px-3 py-1 rounded-full backdrop-blur-sm border font-semibold text-xs sm:text-sm z-10 ${
                theme === 'dark'
                  ? 'bg-black/50 border-primary/50 text-white'
                  : 'bg-white/50 border-primary text-black'
              }`}>
                {currentSlide + 1} / {images.length}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}