import React from "react";
import image from "/recipe-book.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="bg-zinc-400">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-12 items-center border-b border-black px-3 py-3 md:px-10 md:py-5">
        
        <div className="flex gap-3 items-center">
          <img src={image} alt="" className="hidden md:block w-10 h-10" />
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
            <Link
              to="https://www.hackerrank.com/profile/saiftasnim2002"
              target="_blank"
              className="hover:underline"
            >
              Hacker Rank
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
