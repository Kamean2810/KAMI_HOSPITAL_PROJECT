// BiographySection.tsx
import React from "react";

const Biography: React.FC = () => {
  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-extrabold mb-10">Biography</h2>
        <p className="text-lg  md:text-2xl text-gray-700 mb-16">
         <b>"KamiHospital is dedicated to providing the best healthcare services with a
          patient-first approach. Our team of expert doctors and staff ensures
          modern care with compassion."</b>
        </p>

        <div className="grid md:grid-cols-3 gap-30 text-left max-w-5xl mx-auto">
          <div className="bg-gray-400 p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold mb-4">Expert Medical Team</h3>
            <p className="text-black">
              Our team consists of experienced doctors and healthcare professionals
              dedicated to your well-being.
            </p>
          </div>

          <div className="bg-blue-300 p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold mb-4">Advanced Treatment</h3>
            <p className="text-black">
              We use state-of-the-art technology and modern medical practices to
              ensure accurate diagnosis and effective treatment.
            </p>
          </div>

          <div className="bg-yellow-200 p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold mb-4">Patient-Centered Care</h3>
            <p className="text-black">
              Our priority is the comfort, safety, and satisfaction of every patient
              we serve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biography;
