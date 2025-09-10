import React from "react";
import WelCome from "../components/WelCome";
import Biography from "../components/Biography";
import MidelSlider from "../components/MidelSlider";
import Departments from "../components/Departments";

const Home: React.FC = () => {
  return (
      
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <WelCome />
        <Biography />
        <MidelSlider />
        <Departments />
      </main>
    </div>
  );
};

export default Home;
