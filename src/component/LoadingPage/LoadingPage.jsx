import React from "react";
import image from "../../assets/loader/loader.png";

const LoadingPage = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div>
        <img src={image} alt="" className="w-44 h-44 block mx-auto animate-pulse" />
        <h1 className="text-3xl mt-4">Please wait a while ....</h1>
      </div>
    </div>
  );
};

export default LoadingPage;
