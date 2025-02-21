import React from "react";
// import { FaCalculator, FaClock, FaCompass, FaMosque } from "react-icons/fa";
import InheritanceIcon from "../../../assets/Icons/Inheritance.svg";
import LoansIcon from "../../../assets/Icons/Loan.svg";
import OnTimeIcon from "../../../assets/Icons/On_time.svg";
import QiblaIcon from "../../../assets/Icons/Qibla.svg";
import MosqueIcon from "../../../assets/Icons/The_prophets_mosque.svg";

const Services = () => {
  const cards = [
    {
      id: 1,
      icon: (
        <img src={LoansIcon} alt="Zakat Calculator" className="w-12 h-12" />
      ),
      title: "Zakat Calculator",
    },
    {
      id: 2,
      icon: <img src={OnTimeIcon} alt="Prayer Timing" className="w-12 h-12" />,
      title: "Prayer Timing",
    },
    {
      id: 3,
      icon: (
        <img
          src={InheritanceIcon}
          alt="Inheritance Calculator"
          className="w-12 h-12"
        />
      ),
      title: "Inheritance Calculator",
    },
    {
      id: 4,
      icon: <img src={QiblaIcon} alt="Qibla Direction" className="w-12 h-12" />,
      title: "Qibla Direction",
    },
    {
      id: 5,
      icon: <img src={MosqueIcon} alt="Nearest Mosque" className="w-12 h-12" />,
      title: "Nearest Mosque",
    },
  ];

  return (
    <div className="bg-[#157347] py-10">
      <div className="text-center mb-10">
        <h2 className="uppercase text-white text-2xl lg:text-3xl font-bold">
          Islamic Tools
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="w-[80%] h-44 sm:w-44 sm:h-44  flex flex-col items-center justify-center bg-[#C9A227] rounded-lg  hover:shadow-md hover:shadow-yellow-200 transition duration-300"
          >
            <div className=" mb-4 ">{card.icon}</div>
            <p className="text-[#1E3A5F] text-base text-center">{card.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
