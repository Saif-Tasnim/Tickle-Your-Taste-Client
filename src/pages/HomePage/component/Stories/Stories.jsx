import React from "react";
import CountUp from "react-countup";


const Stories = () => {
  
  return (
    <div className="py-16 flex flex-col justify-start items-center">
      <h1 className="text-center text-3xl font-bold">Our Stories </h1>
      <p className="w-1/2 mx-auto text-center my-8 text-lg">
        Discover how our system has transformed lives! From home cooks to
        professional chefs, users are unlocking their culinary potential and
        creating unforgettable meals. Join the thousands who have found success
        and elevate your cooking game today. Your journey to delicious success
        starts here!
      </p>

      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="border bg-purple-400 px-10 py-7 rounded-md">
          <p className="text-2xl text-center mb-3">Total Users</p>
          <p className="text-2xl font-bold text-center">
            <CountUp start={7} end={90} duration={2.8} delay={0}></CountUp>{" "}
          </p>
        </div>
        <div className="border bg-purple-400 px-10 py-7 rounded-md">
          <p className="text-2xl text-center mb-3">Total Recipes </p>
          <p className="text-2xl font-bold text-center">
            <CountUp start={12} end={173} duration={2.8} delay={0}></CountUp>{" "}
          </p>
        </div>
      </div>

    </div>
  );
};

export default Stories;
