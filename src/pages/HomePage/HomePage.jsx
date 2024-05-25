import React from "react";
import { Banner, DevInfo, Stories } from "./component";

const HomePage = () => {
  return (
    <div className="py-14">
      <Banner />
      <Stories />
      <DevInfo />
    </div>
  );
};

export default HomePage;
