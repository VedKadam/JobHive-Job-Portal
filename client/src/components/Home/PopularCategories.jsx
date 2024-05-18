import React from "react";
import { MdOutlineDesignServices, MdOutlineWebhook, MdAccountBalance, MdOutlineAnimation } from "react-icons/md";
import { FaReact } from "react-icons/fa";
import { TbAppsFilled } from "react-icons/tb";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const categories = [
  {
    id: 1,
    title: "Graphics & Design",
    subTitle: "305 Open Positions",
    icon: <MdOutlineDesignServices />,
  },
  {
    id: 2,
    title: "Mobile App Development",
    subTitle: "500 Open Positions",
    icon: <TbAppsFilled />,
  },
  {
    id: 3,
    title: "Frontend Web Development",
    subTitle: "200 Open Positions",
    icon: <MdOutlineWebhook />,
  },
  {
    id: 4,
    title: "MERN STACK Development",
    subTitle: "1000+ Open Positions",
    icon: <FaReact />,
  },
  {
    id: 5,
    title: "Account & Finance",
    subTitle: "150 Open Positions",
    icon: <MdAccountBalance />,
  },
  {
    id: 6,
    title: "Artificial Intelligence",
    subTitle: "867 Open Positions",
    icon: <GiArtificialIntelligence />,
  },
  {
    id: 7,
    title: "Video Animation",
    subTitle: "50 Open Positions",
    icon: <MdOutlineAnimation />,
  },
  {
    id: 8,
    title: "Game Development",
    subTitle: "80 Open Positions",
    icon: <IoGameController />,
  },
];

const Categories = () => {
  return (
    <>
    <div className="categories py-12">
      <h3 className="text-center text-3xl font-semibold mb-4">POPULAR CATEGORIES</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((element) => {
          return (
            <div className="card flex flex-col items-center justify-center p-4 bg-white shadow-md rounded-lg" key={element.id}>
              <div className="icon text-4xl">{element.icon}</div>
              <div className="text text-center mt-2">
                <p className="text-lg font-semibold">{element.title}</p>
                <p className="text-sm text-gray-600">{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <br/>
    </>
  );
};

export default Categories;
