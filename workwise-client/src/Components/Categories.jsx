import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "./JobCard";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Categories = () => {
  const [jobs, setJobs] = useState([]);
  const axiosSecure = useAxiosSecure();

  // const url = "https://workwise-server.vercel.app/jobs";
  const url = "/jobs";

  useEffect(() => {
    axiosSecure.get(url)
     .then((res) => {
        setJobs(res.data);
      })
  }, [axiosSecure]);

  return (
    <div>
      <div className=" container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl ">
          Browse Jobs By Categories
        </h1>

        <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 ">
          Three categories available for the time being. They are Web
          Development, Graphics Design and Digital Marketing. Browse them by
          clicking on the tabs below.
        </p>
      </div>
      <div className="text-center mx-auto">
        <Tabs>
          <TabList>
            <Tab>Web Development</Tab>
            <Tab>Graphic Design</Tab>
            <Tab>Digital Marketing</Tab>
          </TabList>

          <TabPanel>
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {jobs.map((job) => {
                if (job.category === "Web Development") {
                  return <JobCard key={job._id} job={job} />;
                }
              })}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {jobs.map((job) => {
                if (job.category === "Graphics Design") {
                  return <JobCard key={job._id} job={job} />;
                }
              })}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {jobs.map((job) => {
                if (job.category === "Digital Marketing") {
                  return <JobCard key={job._id} job={job} />;
                }
              })}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Categories;
