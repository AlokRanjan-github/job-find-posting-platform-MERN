import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from "@/redux/authSlice";
import axios from "axios";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white m-2">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Hive</span>
          </h1>
        </div>

        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-6">
            {user && user.role === "Recruiter" ? (
              <>
                <li className="hover:cursor-pointer">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="hover:cursor-pointer">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:cursor-pointer">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:cursor-pointer">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="hover:cursor-pointer">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="">
              <Link to={"/register"}>
                {" "}
                <Button className="bg-red-600 hover:bg-red-900">
                  Register
                </Button>
              </Link>
              <Link to={"/login"}>
                {" "}
                <Button variant="outline">Log In</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex items-center gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{user?.fullname}</h3>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user && user.role === "Student" && (
                    <div className="flex w-fit items-center cursor-pointer ">
                      <User2></User2>
                      <Button variant="link">
                        {" "}
                        <Link to="/profile">Profile</Link>
                      </Button>
                    </div>
                  )}

                  <div className="flex w-fit items-center cursor-pointer ">
                    <LogOut></LogOut>
                    <Button variant="link" onClick={logoutHandler}>
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
