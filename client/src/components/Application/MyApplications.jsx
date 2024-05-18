import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModel";

const MyApplication = () =>{
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("https://jobportal-xb3i.onrender.com/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("https://jobportal-xb3i.onrender.com/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = async(id) => {
    try {
      await axios
        .delete(`https://jobportal-xb3i.onrender.com/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return(
    <>
     <section className="my_applications page py-12">
      <div className="container mx-auto">
        <h1 className="text-3xl text-center font-semibold mb-6">
          {user && user.role === "Job Seeker"
            ? "My Applications"
            : "Applications From Job Seekers"}
        </h1>
        <br/>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((application) => (
            <div key={application._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-4">
                <p className="text-lg font-semibold mb-2">Name: {application.name}</p>
                <p>Email: {application.email}</p>
                <p>Phone: {application.phone}</p>
                <p>Address: {application.address}</p>
                <p>CoverLetter: {application.coverLetter}</p>
                <div className="text-center">
                  <img
                    src={application.resume.url}
                    alt="resume"
                    className="cursor-pointer mx-auto mb-4"
                    onClick={() => openModal(application.resume.url)}
                  />
                  {user?.role === "Job Seeker" && (
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => deleteApplication(application._id)}
                    >
                      Delete Application
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modalOpen && <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />}
    </section>
    </>
  )
}

export default MyApplication;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="text-lg font-semibold mb-2">Name: {element.name}</div>
        <p>Email: {element.email}</p>
        <p>Phone: {element.phone}</p>
        <p>Address: {element.address}</p>
        <p>CoverLetter: {element.coverLetter}</p>
      </div>
      <img
        src={element.resume.url}
        alt="resume"
        className="cursor-pointer mx-auto mb-4"
        onClick={() => openModal(element.resume.url)}
      />
      <div className="text-center pb-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={() => deleteApplication(element._id)}
        >
          Delete Application
        </button>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="text-lg font-semibold mb-2">Name: {element.name}</div>
        <p>Email: {element.email}</p>
        <p>Phone: {element.phone}</p>
        <p>Address: {element.address}</p>
        <p>CoverLetter: {element.coverLetter}</p>
      </div>
      <img
        src={element.resume.url}
        alt="resume"
        className="cursor-pointer mx-auto mb-4"
        onClick={() => openModal(element.resume.url)}
      />
    </div>
  );
};
