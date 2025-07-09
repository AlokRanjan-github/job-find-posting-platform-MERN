import React from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Register = () => {
  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          className="w-1/2 border border-gray-500 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Register</h1>
          <div className="my-2">
            <Label className="m-1"> Name</Label>
            <Input type="text" placeholder="Enter name"></Input>
          </div>
          <div className="my-2">
            <Label className="m-1"> Email Id:</Label>
            <Input type="email" placeholder="Enter email Id"></Input>
          </div>
          <div className="my-2">
            <Label className="m-1"> Password</Label>
            <Input type="password" placeholder="**********"></Input>
          </div>
          <div className="my-2">
            <Label className="m-1"> Mob No.</Label>
            <Input
              type="text"
              inputMode="numeric"
              maxLength={10}
              pattern="\d*"
              placeholder="**********"
            ></Input>
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center gap-3" id="r1">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3 " id="r2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
