import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { toast } from "sonner";

const Register = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    file: "",
  });
  const navigate = useNavigate;
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Registration form failed to sumbmit to server:", error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-500 rounded-md p-4 my-10"
        >
          <h1 className="text-center text-blue-600 font-bold text-xl mb-5">
            Register
          </h1>
          <div className="my-2">
            <Label className="m-1"> Name</Label>
            <Input
              type="text"
              value="input.fullName"
              name="fullName"
              onchange={changeEventHandler}
              placeholder="Enter name"
            ></Input>
          </div>
          <div className="my-2">
            <Label className="m-1"> Email Id:</Label>
            <Input
              type="email"
              value="input.email"
              name="email"
              onchange={changeEventHandler}
              placeholder="Enter email Id"
            ></Input>
          </div>
          <div className="my-2">
            <Label className="m-1"> Password</Label>
            <Input
              type="password"
              value="input.password"
              name="password"
              onchange={changeEventHandler}
              placeholder="**********"
            ></Input>
          </div>
          <div className="my-2">
            <Label className="m-1"> Mob No.</Label>
            <Input
              type="text"
              inputMode="numeric"
              maxLength={10}
              pattern="\d*"
              placeholder="**********"
              value="input.phoneNumber"
              name="phoneNumber"
              onchange={changeEventHandler}
            ></Input>
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center gap-3" id="r1">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onchange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3 " id="r2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onchange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="m-1">Profile Photo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={fileHandler}
              placeholder="Choose a photo"
              className="cursor-pointer"
            ></Input>
          </div>

          <button
            type="submit"
            className="mt-4 block w-full py-3 text-white bg-primary hover:bg-primary/90  rounded-md"
          >
            Register
          </button>
          <p className="text-gray-500 text-md my-2 text-center">
            Already have an account ?{" "}
            <Link to="/login" className="font-semibold text-blue-700">
              {" "}
              Login{" "}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
