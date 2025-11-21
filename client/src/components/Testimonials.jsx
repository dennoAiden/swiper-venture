import React from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'David Kimani',
    position: 'Property Developer',
    company: 'Kimani Properties Ltd',
    text: 'Swiper Ventures Limited exceeded our expectations on our residential project. Their attention to detail and commitment to quality is unmatched. We completed the 32-unit apartment complex on time and within budget.',
    rating: 5,
  },
  {
    name: 'Sarah Wanjiru',
    position: 'Director',
    company: 'Greenfield Investments',
    text: 'Working with Swiper Ventures on our commercial plaza was a game-changer. Their professionalism, expertise, and ability to handle complex projects make them our go-to construction partner. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Dennis K. Bett',
    position: 'County Engineer',
    company: 'Nandi County Government',
    text: 'The road infrastructure project delivered by Swiper Ventures transformed our county connectivity. Their technical expertise and adherence to standards is exemplary. We look forward to more collaborations.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Client <span className="text-yellow-600">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by leading developers and organizations across Kenya
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-yellow-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative"
            >
              <Quote className="absolute top-6 right-6 text-yellow-500/20" size={48} />

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-500 fill-current" size={20} />
                ))}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed italic relative z-10">
                "{testimonial.text}"
              </p>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.position}</p>
                <p className="text-sm text-yellow-600 font-semibold">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
