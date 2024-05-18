import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`https://jobhive-job-portal-application.onrender.com/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, [id, navigateTo]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Job Details</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="font-semibold">Title:</p>
                <p>{job.title}</p>
              </div>
              <div>
                <p className="font-semibold">Category:</p>
                <p>{job.category}</p>
              </div>
              <div>
                <p className="font-semibold">Country:</p>
                <p>{job.country}</p>
              </div>
              <div>
                <p className="font-semibold">City:</p>
                <p>{job.city}</p>
              </div>
              <div>
                <p className="font-semibold">Location:</p>
                <p>{job.location}</p>
              </div>
              <div>
                <p className="font-semibold">Description:</p>
                <p>{job.description}</p>
              </div>
              <div>
                <p className="font-semibold">Job Posted On:</p>
                <p>{job.jobPostedOn}</p>
              </div>
              <div>
                <p className="font-semibold">Salary:</p>
                <p>
                  {job.fixedSalary ? (
                    <span>{job.fixedSalary}</span>
                  ) : (
                    <span>
                      {job.salaryFrom} - {job.salaryTo}
                    </span>
                  )}
                </p>
              </div>
              {user && user.role === "Employer" ? (
                <></>
              ) : (
                <Link
                  to={`/application/${job._id}`}
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Apply Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
