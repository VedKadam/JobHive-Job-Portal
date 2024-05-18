import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("https://jobhive-job-portal-application.onrender.com/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/login");
  }
  return (
    <>
      <section className="py-12">
        <h5 className="text-center justify-center text-3xl">All Available Jobs</h5>
        <div class="max-w-sm p-6 bg-white py-12 mx-8  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {jobs.jobs && jobs.jobs.map((element) => {
            return (
              <div key={element.id}>
                <p class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{element.title}</p>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{element.category}</p>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{element.country}</p>
                <Link to={`/job/${element._id}`} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Job Details 
                  <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </Link>
                </div>
                );
          })}

              </div>
      </section>

    </>
  )
}

export default Jobs;