import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";

const isResume = true;
const skills = ["HTML", "CSS", "Javscript", "REactJs", "Express", "MongoDB"];
function Profile() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="../../../public/profilePic.jpg" alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Full Name</h1>
              <p className="text-gray-500">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Pariatur, accusamus!
              </p>
            </div>
          </div>
          <Button
            className="text-right"
            variant="outline"
            onClick={() => setOpen(!open)}
          >
            <Pen />
          </Button>
        </div>
        <div className="my-3">
          <div className="flex items-center gap-3 m-1">
            <Mail /> <span>alok@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 m-1">
            <Contact /> <span>1234567890</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 my-5">
          <h1 className="text-xl font-semibold ">Skills</h1>
          <div className="flex flex-wrap gap-3">
            {skills.length !== 0 ? (
              skills.map((skill, index) => (
                <Badge className="p-2" key={index}>
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500"> No skills to show</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-xl text-shadow-md font-semibold">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              href="https://youtube.com/"
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              Open Resume
            </a>
          ) : (
            <span>No Resume uploaded</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <h1 className="text-xl font-semibold ">Applied Jobs</h1>

        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
