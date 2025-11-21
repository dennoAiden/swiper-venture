import React from 'react';
import { Building2, Route, Store, GraduationCap, Package, PenTool, FileText } from 'lucide-react';

const services = [
  {
    icon: Building2,
    title: 'Residential Building Construction',
    description: 'Expert construction of modern homes, apartments, and residential complexes with attention to quality and detail.',
  },
  {
    icon: Route,
    title: 'Road Construction',
    description: 'Professional road infrastructure development, including highways, access roads, and urban street construction.',
  },
  {
    icon: Store,
    title: 'Commercial Building Construction',
    description: 'Complete commercial construction services for offices, retail spaces, warehouses, and business facilities.',
  },
  {
    icon: GraduationCap,
    title: 'Learning Institutions Construction',
    description: 'Specialized construction of schools, colleges, and educational facilities with modern learning environments.',
  },
  {
    icon: Package,
    title: 'General Supply Services',
    description: 'Comprehensive supply of quality construction materials and equipment for all project requirements.',
  },
  {
    icon: PenTool,
    title: 'CAD Design Services',
    description: 'Professional computer-aided design services for architectural and engineering project planning.',
  },
  {
    icon: FileText,
    title: 'Bill of Quantities Services',
    description: 'Accurate cost estimation and detailed bill of quantities preparation for construction projects.',
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 relative"
      style={{
        backgroundImage:
          'url(https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-yellow-900/85"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-yellow-400">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive construction and engineering solutions tailored to meet your project needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="bg-yellow-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500/30 transition-colors">
                  <Icon className="text-yellow-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
