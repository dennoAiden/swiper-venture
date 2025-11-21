import { Building2, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => { // removed ": string"
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="/image.png" alt="Swiper Ventures Limited" className="h-12 w-auto" />
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Leading construction and civil engineering company delivering excellence across Kenya.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Building2 size={16} className="text-yellow-500" />
              <span>NCA Registered Contractor</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Our Services</h3>
            <ul className="space-y-3 text-gray-400">
              <li>Residential Construction</li>
              <li>Road Construction</li>
              <li>Commercial Buildings</li>
              <li>Educational Facilities</li>
              <li>General Supply</li>
              <li>CAD Design</li>
              <li>Bill of Quantities</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="text-yellow-500 mt-1 flex-shrink-0" size={18} />
                <div>
                  <a href="tel:+254700000000" className="text-gray-400 hover:text-yellow-400 transition-colors block">
                    +254 700 000 000
                  </a>
                  <a href="tel:+254701000000" className="text-gray-400 hover:text-yellow-400 transition-colors block">
                    +254 701 000 000
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-yellow-500 mt-1 flex-shrink-0" size={18} />
                <a href="mailto:info@swiperventures.co.ke" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  info@swiperventures.co.ke
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-yellow-500 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-400">
                  Nairobi, Kenya<br />
                  Along Mombasa Road
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {currentYear} Swiper Ventures Limited. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm text-center md:text-right">
              Supply and All Civil Engineering Works
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
