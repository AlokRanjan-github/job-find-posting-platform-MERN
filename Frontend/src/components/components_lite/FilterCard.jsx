import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import React from "react";

const filerData = [
  {
    filerType: "Location",
    array: ["Delhi NCR", "Banglore", "Pune", "Mumbai"],
  },
  {
    filerType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Graphic Designer",
    ],
  },
  {
    filerType: "Salary",
    array: ["0-40k", "40k-1L", "1L-5L", "5L-10L", "above 10L"],
  },
];
const FilterCard = () => {
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />

      <RadioGroup>
        {filerData.map((data, index) => (
          <div key={index}>
            <h1 className="font-bold text-lg">{data.filerType}</h1>
            {data.array.map((item, index) => {
              return (
                <div key={index} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} />
                  <label>{item}</label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
