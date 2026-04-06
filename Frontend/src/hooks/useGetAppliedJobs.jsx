import { setAllAppliedJobs } from "../redux/jobSlice";
import { APPLICATION_API_ENDPOINT } from "../utils/data.js";
import api from "@/lib/axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await api.get(`${APPLICATION_API_ENDPOINT}/get`);

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  }, [dispatch]);
};
export default useGetAppliedJobs;
