import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

const Job = () => {
  return (
    <div className="p-5
     rounded-md shadow-lg bg-white border border-gray-100 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
        <Button variant={"outline"} className={"rounded-full"} size="icon">
          {" "}
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://cdn.pixabay.com/photo/2023/02/01/00/54/company-7759278_1280.png" />
          </Avatar>
        </Button>

        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold"> Title</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut enim placeat facilis iure temporibus soluta nemo, at, velit officiis fugit suscipit, animi veritatis doloremque voluptas porro quos officia rerum labore.</p>
      </div>

        <div className='flex items-center gap-2 mt-4'>
            <Badge className='text-blue-700 font-bold' variant='ghost'> 12 Positions</Badge>
            <Badge className='text-[#F83002] font-bold' variant='ghost'>Part Time</Badge>
            <Badge className='text-[#7209B7] font-bold' variant='ghost'>12LPA</Badge>
        </div>
        <div className="flex items-center gap-4 mt-4">
            <Button variant='outline' >Details</Button>
            <Button className='bg-[#6A38C2]' >Save for later</Button>
        </div>
    </div>
  );
}; 

export default Job;
