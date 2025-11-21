import { ArrowRight, Award, Users, Building2 } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/70"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-4xl text-center md:text-left">
          {/* Badge */}
          <div className="inline-block mb-4">
            <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-500/30">
              NCA Registered Contractor
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Building Kenya's Future{' '}
            <span className="text-yellow-400">One Project at a Time</span>
          </h1>

          {/* Paragraph */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto md:mx-0">
            Premier construction and civil engineering solutions across Kenya. From residential
            buildings to road infrastructure, we deliver excellence with every project.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-12">
            <button
              onClick={() => scrollToSection('contact')}
              className="group bg-yellow-500 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
            >
              Request a Quote
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all border border-white/30 flex items-center justify-center gap-2"
            >
              View Our Portfolio
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-center sm:text-left">
              <Award className="text-yellow-400 mb-3 mx-auto sm:mx-0" size={36} />
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">50+</h3>
              <p className="text-gray-300">Completed Projects</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-center sm:text-left">
              <Users className="text-yellow-400 mb-3 mx-auto sm:mx-0" size={36} />
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">100+</h3>
              <p className="text-gray-300">Satisfied Clients</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-center sm:text-left">
              <Building2 className="text-yellow-400 mb-3 mx-auto sm:mx-0" size={36} />
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">15+</h3>
              <p className="text-gray-300">Years Experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10"></div>
    </section>
  );
}
