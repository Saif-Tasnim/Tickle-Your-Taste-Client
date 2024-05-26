import React from "react";

const Dots = () => {
  return (
    <div className="mt-20 mb-12  w-3/4 mx-auto flex gap-3 items-center">
      <hr className="border-purple-800 w-96 ml-10" />
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: "black",
        }}
      ></div>
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: "black",
        }}
      ></div>
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: "black",
        }}
      ></div>
      <hr className="border-purple-800 w-96" />
    </div>
  );
};

export default Dots;
