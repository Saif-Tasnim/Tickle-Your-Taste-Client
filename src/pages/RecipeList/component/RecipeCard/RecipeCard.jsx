import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../providers/AuthProvider";
import toast from "react-hot-toast";
import { useDbUser } from "../../../../hooks/useDbUser";
import showConfirmation from "../../../../utlis/showConfirmationToast";

const RecipeCard = ({ recipe }) => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const userData = useDbUser(user?.email);
  const creatorData = useDbUser(recipe?.creatorEmail);

  const handleViewButton = () => {
    // case-1: if user not logged in then alert to log-in (done)
    if (!user) {
      toast.error("please login first");
    }

    // case-2: user logged in and creator of the recipe then recipe detail page (done)
    if (user && user?.email === recipe?.creatorEmail) {
      navigate(`/recipe/${recipe._id}`);
    }

    if (user && user?.email !== recipe?.creatorEmail) {
      // case-3: user logged in but not have enough coins (<10) (done)
      if (userData?.coins < 10) {
        toast.error("You have insufficient coins");
        navigate("/buy-coins");
      }
      // case-4: user logged in and have enough coins
      else {
        showConfirmation(
          "Are you sure you want to buy the recipe with 10 coins?",
          () => {
            const presentCoinsUser = parseFloat(userData?.coins) - 10;
            const presentCoinsCreator = parseFloat(creatorData?.coins) + 1;
            const purchasedPerson = [...recipe.purchasedBy, user?.email];
            const newWatchCount = parseInt(recipe.watchCount) + 1;

            // console.log("creator ==> ", presentCoinsCreator);
            // console.log("user ==> ", presentCoinsUser);
            // console.log("purchased list ==> ", purchasedPerson);
            // console.log("watch ==> ", newWatchCount);

            // now post in api with cleaning data
          },
          () => {
            toast.error("cancelled");
          }
        );
      }
    }

    // case-5: user Logged in and already purchase the recipe
    if (
      user?.email !== recipe?.creatorEmail &&
      recipe.purchasedBy.find((rp) => rp === user?.email)
    ) {
      navigate(`/recipe/${recipe._id}`);
    }
  };
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-7 items-center">
        <div>
          <img src={recipe.recipeImage} alt="" className="rounded-md" />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-semibold">
            Recipe Name : {recipe.recipeName}
          </h1>
          <h3 className="text-base font-normal">
            {" "}
            Creator Email : {recipe.creatorEmail}
          </h3>
          <p className="text-base font-normal">
            {" "}
            Country : {recipe.countryName}
          </p>
          {recipe.purchasedBy.length > 0 ? (
            <>
              <p> Purchased By : ${recipe.purchasedBy.length}</p>
            </>
          ) : (
            <p className="text-xs italic mt-3">
              {" "}
              ** No Purchased Record Found **{" "}
            </p>
          )}
        </div>
      </div>
      <div>
        <button className="btn btn-secondary" onClick={handleViewButton}>
          {" "}
          View Recipe{" "}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
