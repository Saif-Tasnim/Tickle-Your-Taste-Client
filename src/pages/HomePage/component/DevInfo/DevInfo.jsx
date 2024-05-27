import React from "react";
import InfoSwiper from "./InfoSwiper";
import { Link } from "react-router-dom";

const DevInfo = () => {
  return (
    <div className="py-16 flex flex-col justify-start items-center">
      <h1 className="text-center text-3xl font-bold">
        About Saif Tasnim Chowdhury 😄{" "}
      </h1>
      <p className="text-sm italic pt-3">
        {" "}
        The legend you've been hearing about! 🌟{" "}
      </p>

      <h1 className="text-center my-12 text-xl italic">Have a Look In Short ......</h1>
      <div className="w-[92%] md:w-1/2 mx-auto h-auto">
      <InfoSwiper />
      </div>

      <p className="my-8">Want to know more ? <Link to="https://saif-tasnim-portfolio.surge.sh/" className="pl-2 text-indigo-700 underline" target="_blank">Please visit here</Link> </p>
    </div>
  );
};

export default DevInfo;
