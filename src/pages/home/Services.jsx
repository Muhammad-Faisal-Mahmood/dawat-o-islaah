import React from "react";
import { FaCalculator, FaClock, FaCompass, FaMosque } from "react-icons/fa";

const Services = () => {
  const cards = [
    { id: 1, icon: <FaCalculator size={32} />, title: "Zakat Calculator" },
    {
      id: 2,
      icon: <FaCalculator size={32} />,
      title: "Inheritance Calculator",
    },
    { id: 3, icon: <FaCompass size={32} />, title: "Qibla Direction" },
    {
      id: 4,
      icon: <FaClock size={32} />,
      title: "Namaz Timing",
    },
    { id: 5, icon: <FaMosque size={32} />, title: "Nearest Mosque" },
  ];

  return (
    <div className="bg-gradient-to-r from-green-900 to-green-500 py-10">
      <div className="text-center mb-20 mt-5">
        <h2 className="text-white text-2xl lg:text-3xl font-bold">
          A Helping Hand in the Times of Need
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="w-40 h-40  flex flex-col items-center justify-center bg-transparent border border-white rounded-lg  hover:shadow-md hover:shadow-white transition duration-300"
          >
            <div className="text-yellow-300 mb-2 ">{card.icon}</div>
            <p className="text-white text-sm text-center">{card.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
