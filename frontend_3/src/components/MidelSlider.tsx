import React, { useState, useEffect } from "react";

const images = [
  "/Slider-5.jpeg",
  "/Slider-6.jpeg",
  "/Slider-7.jpeg",
];

const MidelSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (images.length === 0) {
    return <div className="text-center py-10">No images to display.</div>;
  }

  return (
    <div
      className="relative mx-auto select-none"
      style={{
        paddingLeft: "5%",
        paddingRight: "5%",
        maxWidth: "90vw",
      }}
    >
      {/* Slider container */}
      <div
        className="relative overflow-hidden rounded-2xl shadow-lg"
        style={{ height: 600 }}
      >
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover rounded-2xl transition-opacity duration-400 ${
              idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            draggable={false}
            style={{ userSelect: "none" }}
          />
        ))}
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center mt-4 space-x-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`h-3 w-3 rounded-full focus:outline-none cursor-pointer ${
              idx === current ? "bg-blue-600" : "bg-gray-300"
            }`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setCurrent(idx);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MidelSlider;
