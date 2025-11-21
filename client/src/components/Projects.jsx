import React, { useState } from "react";
import { MapPin, Calendar, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    title: "Riverside Apartments Complex",
    location: "Nairobi, Kenya",
    status: "Completed",
    category: "Residential Construction",
    timeline: "Jan 2023 – Feb 2024",
    description:
      "Modern 8-story residential complex with 32 units featuring contemporary design and premium amenities.",
    image: "/image.5.jpeg",
    year: "2024",
  },
  {
    title: "Residential Building",
    location: "Kericho, Kenya",
    status: "Ongoing",
    category: "Residential Construction",
    timeline: "May 2025 – Present",
    description:
      "Ongoing construction of a new multi-story commercial building featuring modern architectural design and energy-efficient systems.",
    image: "/image.3.jpeg",
    year: "2025",
  },
  {
    title: "Uzima Plaza",
    location: "Nakuru, Kenya",
    status: "Completed",
    category: "Commercial Development",
    timeline: "Feb 2024 – Nov 2024",
    description:
      "Commercial building with retail spaces, offices, and a spacious parking facility.",
    image: "/image.1.jpeg",
    year: "2024",
  },
  {
    title: "Elgon View",
    location: "Kapsabet, Kenya",
    status: "Completed",
    category: "Residential Construction",
    timeline: "Mar 2023 – Feb 2024",
    description:
      "Luxury home construction specializing in custom mansions with premium finishes and architectural excellence.",
    image: "/image.4.jpeg",
    year: "2024",
  },
  {
    title: "Valley View Estate",
    location: "Eldoret, Kenya",
    status: "Completed",
    category: "Residential Estate Development",
    timeline: "2024– 2025",
    description:
      "Development of a modern residential estate featuring high-quality homes and landscaped environments.",
    image: "/image.2.jpeg",
    year: "2025",
  },
  {
    title: "Maraba Primary School Renovation",
    location: "Nandi, Kenya",
    status: "Completed",
    category: "Educational Infrastructure",
    timeline: "Nov 2023 - Dec 2023",
    description:
      "Renovation of classrooms and modernization of learning spaces to support student engagement and contemporary teaching methods.",
    image: "/image.6.jpeg",
    year: "2023",
  },
];

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-yellow-600">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcasing excellence through a proven track record across diverse construction projects in Kenya.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              onClick={() => setSelected(project)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="cursor-pointer group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  onError={(e) => (e.target.src = "/fallback.jpeg")}
                />

                {/* Status Badge */}
                <span
                  className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold ${
                    project.status === "Completed"
                      ? "bg-green-600 text-white"
                      : "bg-yellow-500 text-gray-900"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Text Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-yellow-600" />
                    {project.location}
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-yellow-600" />
                    {project.year}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
              >
                <X size={20} />
              </button>

              {/* Image */}
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />

              {/* Content */}
              <h2 className="text-3xl font-bold mb-2 text-gray-900">
                {selected.title}
              </h2>

              {/* Category */}
              <p className="text-yellow-600 font-semibold mb-1">
                {selected.category}
              </p>

              {/* Status */}
              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold inline-block mb-4 ${
                  selected.status === "Completed"
                    ? "bg-green-600 text-white"
                    : "bg-yellow-500 text-gray-900"
                }`}
              >
                {selected.status}
              </span>

              {/* Overview */}
              <h3 className="text-xl font-semibold mb-2">Overview</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {selected.description}
              </p>

              {/* Location and Timeline */}
              <h3 className="text-xl font-semibold mb-2">Project Details</h3>

              <div className="space-y-2 text-gray-700 mb-6">
                <p>
                  <strong>Location:</strong> {selected.location}
                </p>
                <p>
                  <strong>Timeline:</strong> {selected.timeline}
                </p>
                <p>
                  <strong>Completion Year:</strong> {selected.year}
                </p>
              </div>

              {/* View Full Project (future expandable) */}
              {/* <button className="px-5 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-medium"> */}
                {/* View Full Project */}
              {/* </button> */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
