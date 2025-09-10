import React, { useState, useEffect } from "react";

const images = [
  "Slider-1.png",
  "Slider-2.png",
  "Slider-3.png",
  "Slider-4.png",
];

// Taglines to rotate in typing effect
const taglines = [
  "Trusted Doctors, Modern Care",
  "Advanced Treatment for Every Patient",
  "Your Health, Our Priority",
  "Healing with Heart",
];

// Colors for tagline text
const colors = [
  "text-blue-600",
  "text-green-600",
  "text-purple-600",
  "text-red-600",
];

const Welcome: React.FC = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0); // char index
  const [taglineIndex, setTaglineIndex] = useState(0); // which tagline
  const [deleting, setDeleting] = useState(false);

  // Typing effect logic
  useEffect(() => {
    const currentText = taglines[taglineIndex];
    const typingSpeed = deleting ? 70 : 120;

    const timeout = setTimeout(() => {
      if (!deleting && index < currentText.length) {
        setDisplayedText((prev) => prev + currentText[index]);
        setIndex(index + 1);
      } else if (!deleting && index === currentText.length) {
        // pause at full text
        setTimeout(() => setDeleting(true), 1200);
      } else if (deleting && index > 0) {
        setDisplayedText((prev) => prev.slice(0, -1));
        setIndex(index - 1);
      } else if (deleting && index === 0) {
        setDeleting(false);
        setTaglineIndex((prev) => (prev + 1) % taglines.length); // move to next tagline
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [index, deleting, taglineIndex]);

  // Slider state
  const [current, setCurrent] = useState(0);

  // Auto slider logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mx-[10%] my-12">
      {/* Top Welcome Line (now H2) */}
      <h1 className="text-4xl font-extrabold text-blue-700 text-center leading-tight">
       " Welcome to KamiHospital | Compassionate Healthcare"
      </h1>

      {/* Typing effect tagline with color change */}
      <h2
        className={`text-2xl text-center mt-4 min-h-[40px] transition-colors duration-500 ${
          colors[taglineIndex]
        }`}
      >
        {displayedText}
        <span className="border-r-2 border-gray-600 animate-pulse ml-1"></span>
      </h2>

      {/* Content: Info Left + Slider Right */}
      <div className="flex flex-col md:flex-row items-center gap-10 mt-12">
        {/* Left Info */}
        <div className="flex-1 text-gray-700 space-y-4">
          <h2 className="text-2xl font-bold">Everyone Knows...</h2>
          <p className="text-2xl text-bold">
            "KamiHospital is a trusted healthcare center dedicated to delivering compassionate
            care with modern medical excellence. With a team of experienced doctors,
            advanced facilities, and a patient-first approach,
            we ensure the best treatment and comfort for every individual.
            Our mission is to combine innovation with empathy, making quality healthcare accessible for all.”
          </p>
          <p className="text-2xl">
            From routine checkups to specialized treatments, we bring together
            modern technology and trusted expertise to ensure the best outcomes
            for you and your family.
          </p>
        </div>

        {/* Right Slider */}
        <div className="flex-1 relative w-full h-[450px] overflow-hidden rounded-2xl shadow-xl">
          <img
            src={images[current]}
            alt={`Slide ${current + 1}`}
            className="w-full h-full object-cover transition-all duration-700"
          />

          {/* Slider dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-3 w-3 rounded-full cursor-pointer ${
                  current === index ? "bg-blue-600" : "bg-gray-300"
                }`}
                onClick={() => setCurrent(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
