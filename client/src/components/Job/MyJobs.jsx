import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () =>{
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState([]);
  const {isAuthorized, user} = useContext(Context);

  const navigateTo = useNavigate();
  // Fetching all jobs posted by an employer
  useEffect(() =>{
    const fetchJobs = async() =>{
      try {
        const {data} = await axios.get("https://jobportal-xb3i.onrender.com/api/v1/job/getmyjobs",
        {withCredentials: true});
        setMyJobs(data.myjobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if(!isAuthorized || user && user.role !== "Employer"){
    navigateTo("/");
  }

  // Function for enabling editing mode  i.e enable => updating the posted job

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  }

  // Function for disabling editing mode i.e disable => no updating the posted job
  const handleDisableEdit = (jobId) =>{
    setEditingMode(jobId);
  }

  // function for editing job
  const handleUpdateJob = async(jobId) => {
     const updatedJob = myJobs.find(job => job._id === jobId);
     await axios.put(`https://jobportal-xb3i.onrender.com/api/v1/job/update/${jobId}`, updatedJob, {
      withCredentials: true
    })
    .then(res => {
      toast.success(res.data.message);
      setEditingMode(null);
    })
    .catch(error => {
      toast.error(error.response.data.message);
    });
  };

//Function For Deleting Job
// understand the code with chatgpt
const handleDeleteJob = async (jobId) => {
  const confirmation = window.confirm("Are you sure you want to delete?");
  if (confirmation) {
    await axios
      .delete(`https://jobportal-xb3i.onrender.com/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }
};

const handleInputChange = (jobId, field, value) => {
  // Update the job object in the jobs state with the new value
  setMyJobs((prevJobs) =>
    prevJobs.map((job) =>
      job._id === jobId ? { ...job, [field]: value } : job
    )
  );
};

  return(
    <>
       <div className="myJobs page">
      <div className="container py-12">
        <h1 className="text-3xl text-center font-semibold mb-4">Your Posted Jobs</h1>
        {myJobs.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {myJobs.map((element) => (
              <div className="card p-6 px-4 mx-6 rounded-lg shadow-lg max-w-md" key={element._id}>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-gray-600">Title:</label>
                    <input
                      type="text"
                      className="w-full bg-gray-100 p-2 rounded-lg focus:outline-none"
                      disabled={editingMode !== element._id}
                      value={element.title}
                      onChange={(e) =>
                        handleInputChange(element._id, "title", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="text-gray-600">Country:</label>
                    <input
                      type="text"
                      className="w-full bg-gray-100 p-2 rounded-lg focus:outline-none"
                      disabled={editingMode !== element._id}
                      value={element.country}
                      onChange={(e) =>
                        handleInputChange(element._id, "country", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="text-gray-600">City:</label>
                    <input
                      type="text"
                      className="w-full bg-gray-100 p-2 rounded-lg focus:outline-none"
                      disabled={editingMode !== element._id}
                      value={element.city}
                      onChange={(e) =>
                        handleInputChange(element._id, "city", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="text-gray-600">Category:</label>
                    <select
                      className="w-full bg-gray-100 p-2 rounded-lg focus:outline-none"
                      value={element.category}
                      onChange={(e) =>
                        handleInputChange(element._id, "category", e.target.value)
                      }
                      disabled={editingMode !== element._id}
                    >
                      <option value="Graphics & Design">Graphics & Design</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="Frontend Web Development">Frontend Web Development</option>
                      <option value="Backend Web Development">Backend Web Development</option>
                      <option value="MERN Stack Development">MERN Stack Development</option>
                      <option value="Account & Finance">Account & Finance</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="MEAN STACK Development">MEAN STACK Development</option>
                      <option value="Video Animation">Video Animation</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      {/* Other options */}
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-600">Salary:</label>
                    {element.fixedSalary ? (
                      <input
                        type="number"
                        className="w-full bg-gray-100 p-2 rounded-lg focus:outline-none"
                        disabled={editingMode !== element._id}
                        value={element.fixedSalary}
                        onChange={(e) =>
                          handleInputChange(element._id, "fixedSalary", e.target.value)
                        }
                      />
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="number"
                          className="w-full bg-gray-100 p-2 rounded-lg focus:outline-none"
                          disabled={editingMode !== element._id}
                          value={element.salaryFrom}
                          onChange={(e) =>
                            handleInputChange(element._id, "salaryFrom", e.target.value)
                          }
                        />
                        <input
                          type="number"
                          className="w-full bg-gray-100 p-2 rounded-lg focus:outline-none"
                          disabled={editingMode !== element._id}
                          value={element.salaryTo}
                          onChange={(e) =>
                            handleInputChange(element._id, "salaryTo", e.target.value)
                          }
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-gray-600">Expired:</label>
                    <select
                      className="w-full bg-gray-100 p-2 rounded-lg focus:outline-none"
                      value={element.expired}
                      onChange={(e) =>
                        handleInputChange(element._id, "expired", e.target.value)
                      }
                      disabled={editingMode !== element._id}
                    >
                      <option value={true}>TRUE</option>
                      <option value={false}>FALSE</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  {editingMode === element._id ? (
                    <div>
                      <button
                        onClick={() => handleUpdateJob(element._id)}
                        className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-green-600 focus:outline-none"
                      >
                        <FaCheck className="mr-1" /> Update
                      </button>
                      <button
                        onClick={() => handleDisableEdit()}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none"
                      >
                        <RxCross2 className="mr-1" /> Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEnableEdit(element._id)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteJob(element._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You've not posted any job or may be you deleted all of your jobs!</p>
        )}
      </div>
    </div>
    </>
  )
}

export default MyJobs;