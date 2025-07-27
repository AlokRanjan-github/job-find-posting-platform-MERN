import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import React from "react";
import defaultCompanyPic from "../../assets/company.png";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job?._id}`)}
      className="m-5/2 border border-gray-200 shadow-lg rounded-md p-6 bg-white transition hover:shadow-xl cursor-pointer"
    >
      <div>
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
          <h1 className="font-bold text-lg my-2">{job?.title}</h1>
          <p className="text-sm text-gray-600">{job?.description}</p>
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
      </div>
    </div>
  );
};

export default LatestJobCards;
