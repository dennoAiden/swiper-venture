import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {  // <-- removed ": string"
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/image.png" alt="Swiper Ventures Limited" className="h-12 w-auto" />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {['home', 'services', 'projects', 'testimonials'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`font-medium transition-colors ${
                  isScrolled ? 'text-gray-700 hover:text-yellow-600' : 'text-white hover:text-yellow-400'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg"
            >
              Contact Us
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? 'text-gray-900' : 'text-white'} size={28} />
            ) : (
              <Menu className={isScrolled ? 'text-gray-900' : 'text-white'} size={28} />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 bg-white rounded-lg shadow-xl p-6 space-y-4">
            {['home', 'services', 'projects', 'testimonials'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left text-gray-700 hover:text-yellow-600 font-medium py-2"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all"
            >
              Contact Us
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
