import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { PRIVATE_ROUTE, PUBLIC_ROUTE } from "../../static/routes/routes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import { useDbUser } from "../../hooks/useDbUser";

const Header = () => {
  const { user, logOut, googleSignIn } = useContext(AuthContext);
  const [activeRoute, setActiveRoute] = useState(
    localStorage.getItem("route") || "/"
  );
  const navigate = useNavigate();
  const location = useLocation();

  const userData = useDbUser(user?.email);

  const navBar = user ? PRIVATE_ROUTE : PUBLIC_ROUTE;

  if (!user && location.state?.from?.pathname) {
    toast.error("log-in first please");
  }

  useEffect(() => {
    setActiveRoute(localStorage.getItem("route"));
  }, [activeRoute]);

  const handleActiveRoute = (route) => {
    setActiveRoute(route);
    localStorage.setItem("route", route);
  };

  const handleLogOut = () => {
    logOut().then(() => {
      toast.success("Log Out");
      localStorage.setItem("route", "/");
      navigate("/");
      window.location.reload();
    });
  };

  const handleSignIn = async () => {
    googleSignIn()
      .then((res) => {
        axios
          .post("https://reciepe-server.vercel.app/store-user", {
            name: res.user.displayName,
            photo: res.user.photoURL,
            email: res.user.email,
            coins: 50,
          })
          .then((data) => {
            if (data.data.insertedId) {
              toast.success(`Signed up as ${res.user.displayName}`);
            } else {
              toast.success(`logged in as ${res.user.displayName}`);
            }

            window.location.reload();
          })
          .catch((err) => {
            toast.error(err.message);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="fixed w-full h-16 flex justify-between items-center bg-purple-100 z-40 px-5">
      <Link
        to="/"
        className="px-6 py-4 flex items-center gap-1 rounded-sm cursor-pointer hover:opacity-80"
        onClick={() => handleActiveRoute("/")}
      >
        <img src="/recipe-book.png" alt="" className="w-6 h-6" />
        <p className="text-2xl font-bold"> Tickle-Your-Taste </p>
      </Link>

      <div>
        {navBar.map(({ href, label }) => (
          <Link
            key={href}
            to={href}
            className={`px-5 py-3 ${
              href === activeRoute ? "underline font-bold" : ""
            }`}
            onClick={() => handleActiveRoute(href)}
          >
            {" "}
            {label}{" "}
          </Link>
        ))}
      </div>

      <div className="px-6">
        {user ? (
          <div className="relative group">
            <label className="popover-trigger my-2 cursor-pointer">
              <div className="avatar">
                <img src={user?.photoURL} alt="user-photo" />
              </div>
            </label>
            
            <div className="absolute hidden group-hover:flex flex-col gap-1 justify-center -right-10 top-14 rounded-md bg-sky-50 pb-1 shadow-lg">
              <div className="text-nowrap">
                <div className="flex gap-2 py-2 px-3 rounded-lg bg-purple-600 text-white">
                  <p className="text-base"> Current Coins : </p>
                  <p className="text-lg font-bold"> {userData.coins} </p>
                </div>
              </div>
              <button
                className="btn btn-outline-secondary"
                onClick={handleLogOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <button className="btn btn-outline-secondary" onClick={handleSignIn}>
            Google Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
