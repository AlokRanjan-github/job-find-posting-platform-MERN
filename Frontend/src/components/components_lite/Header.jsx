import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <header className="bg-white pt-12 px-4 text-center">
      <div className=" flex flex-col gap-6 max-w-3xl mx-auto">
        <span
          className="mx-auto px-4
         py-2 rounded-full bg-gray-100 text-[#F83002] font-medium"
        >
          Where talent meets opportunity
        </span>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Search, Apply & <br /> Land Your{" "}
          <span className="text-[#6A38C2]">Dream Job</span>
        </h1>

        <p className="text-gray-600 text-base md:text-lg">
          Browse verified job listings and apply in just a few clicks. Let top
          companies discover your skills and hire you faster.
        </p>

        <div className="flex w-full max-w-xl mx-auto items-center border border-gray-300 rounded-full px-4 py-1.5 shadow-sm bg-white">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find your dream job..."
            className="flex-grow text-sm md:text-base px-2 py-2 outline-none bg-transparent text-gray-700"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-full bg-[#6A38C2] hover:bg-blue-900 text-white "
          >
            <Search />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
