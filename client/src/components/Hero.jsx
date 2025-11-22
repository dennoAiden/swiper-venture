import { ArrowRight, Award, Users, Building2 } from "lucide-react";

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left space-y-6">
            {/* Badge */}
            <span className="inline-block bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-xs sm:text-sm border border-yellow-500/30">
              ✔ NCA Registered Contractor
            </span>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight">
              Transforming Kenya’s{" "}
              <span className="text-yellow-400">Infrastructure</span>
              <br className="hidden md:block" />
              With Excellence
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0">
              High-quality construction, engineering, and civil works —
              delivering innovation and reliability across Kenya.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection("contact")}
                className="group bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold text-base sm:text-lg shadow-lg hover:bg-yellow-400 transition-all flex items-center justify-center gap-2"
              >
                Request a Quote
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection("projects")}
                className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-lg font-semibold text-base sm:text-lg backdrop-blur-md hover:bg-white/20 transition-all"
              >
                View Portfolio
              </button>
            </div>
          </div>

          {/* RIGHT STATS */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {/* Each stat card */}
            {[
              { icon: Award, value: "50+", label: "Projects" },
              { icon: Users, value: "100+", label: "Clients" },
              { icon: Building2, value: "15+", label: "Years Experience" },
              { icon: ArrowRight, value: "Nationwide", label: "Coverage" },
            ].map(({ icon: Icon, value, label }, i) => (
              <div
                key={i}
                className="bg-white/10 p-5 sm:p-6 rounded-xl text-center border border-white/20 backdrop-blur-md"
              >
                <Icon className="text-yellow-300 mx-auto mb-2 sm:mb-3" size={30} />
                <h3 className="text-xl sm:text-2xl font-bold text-white">{value}</h3>
                <p className="text-gray-300 text-xs sm:text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
