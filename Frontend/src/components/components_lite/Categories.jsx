import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Navigate, useNavigate } from "react-router-dom";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Full stack Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Graphic Designer",
];
const Categories = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
    };
  return (
    <div>
      <Carousel className="flex w-full max-w-xl mx-auto my-15">
        <CarouselContent>
          {category.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Button onClick={()=>searchJobHandler(item) }>{item}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Categories;
