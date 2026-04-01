import React, { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import defaultCompanyPic from "../../assets/company.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [isSaved, setIsSaved] = useState(
    user?.profile?.savedJobs?.some((savedJob) =>
      typeof savedJob === 'string' 
        ? savedJob === job?._id 
        : savedJob?._id === job?._id
    ) || false
  );

  const dayAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const saveJobHandler = async () => {
    try {
      const res = await axios.get(`${JOB_API_ENDPOINT}/saved/${job?._id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsSaved(res.data.action === "saved");
        toast.success(res.data.message);

        // Update user in redux
        let updatedSavedJobs;
        if (res.data.action === "saved") {
          updatedSavedJobs = [...(user.profile.savedJobs || []), job?._id];
        } else {
          updatedSavedJobs = user.profile.savedJobs.filter(
            (id) => (typeof id === 'string' ? id : id._id) !== job?._id
          );
        }

        const updatedUser = {
          ...user,
          profile: {
            ...user.profile,
            savedJobs: updatedSavedJobs,
          },
        };
        dispatch(setUser(updatedUser));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="p-5 rounded-md shadow-lg bg-white border border-gray-100 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {dayAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${dayAgoFunction(job?.createdAt)} days ago`}
        </p>

        <Button
          variant={"outline"}
          className={`rounded-full ${isSaved ? "bg-gray-100" : ""}`}
          size="icon"
          onClick={saveJobHandler}
        >
          <Bookmark className={isSaved ? "fill-blue-600 text-blue-600" : ""} />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={job?.company?.logo || defaultCompanyPic}
            alt={job?.company?.name || "Company"}
            className="object-cover"
          />
          <AvatarFallback>{job?.company?.name?.[0] || "C"}</AvatarFallback>
        </Avatar>

        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold"> {job?.title}</h1>
        <p className="line-clamp-2">{job?.description}</p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209B7] font-bold" variant="ghost">
          {job?.salary}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button
          onClick={saveJobHandler}
          className={`${isSaved ? "bg-blue-600" : "bg-[#6A38C2]"} text-white`}
        >
          {isSaved ? "Unsave Job" : "Save for later"}
        </Button>
      </div>
    </div>
  );
};

export default Job;
