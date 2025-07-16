import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occurred using toaster";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
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
            Login
          </h1>

          <div className="my-2">
            <Label className="m-1"> Email Id:</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter email Id"
            ></Input>
          </div>
          <div className="my-2">
            <Label className="m-1"> Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
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
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
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
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <div className="w-3/4 py-3 text-white flex items-center justify-center max-w-7xl mx-auto bg-blue-500 hover:bg-blue-800/90 rounded-md">
              <div
                className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <button className="mt-4 block w-full py-3 text-white bg-primary hover:bg-primary/90 rounded-md">
              Login
            </button>
          )}

          <p className="text-gray-500 text-md my-2 text-center">
            Create new account ?{" "}
            <Link to="/register" className="font-semibold text-blue-700">
              {" "}
              Register{" "}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
