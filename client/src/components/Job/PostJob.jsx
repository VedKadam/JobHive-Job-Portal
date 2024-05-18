import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostJob = () =>{
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async(event) =>{
    event.preventDefault();
    if(salaryType === "Fixed Salary"){
      setSalaryFrom("");
      setSalaryTo("");
    }
    else if(salaryType === "Range Salary"){
      setFixedSalary("");
    }
    else{
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }

    await axios.post("https://jobhive-job-portal-application.onrender.com/api/v1/job/post", fixedSalary.length >= 4 ? {title, category, country, city, location, fixedSalary, description} : {title, category, country, city, location, salaryFrom, salaryTo, description}, {withCredentials: true, headers:{
      "Content-Type": "application/json",
    },})
  .then((res) => toast.success(res.data.message))
  .catch(error => {
    toast.error(error.response.data.message);
  });
  };

  const navigateTo = useNavigate();
  if(!isAuthorized || user && user.role !== "Employer"){
    navigateTo("/");
  }

  return(
    <>
       <div className="px-4 py-8 sm:px-6 lg:px-8">
      <h3 className="text-center text-3xl font-semibold mb-6">POST NEW JOB</h3>
      <form onSubmit={handleJobPost} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title"
            className="input-field"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
          >
            <option value="">Select Category</option>
            <option value="Graphics & Design">Graphics & Design</option>
            <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Frontend Web Development">
                  Frontend Web Development
                </option>
                <option value="Backend Web Development">
                Backend Web Development
                </option>
                <option value="MERN Stack Development">
                  MERN STACK Development
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">
                  MEAN STACK Development
                </option>
                <option value="MERN Stack Development">
                  MERN STACK Development
                </option>
                <option value="Digital Marketing">Digital Marketing</option>
            {/* Add more options */}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            className="input-field"
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="input-field"
          />
        </div>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="input-field"
        />
        <div className="flex items-center space-x-4">
          <select
            value={salaryType}
            onChange={(e) => setSalaryType(e.target.value)}
            className="input-field"
          >
            <option value="default">Select Salary Type</option>
            <option value="Fixed Salary">Fixed Salary</option>
            <option value="Ranged Salary">Ranged Salary</option>
          </select>
          {salaryType === "Fixed Salary" ? (
            <input
              type="number"
              placeholder="Enter Fixed Salary"
              value={fixedSalary}
              onChange={(e) => setFixedSalary(e.target.value)}
              className="input-field"
            />
          ) : salaryType === "Ranged Salary" ? (
            <>
              <input
                type="number"
                placeholder="Salary From"
                value={salaryFrom}
                onChange={(e) => setSalaryFrom(e.target.value)}
                className="input-field"
              />
              <input
                type="number"
                placeholder="Salary To"
                value={salaryTo}
                onChange={(e) => setSalaryTo(e.target.value)}
                className="input-field"
              />
            </>
          ) : null}
        </div>
        <textarea
          rows="6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Job Description"
          className="input-field"
        />
        <br/>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Create Job
        </button>
      </form>
    </div>
    </>
  )
}

export default PostJob;