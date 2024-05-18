import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Redmond, United States",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Palo Alto, United States",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Seattle, United States",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];
  return (
    <div className="companies bg-blue-100 py-12">
      <div className="container mx-auto">
        <h3 className="text-center text-3xl font-semibold mb-4">TOP COMPANIES</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mx-6">
          {companies.map((element) => {
            return (
              <div className="card flex flex-col items-center justify-between p-4 bg-white shadow-md rounded-lg" key={element.id}>
                <div className="content flex flex-col items-center">
                  <div className="icon flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
                    {element.icon}
                  </div>
                  <div className="text text-center">
                    <p className="text-lg font-semibold">{element.title}</p>
                    <p className="text-sm text-gray-600">{element.location}</p>
                  </div>
                </div>
                <br/>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                  Open Positions {element.openPositions}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
