import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const Working = () => {
  return (
    <>
      <div className="howitworks bg-blue-100 py-12">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <h3 className="text-3xl font-semibold mb-8">How JobHive Works</h3>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="card flex flex-col items-center justify-center mx-4 my-4 p-6 bg-white shadow-md rounded-lg lg:w-64 md:w-72 sm:w-80">
              <FaUserPlus className="text-5xl mb-4 text-gray-500" />
              <p className="text-lg font-semibold mb-2">Create Account</p>
              <p className="text-sm text-gray-600">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, culpa.
              </p>
            </div>
            <div className="card flex flex-col items-center justify-center mx-4 my-4 p-6 bg-white shadow-md rounded-lg lg:w-64 md:w-72 sm:w-80">
              <MdFindInPage className="text-5xl mb-4 text-gray-500" />
              <p className="text-lg font-semibold mb-2 text-blue-400">Find a Job/Post a Job</p>
              <p className="text-sm text-gray-600">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, culpa.
              </p>
            </div>
            <div className="card flex flex-col items-center justify-center mx-4 my-4 p-6 bg-white shadow-md rounded-lg lg:w-64 md:w-72 sm:w-80">
              <IoMdSend className="text-5xl mb-4 text-gray-500" />
              <p className="text-lg font-semibold mb-2">Apply For Job/Recruit Suitable Candidates</p>
              <p className="text-sm text-gray-600">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, culpa.
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  )
}

export default Working;
