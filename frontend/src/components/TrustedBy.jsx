import React, { useState, useEffect, useRef } from 'react';
import { Building2, Factory, Home, MapPin, ArrowRight, ChevronLeft, ChevronRight, Calendar, Tag } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../config/api';
import { useTheme } from '../context/ThemeContext';



const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative h-64 overflow-hidden group/carousel">
      {/* Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transform group-hover/carousel:scale-110 transition-transform duration-1000 ease-out"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
      ))}

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-orange-600 hover:border-orange-600 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-orange-600 hover:border-orange-600 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'w-8 bg-orange-600' 
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Counter Animation Component
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Parse the number from end (remove any non-numeric characters except decimal point)
          const numericEnd = parseFloat(end.toString().replace(/[^\d.]/g, ''));
          const steps = 60;
          const stepDuration = duration / steps;
          const increment = numericEnd / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= numericEnd) {
              setCount(numericEnd);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, stepDuration);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [end, duration, hasAnimated]);

  // Format the display based on the suffix
  const displayValue = () => {
    if (suffix === '+') {
      return Math.floor(count) + suffix;
    } else if (suffix === '%') {
      return Math.floor(count) + suffix;
    } else {
      return Math.floor(count) + suffix;
    }
  };

  return (
    <span ref={counterRef}>
      {displayValue()}
    </span>
  );
};

export default function TrustedBy() {
   const { theme, toggleTheme } = useTheme();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL.PROJECTS);
                const projectsData = Array.isArray(response.data) 
          ? response.data 
          : (response.data.projects || response.data.data || []);
                setProjects(projectsData.slice(0, 5));
      } catch (err) {
        setError(err.message);
        console.error('Error fetching projects:', err);
        

        setProjects([
          {
            _id: '1',
            name: 'MIDC Industrial Zone',
            location: 'Nagpur, Maharashtra',
            type: 'Industrial',
            description: 'Complete site excavation and leveling for industrial complex with advanced machinery',
            year: '2024',
            images: [
              'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
              'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
              'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800'
            ]
          },
          {
            _id: '2',
            name: 'Highway Expansion Project',
            location: 'Wardha Road, Nagpur',
            type: 'Infrastructure',
            description: 'Earthmoving and grading for 15km highway expansion with precision engineering',
            year: '2023',
            images: [
              'https://images.unsplash.com/photo-1585159812596-fac104f2e069?w=800',
              'https://images.unsplash.com/photo-1621544402532-1f6cff768c76?w=800'
            ]
          },
          {
            _id: '3',
            name: 'Residential Township',
            location: 'Hingna, Nagpur',
            type: 'Residential',
            description: 'Land preparation for 200+ residential units development with modern infrastructure',
            year: '2024',
            images: [
              'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
              'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'
            ]
          },
          {
            _id: '4',
            name: 'Commercial Complex',
            location: 'Dharampeth, Nagpur',
            type: 'Commercial',
            description: 'Foundation excavation and material loading services for premium commercial space',
            year: '2023',
            images: [
              'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
            ]
          },
          {
            _id: '5',
            name: 'MIHAN Development',
            location: 'MIHAN, Nagpur',
            type: 'Industrial',
            description: 'Large-scale earthmoving for logistics park development spanning 50+ acres',
            year: '2024',
            images: [
              'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800',
              'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800'
            ]
          }
        ].slice(0, 5));
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getIconForType = (type) => {
    switch(type) {
      case 'Industrial': return Factory;
      case 'Residential': return Home;
      case 'Commercial': return Building2;
      case 'Infrastructure': return MapPin;
      default: return Building2;
    }
  };

  // Static stats with animation
  const stats = [
    { number: 300, suffix: '+', label: 'Projects Completed' },
    { number: 50, suffix: '+', label: 'Happy Clients' },
    { number:7, suffix: '+', label: 'Years Experience' },
    { number: 100, suffix: '%', label: 'Client Satisfaction' }
  ];

  return (
    <div className={`relative py-16 lg:py-24 transition-colors duration-300 font-sans ${
      theme === 'dark' ? 'bg-black' : 'bg-gray-50'
    }`}>
     

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#CC6500 1px, transparent 1px), linear-gradient(90deg, #CC6500 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Orange glow effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 bg-orange-600"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-3xl opacity-15 bg-orange-600"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className={`inline-block px-5 py-2 rounded-full border-2 mb-6 ${
            theme === 'dark' ? 'border-orange-600/30 bg-orange-600/5' : 'border-orange-600/30 bg-orange-50'
          }`}>
            <span className="text-orange-600 text-sm font-bold tracking-wider uppercase">Our Portfolio</span>
          </div>
          
          <h2 className={`text-4xl lg:text-6xl font-bold mb-4 transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            Trusted By Leading
            <span className="block bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Developers & Contractors
            </span>
          </h2>
          
          <p className={`text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed transition-colors ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            We’ve successfully completed projects across Karad, Satara, and Thane, delivering excellence in every earthmoving operation.
          </p>
        </div>

{/* Stats Grid with Animated Counters */}
<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
  {stats.map((stat, index) => (
    <div
      key={index}
      className={`relative p-8 rounded-3xl border-2 text-center overflow-hidden
        transition-all duration-300 hover:scale-105 group
        ${theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 to-gray-900/60 border-gray-800 hover:border-orange-500/60'
          : 'bg-white border-gray-200 hover:border-orange-500/60'
        }`}
    >
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="relative z-10">
        {/* Counter */}
        <div
          className={`text-4xl lg:text-5xl font-black mb-3 transition-colors duration-300
            ${theme === 'dark'
              ? 'text-white group-hover:text-orange-500'
              : 'text-black group-hover:text-orange-600'
            }`}
        >
          <AnimatedCounter
            end={stat.number}
            suffix={stat.suffix}
            duration={2500}
          />
        </div>

        {/* Label */}
        <div
          className={`text-sm font-semibold uppercase tracking-wide transition-colors duration-300
            ${theme === 'dark'
              ? 'text-white/80 group-hover:text-orange-300'
              : 'text-black/70 group-hover:text-orange-600'
            }`}
        >
          {stat.label}
        </div>
      </div>
    </div>
  ))}
