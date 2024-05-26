import React from "react";
import { Banner, DevInfo, Dots, Stories } from "./component";

const HomePage = () => {
  return (
    <div className="py-14">
      <Banner />
      <Dots />
      <Stories />
      <Dots />
      <DevInfo />
    </div>
  );
};

export default HomePage;
