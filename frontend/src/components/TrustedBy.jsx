import React from 'react';
import { Building2, Factory, Home, MapPin, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function TrustedBy() {
  const { theme } = useTheme();

  const projects = [
    {
      id: 1,
      name: 'MIDC Industrial Zone',
      location: 'Nagpur, Maharashtra',
      type: 'Industrial',
      icon: Factory,
      description: 'Complete site excavation and leveling for industrial complex',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'
    },
    {
      id: 2,
      name: 'Highway Expansion Project',
      location: 'Wardha Road, Nagpur',
      type: 'Infrastructure',
      icon: MapPin,
      description: 'Earthmoving and grading for 15km highway expansion',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1585159812596-fac104f2e069?w=800'
    },
    {
      id: 3,
      name: 'Residential Township',
      location: 'Hingna, Nagpur',
      type: 'Residential',
      icon: Home,
      description: 'Land preparation for 200+ residential units development',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800'
    },
    {
      id: 4,
      name: 'Commercial Complex',
      location: 'Dharampeth, Nagpur',
      type: 'Commercial',
      icon: Building2,
      description: 'Foundation excavation and material loading services',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
    },
    {
      id: 5,
      name: 'MIHAN Development',
      location: 'MIHAN, Nagpur',
      type: 'Industrial',
      icon: Factory,
      description: 'Large-scale earthmoving for logistics park development',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800'
    },
    {
      id: 6,
      name: 'Airport Road Project',
      location: 'Sonegaon, Nagpur',
      type: 'Infrastructure',
      icon: MapPin,
      description: 'Road widening and site preparation work',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1572105192033-8313d8c4f814?w=800'
    }
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '50+', label: 'Happy Clients' },
    { number: '15+', label: 'Years Experience' },
    { number: '100%', label: 'Client Satisfaction' }
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

      {/* Orange glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 bg-primary"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className={`inline-block px-4 py-2 rounded-full border mb-4 ${
            theme === 'dark' ? 'border-primary/50' : 'border-primary'
          }`}>
            <span className="text-primary text-sm font-semibold tracking-wide">OUR PORTFOLIO</span>
          </div>
          
          <h2 className={`text-4xl lg:text-5xl font-bold mb-4 transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            Trusted By Leading
            <span className="block text-primary">Developers & Contractors</span>
          </h2>
          
          <p className={`text-lg max-w-2xl mx-auto transition-colors ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            We've successfully completed projects across Nagpur and Maharashtra, delivering excellence in every earthmoving operation.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`p-6 rounded-2xl border-2 text-center transition-all hover:scale-105 ${
                theme === 'dark' 
                  ? 'bg-gray-900/50 border-gray-800 hover:border-primary/50' 
                  : 'bg-white border-gray-200 hover:border-primary/50'
              }`}
            >
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <div 
                key={project.id}
                className={`group rounded-2xl overflow-hidden border-2 transition-all hover:shadow-2xl ${
                  theme === 'dark' 
                    ? 'bg-gray-900/50 border-gray-800 hover:border-primary/50' 
                    : 'bg-white border-gray-200 hover:border-primary/50'
                }`}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.image})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Year Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">
                    {project.year}
                  </div>

                  {/* Icon */}
                  <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-full flex items-center justify-center border-2 backdrop-blur-sm ${
                    theme === 'dark'
                      ? 'bg-black/50 border-primary/50'
                      : 'bg-white/50 border-primary'
                  }`}>
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className={`text-xl font-bold mb-1 transition-colors ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`}>
                        {project.name}
                      </h3>
                      <div className={`flex items-center gap-2 text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </div>
                    </div>
                  </div>

                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                    theme === 'dark'
                      ? 'bg-primary/20 text-primary'
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {project.type}
                  </div>

                  <p className={`text-sm mb-4 line-clamp-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {project.description}
                  </p>

                  <button className={`flex items-center gap-2 text-sm font-semibold group/btn transition-colors ${
                    theme === 'dark'
                      ? 'text-primary hover:text-primary/80'
                      : 'text-primary hover:text-primary/80'
                  }`}>
                    View Details
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <button className="group px-8 py-4 rounded-lg font-semibold text-white bg-primary hover:shadow-glow-orange flex items-center gap-3 mx-auto transition-all">
            View All Projects
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </div>
  );
}