import React from "react";
import image from "/recipe-book.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="bg-zinc-400">
      <div className="pt-28 grid grid-cols-3 gap-12 items-center border-b border-black px-10 py-5">
        <div className="flex gap-3 items-center">
          <img src={image} alt="" className="w-10 h-10" />
          <p className="font-bold text-xl">Tickle-Your-Taste</p>
        </div>
        <div>
          <h1 className="text-black font-semibold underline mb-2">
            {" "}
            Social Links{" "}
          </h1>
          <div className="flex flex-col gap-1.5 text-sm">
            <Link
              to="https://www.facebook.com/profile.php?id=100008643126562"
              target="_blank"
              className="hover:underline"
            >
              Facebook
            </Link>
            <Link
              to="https://www.linkedin.com/in/saif-tasnim/"
              target="_blank"
              className="hover:underline"
            >
              Linked In
            </Link>
            <Link
              to="https://saif-tasnim-portfolio.surge.sh/"
              target="_blank"
              className="hover:underline"
            >
              Portfolio
            </Link>
            <Link
              to="https://github.com/Saif-Tasnim"
              target="_blank"
              className="hover:underline"
            >
              Github
            </Link>
          </div>
        </div>

        <div>
          <h1 className="text-black font-semibold underline mb-2">
            Contact with me
          </h1>

          <div className="flex flex-col gap-1">
            <p>Email: saiftasnim2002@gmail.com </p>
            <p>Phone: +8801877669501</p>
          </div>
        </div>
      </div>

      <div className="py-3 text-center text-sm">
        &copy; all rights reserved to{" "}
        <span className="font-bold text-base">Tickle-Your-Taste</span>
      </div>
    </section>
  );
};

export default Footer;
