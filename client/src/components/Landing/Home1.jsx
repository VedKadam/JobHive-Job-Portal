import React from "react";
import hero from "./hero.jpg"
import { FaSuitcase ,FaBuilding, FaUsers, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home1 = () => {
    const details = [
        {
          id: 1,
          title: "1,23,441",
          subTitle: "Live Job",
          icon: <FaSuitcase />,
        },
        {
          id: 2,
          title: "91220",
          subTitle: "Companies",
          icon: <FaBuilding />,
        },
        {
          id: 3,
          title: "2,34,200",
          subTitle: "Job Seekers",
          icon: <FaUsers />,
        },
        {
          id: 4,
          title: "1,03,761",
          subTitle: "Employers",
          icon: <FaUserPlus />,
        },
      ];

      const DetailItem = ({ title, subTitle, icon }) => {
        return (
          <div className="flex flex-col items-center mb-6 md:mb-0 md:w-1/4">
            <div className="p-4 border border-gray-300 mx-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md shadow-blue-100 md:shadow-md md:shadow-blue-400">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{title}</div>
              <div className="text-sm text-gray-700 dark:text-gray-400">{subTitle}</div>
              {icon && <div className="mt-2">{icon}</div>}
            </div>
          </div>
        );
      };
    
    return(
        <>
        <section class="text-gray-600 body-font">
        <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div class="p-8 lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Crafting Futures:
              <br class="hidden lg:inline-block" /> Where Passion Meets Proficiency
            </h1>
            <p class="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
            <div class="flex justify-center">
              <Link to={"/register"} class="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Get Started</Link>
              {/* <Link class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</Link> */}
            </div>
          </div>
          <div class="p-8 lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img class="object-cover object-center rounded" alt="hero" src={hero} />
          </div>
        </div>

        {/* card components  */}
        {/* <div className="flex justify-center "> */}
        <div className="flex flex-wrap justify-center  ">
          {details.map((detail) => (
            <DetailItem
              key={detail.id}
              title={detail.title}
              subTitle={detail.subTitle}
              icon={detail.icon}
            />
          ))}
        </div>
      </section>
      <br/>
        </>
    );

}

export default Home1;