</div>




        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block w-16 h-16 border-4 border-orange-600/20 border-t-orange-600 rounded-full animate-spin"></div>
            <p className={`mt-6 text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Loading projects...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className={`text-center py-10 px-8 rounded-3xl border-2 max-w-2xl mx-auto mb-12 ${
            theme === 'dark' 
              ? 'bg-red-900/20 border-red-800/50' 
              : 'bg-red-50 border-red-200'
          }`}>
            <p className="text-red-600 font-bold text-lg mb-2">Failed to load projects</p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Showing demo data instead
            </p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const Icon = getIconForType(project.type);
              return (
                <div 
                  key={project._id}
                  className={`group rounded-3xl overflow-hidden border-2 transition-all duration-500 hover:-translate-y-2 ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-br from-gray-900 to-gray-900/80 border-gray-800 hover:border-orange-600/70 hover:shadow-2xl hover:shadow-orange-600/30' 
                      : 'bg-white border-gray-200 hover:border-orange-600/70 hover:shadow-2xl hover:shadow-orange-600/20'
                  }`}
                >
                  {/* Project Image Carousel */}
                  <div className="relative">
                    <ImageCarousel images={project.images || [project.image]} />
                    
                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    
                    {/* Year Badge */}
                    <div className="absolute top-5 right-5 z-20">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-xl shadow-orange-600/50">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-bold">{project.year}</span>
                      </div>
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-5 left-5 z-20">
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border-2 shadow-lg ${
                        theme === 'dark'
                          ? 'bg-black/60 border-orange-600/40'
                          : 'bg-white/80 border-orange-600/40'
                      }`}>
                        <Icon className="w-4 h-4 text-orange-600" />
                        <span className="text-xs font-bold text-orange-600">{project.type}</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-7">
                    <div className="mb-4">
                      <h3 className={`text-2xl font-bold mb-3 transition-colors line-clamp-2 ${
                        theme === 'dark' ? 'text-white group-hover:text-orange-400' : 'text-black group-hover:text-orange-600'
                      }`}>
                        {project.name}
                      </h3>
                      <div className={`flex items-center gap-2 text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
                        <span className="font-medium">{project.location}</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className={`h-px mb-4 ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                    }`}></div>

                    <p className={`text-sm leading-relaxed line-clamp-3 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {project.description}
                    </p>

                    {/* Hover indicator */}
                    <div className="mt-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className={`h-1 flex-grow rounded-full ${
                        theme === 'dark' ? 'bg-orange-600/30' : 'bg-orange-600/20'
                      }`}></div>
                      <div className="w-2 h-2 rounded-full bg-orange-600"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}