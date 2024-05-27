import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../providers/AuthProvider";
import toast from "react-hot-toast";

const SingleBanner = ({ ban }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddButton = () => {
    if (!user) {
      toast.error("Please login-first");
      navigate("/");
    } else {
      navigate("/add-recipes");
    }
  };
  return (
    <div
      className="bg-cover bg-no-repeat h-[80vh] bg-gradient-to-r"
      style={{
        backgroundImage: `url(${ban.img})`,
      }}
    >
      <div className="w-full text-center">
        <h1 className="text-4xl text-purple-400 font-extrabold z-50 bg-stone-300 shadow-2xl px-4 py-3 italic">
          {ban.slogan}
        </h1>
      </div>
      <div className="absolute bottom-4 right-4 flex gap-9 py-2 rounded-xl px-2">
        <Link>
          <button className="btn btn-secondary btn-md">
            {" "}
            <Link to="/recipes">See Recipes</Link>{" "}
          </button>
        </Link>
        <button
          className="btn btn-outline-secondary btn-md bg-amber-100 border-amber-100 hover:border-0"
          onClick={handleAddButton}
        >
          Add Recipe{" "}
        </button>
      </div>
    </div>
  );
};

export default SingleBanner;
