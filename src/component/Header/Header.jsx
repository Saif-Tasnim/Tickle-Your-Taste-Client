import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { LoadingPage } from "../LoadingPage";
import { PRIVATE_ROUTE, PUBLIC_ROUTE } from "../../static/routes/routes";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";

const Header = () => {
  const { user, loading, logOut, googleSignIn } = useContext(AuthContext);
  const [activeRoute, setActiveRoute] = useState(
    localStorage.getItem("route") || "/"
  );
  const navigate = useNavigate();
  const [axiosSecure] = useAxiosSecure();

  const { data: userData = {} } = useQuery({
    queryKey: ["email", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/users/${user.email}`);
        return res.data;
      }
      return {};
    },
  });


  const navBar = user ? PRIVATE_ROUTE : PUBLIC_ROUTE;

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
      navigate("/");
    });
  };

  const handleSignIn = async () => {
    googleSignIn()
      .then((res) => {
        axios
          .post("http://localhost:5000/store-user", {
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
          })
          .catch((err) => {
            toast.error(err.message);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="fixed w-full h-16 flex justify-between items-center bg-purple-100 z-40 px-5">
      <Link
        to="/"
        className="px-6 py-4 flex items-center gap-1 rounded-sm cursor-pointer hover:opacity-80"
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
            <div className="absolute hidden group-hover:flex flex-col justify-center -right-10 top-14 rounded-md">
              <div className="py-2 text-nowrap">
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
