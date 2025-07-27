import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import defaultCompanyPic from "../../assets/company.png";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const dayAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };
  return (
    <div className="p-5 rounded-md shadow-lg bg-white border border-gray-100 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
  {dayAgoFunction(job?.createdAt) === 0
    ? "Today"
    : `${dayAgoFunction(job?.createdAt)} days ago`}
</p>

        <Button variant={"outline"} className={"rounded-full"} size="icon">
          {" "}
          <Bookmark />
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
        <p>{job?.description}</p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {" "}
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
        <Button className="bg-[#6A38C2]">Save for later</Button>
      </div>
    </div>
  );
};

export default Job;
