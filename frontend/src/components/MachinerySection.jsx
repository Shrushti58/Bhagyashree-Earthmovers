import React, { useState } from 'react';
import { Weight, Ruler, Settings, ArrowRight, Wrench } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function MachinerySection() {
  const [hoveredMachine, setHoveredMachine] = useState(null);
  const { theme } = useTheme();

  const machinery = [
    {
      id: 1,
      name: 'JCB NXT 205 Excavator',
      description: 'Advanced hydraulic excavator with superior digging performance and fuel efficiency for heavy-duty construction projects.',
      image: './JCBEX205.jpg',
      specs: [
        { icon: Weight, label: 'Operating Weight', value: '~20.5 Tons' },
        { icon: Settings, label: 'Bucket Capacity', value: '~1.02 m³' },
        { icon: Ruler, label: 'Max Digging Depth', value: '~6.7 m' }
      ],
      bestFor: 'Heavy excavation, road construction, foundations'
    },
    {
      id: 2,
      name: 'Tata Hitachi EX 200',
      description: 'High-performance excavator engineered for infrastructure development with exceptional fuel economy and digging force.',
      image: './TataHitachiEX_210.png',
      specs: [
        { icon: Weight, label: 'Operating Weight', value: '~20 Tons' },
        { icon: Settings, label: 'High Fuel Efficiency', value: 'Yes' },
        { icon: Wrench, label: 'Strong Digging Force', value: 'Yes' }
      ],
      bestFor: 'Infrastructure projects, mining, mass excavation'
    },
    {
      id: 3,
      name: 'Hyundai R210 Excavator',
      description: 'Robust excavator with heavy-duty boom and arm design, delivering high stability for demanding excavation tasks.',
      image: './HyundaiR210.jpg',
      specs: [
        { icon: Weight, label: 'Operating Weight', value: '~21 Tons' },
        { icon: Settings, label: 'Heavy-Duty Boom & Arm', value: 'Yes' },
        { icon: Wrench, label: 'High Stability', value: 'Yes' }
      ],
      bestFor: 'Rock excavation, demolition, road projects'
    },
    {
      id: 4,
      name: 'Kubota U30 Mini Excavator',
      description: 'Compact and maneuverable mini excavator with zero tail swing, ideal for confined spaces and urban construction.',
      image: './KubotaU30.jpg',
      specs: [
        { icon: Weight, label: 'Operating Weight', value: '~3.3 Tons' },
        { icon: Settings, label: 'Zero Tail Swing', value: 'Yes' },
        { icon: Ruler, label: 'Compact & Maneuverable', value: 'Yes' }
      ],
      bestFor: 'Urban work, drainage, pipeline, confined spaces'
    },
    {
      id: 5,
      name: 'Tata Shinrai Prime',
      description: 'CEV-V compliant excavator with Cummins engine, combining high productivity with superior fuel efficiency.',
      image: './TataShinrai.jpg',
      specs: [
        { icon: Weight, label: 'Operating Weight', value: '~21 Tons' },
        { icon: Settings, label: 'CEV-V Compliant', value: 'Cummins Engine' },
        { icon: Wrench, label: 'High Productivity', value: 'Fuel Efficient' }
      ],
      bestFor: 'Highway construction, canal work, industrial excavation'
    }
  ];

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

      {/* Ambient Glow Effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 bg-primary animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 bg-primary animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 space-y-4">
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
            Modern, Reliable & High-Performance Earthmoving Equipment
          </p>
        </div>

        {/* Machinery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {machinery.map((machine) => {
            return (
              <div
                key={machine.id}
                onMouseEnter={() => setHoveredMachine(machine.id)}
                onMouseLeave={() => setHoveredMachine(null)}
                className={`group relative rounded-3xl overflow-hidden border-2 transition-all duration-700 ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-800 hover:border-primary'
                    : 'bg-white border-gray-200 hover:border-primary'
                } ${hoveredMachine === machine.id ? 'shadow-glow-orange-lg' : 'shadow-xl'}`}
              >
                {/* Image Container */}
                <div className={`relative h-72 overflow-hidden ${
                  theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-100 to-gray-200'
                }`}>
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <img
                      src={machine.image}
                      alt={machine.name}
                      className={`w-full h-full object-contain transition-all duration-700 ${
                        hoveredMachine === machine.id ? 'brightness-110' : 'brightness-100'
                      }`}
                    />
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 transition-opacity duration-700 ${
                    hoveredMachine === machine.id ? 'opacity-0' : 'opacity-100'
                  } ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-t from-gray-900/80 via-transparent to-transparent' 
                      : 'bg-gradient-to-t from-white/80 via-transparent to-transparent'
                  }`}></div>
                  
                  {/* Machine Number Badge */}
                  <div className={`absolute top-6 left-6 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-md transition-all duration-500 ${
                    hoveredMachine === machine.id
                      ? 'bg-primary shadow-glow-orange scale-110'
                      : theme === 'dark'
                      ? 'bg-gray-900/90 border-2 border-gray-700'
                      : 'bg-white/90 border-2 border-gray-300 shadow-lg'
                  }`}>
                    <span className={`text-xl font-bold transition-colors ${
                      hoveredMachine === machine.id ? 'text-brand-white' : 'text-primary'
                    }`}>
                      {String(machine.id).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Top Accent Line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-700 ${
                    hoveredMachine === machine.id ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-7 space-y-5">
                  <div className="space-y-3">
                    <h3 className={`text-xl lg:text-2xl font-bold transition-colors leading-tight ${
                      theme === 'dark' ? 'text-brand-white' : 'text-brand-black'
                    }`}>
                      {machine.name}
                    </h3>
                    
                    <p className={`text-sm leading-relaxed transition-colors ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {machine.description}
                    </p>
                  </div>

                  {/* Specifications */}
                  <div className="space-y-3">
                    {machine.specs.map((spec, idx) => {
                      const Icon = spec.icon;
                      return (
                        <div 
                          key={idx}
                          className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 ${
                            hoveredMachine === machine.id 
                              ? theme === 'dark' 
                                ? 'bg-gray-800 border-gray-700' 
                                : 'bg-gray-50 border-gray-200'
                              : theme === 'dark'
                              ? 'bg-gray-900/50 border-gray-800'
                              : 'bg-gray-50/50 border-gray-100'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                            hoveredMachine === machine.id
                              ? 'bg-primary/20 scale-110'
                              : theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                          }`}>
                            <Icon className={`w-5 h-5 transition-colors ${
                              hoveredMachine === machine.id ? 'text-primary' : 'text-primary/60'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-medium mb-0.5 transition-colors ${
                              theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                            }`}>
                              {spec.label}
                            </p>
                            <p className={`text-sm font-bold transition-colors truncate ${
                              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                            }`}>
                              {spec.value}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Best For */}
                  <div className={`pt-5 mt-5 border-t-2 transition-colors ${
                    theme === 'dark' ? 'border-gray-800' : 'border-gray-100'
                  }`}>
                    <div className="flex items-start gap-2 mb-2">
                      <div className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
                        theme === 'dark' ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'
                      }`}>
                        BEST FOR
                      </div>
                    </div>
                    <p className={`text-sm leading-relaxed transition-colors ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {machine.bestFor}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-xl transition-all duration-500 ${
                    hoveredMachine === machine.id 
                      ? 'bg-primary text-brand-white shadow-glow-orange translate-y-0'
                      : theme === 'dark'
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 translate-y-1'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 translate-y-1'
                  }`}>
                    <span className="text-sm">Contact for Availability</span>
                    <ArrowRight className={`w-5 h-5 transition-transform ${
                      hoveredMachine === machine.id ? 'translate-x-1' : ''
                    }`} />
                  </button>
                </div>

                {/* Bottom Accent Bar */}
                <div className={`absolute bottom-0 left-0 h-2 bg-gradient-to-r from-primary via-primary-light to-primary transition-all duration-700 ${
                  hoveredMachine === machine.id ? 'w-full shadow-glow-orange' : 'w-0'
                }`}></div>
              </div>
            );
          })}
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
                Need Specialized Equipment?
              </h3>
              <p className={`text-base sm:text-lg transition-colors ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Our team can arrange customized machinery solutions for your specific project requirements.
              </p>
            </div>

            <button className="group px-8 py-4 rounded-xl font-semibold text-brand-white bg-primary hover:shadow-glow-orange flex items-center gap-3 transition-all whitespace-nowrap">
              Hire This Machine
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}