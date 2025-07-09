import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const user = false;

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-6">
            <li>Home</li>
            <li>Browse</li>
            <li>Jobs</li>
          </ul>
          {!user ? (
            <div className="">
              <Button variant="primary">Register</Button>
              <Button variant="outline">Log In</Button>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex items-center gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Alok Ranjan</h3>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Architecto, asperiores. Provident minus ratione
                      accusantium voluptatum animi distinctio fugiat
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  <div className="flex w-fit items-center cursor-pointer ">
                    <User2></User2>
                    <Button variant="link">Profile</Button>
                  </div>
                  <div className="flex w-fit items-center cursor-pointer ">
                    <LogOut></LogOut>
                    <Button variant="link">Logout</Button>
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
