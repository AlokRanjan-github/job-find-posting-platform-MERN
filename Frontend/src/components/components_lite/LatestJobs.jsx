import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-7xl mx-auto my-15">
        <h1 className="text-4xl font-bold text-center">
          {" "}
          <span className="text-[#6A38C2]"> Latest & Top</span> Job Openings
        </h1>
        <div className="grid grid-cols-3 gap-4 my-5">
          {allJobs.length > 0 ? (
            allJobs
              ?.slice(0, 6)
              .map((job) => <LatestJobCards key={job?._id} job={job} />)
          ) : (
            <span>No Job Available</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default LatestJobs;
