import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Department {
  name: string;
  imageUrl: string;
}

const Departments: React.FC = () => {
  const departmentsArray: Department[] = [
    { name: "Pediatrics", imageUrl: "/Pediaratic.jpeg" },
    { name: "Orthopedics", imageUrl: "orthopedic.jpeg" },
    { name: "Cardiology", imageUrl: "Cardiology.jpeg" },
    { name: "Neurology", imageUrl: "/Neurology.jpeg" },
    { name: "Oncology", imageUrl: "/Oncology.jpeg" },
    { name: "Radiology", imageUrl: "Radiology.jpeg" },
    { name: "Physical Therapy", imageUrl: "/Physio_Therapy.jpeg" },
    { name: "Dermatology", imageUrl: "/Dermatology.jpeg" },
    { name: "ENT", imageUrl: "/ENR.jpeg" },
  ];

  const responsive = {
    extraLarge: { breakpoint: { max: 3000, min: 1324 }, items: 4, slidesToSlide: 1 },
    large: { breakpoint: { max: 1324, min: 1005 }, items: 3, slidesToSlide: 1 },
    medium: { breakpoint: { max: 1005, min: 700 }, items: 2, slidesToSlide: 1 },
    small: { breakpoint: { max: 700, min: 0 }, items: 1, slidesToSlide: 1 },
  };

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-extrabold text-gray-700 mb-8">Departments</h2>
      <Carousel
        responsive={responsive}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {departmentsArray.map((depart, index) => (
          <div
            key={index}
            className="relative flex flex-col justify-end items-center rounded-xl overflow-hidden min-h-[360px] mx-2"
          >
            <img
              src={depart.imageUrl}
              alt={depart.name}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="bg-gray-200 text-center font-bold text-lg rounded-full py-3 px-6 relative z-10 mb-4">
              {depart.name}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Departments;
