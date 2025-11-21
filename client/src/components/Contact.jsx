import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      setLoading(false);

      if (result.success) {
        alert('Thank you! Your message has been sent.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        alert('Error: ' + result.message);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In <span className="text-yellow-600">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a project in mind? Fill the form or reach out through our contacts.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 transition-all"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 transition-all"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 transition-all"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 transition-all"
              required
            />
            <textarea
              placeholder="Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 transition-all resize-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-yellow-500 text-gray-900 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-yellow-400'
              }`}
            >
              {loading ? 'Sending...' : 'Send Message'}
              {!loading && <Send size={20} />}
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h3>

              <div className="flex items-start gap-4">
                <div className="bg-yellow-500/20 p-3 rounded-lg">
                  <Phone className="text-yellow-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                  <a href="tel:+254700000000" className="text-gray-600 hover:text-yellow-600 transition-colors">
                    +254 700 000 000
                  </a>
                  <br />
                  <a href="tel:+254701000000" className="text-gray-600 hover:text-yellow-600 transition-colors">
                    +254 701 000 000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-yellow-500/20 p-3 rounded-lg">
                  <Mail className="text-yellow-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <a href="mailto:info@swiperventures.co.ke" className="text-gray-600 hover:text-yellow-600 transition-colors">
                    info@swiperventures.co.ke
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-yellow-500/20 p-3 rounded-lg">
                  <MapPin className="text-yellow-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Office Address</h4>
                  <p className="text-gray-600">
                    Nairobi, Kenya<br />Along Mombasa Road
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-yellow-500/20 p-3 rounded-lg">
                  <Clock className="text-yellow-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Office Hours</h4>
                  <p className="text-gray-600">
                    Mon-Fri: 8 AM - 5 PM<br />
                    Sat: 9 AM - 1 PM<br />
                    Sun: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Location Map</h3>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63821.84363654468!2d36.8219462!3d-1.2920659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22c5d2f63%3A0x3948de0c9b5c2ae!2sNairobi!5e0!3m2!1sen!2ske!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Office Location"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
