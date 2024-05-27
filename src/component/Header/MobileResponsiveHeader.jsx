import React from "react";
import Hamburger from "hamburger-react";
import { Link } from "react-router-dom";

const MobileResponsiveHeader = ({
  isOpen,
  setOpen,
  user,
  navBar,
  coins,
  handleLogOut,
  handleSignIn,
}) => {
  return (
    <>
      {user ? (
        <div>
          <div className="avatar">
            <img
              src={user?.photoURL}
              alt="user-photo"
              onClick={() => setOpen(!isOpen)}
            />
          </div>
        </div>
      ) : (
        <div>
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
      )}

      {isOpen && (
        <div className="absolute right-0 w-full pb-5 pt-2 z-[999999]">
          <ul
            className={`bg-purple-300 flex flex-col gap-2 py-2 ${
              isOpen
                ? "translate-x-0 duration-700"
                : "-translate-x-[1000px] duration-1000"
            }`}
          >
            {user ? (
              <p className="pl-2 pb-2 font-bold text-error"> Coins : {coins}</p>
            ) : (
              ""
            )}
            {navBar.map((nav) => (
              <Link
                to={nav.href}
                key={nav.href}
                className="pb-2 pl-2 font-semibold"
              >
                {nav.label}
              </Link>
            ))}
            {user ? (
              <button className="btn btn-error" onClick={handleLogOut}>
                {" "}
                Log Out{" "}
              </button>
            ) : (
              <button className="btn btn-secondary" onClick={handleSignIn}>
                {" "}
                Google Sign In{" "}
              </button>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default MobileResponsiveHeader;
