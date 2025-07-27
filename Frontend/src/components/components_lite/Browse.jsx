import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import { motion } from "framer-motion";

// const randomJobs = [1, 2,45];

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div>
          <div className="max-w-7xl mx-auto my-10">
            <h1 className="font-bold text-xl my-10">
              Search Results ({allJobs.length})
            </h1>
            <div className="grid grid-cols-3 gap-4">
              {allJobs.map((job) => {
                return <Job key={job._id} job={job} />;
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Browse;
