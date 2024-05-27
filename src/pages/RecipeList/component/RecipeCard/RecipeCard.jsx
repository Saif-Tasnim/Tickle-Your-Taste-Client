import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../providers/AuthProvider";
import toast from "react-hot-toast";
import { useCreatorUser, useDbUser } from "../../../../hooks/useDbUser";
import showConfirmation from "../../../../utlis/showConfirmationToast";
import { useAxiosSecure } from "../../../../hooks/useAxiosSecure";

const RecipeCard = ({ recipe }) => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();

  const userData = useDbUser(user?.email);
  const creatorData = useCreatorUser(recipe?.creatorEmail);

  const buttonLabel =
    recipe?.purchasedBy.find((rp) => rp === user?.email) ||
    recipe?.creatorEmail === user?.email
      ? "View Recipe"
      : "Buy Recipe";

  const btnClass =
    recipe?.purchasedBy.find((rp) => rp === user?.email) ||
    recipe?.creatorEmail === user?.email
      ? "btn-secondary"
      : "btn-error";

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
      // case-5: user Logged in and already purchase the recipe
      else if (recipe.purchasedBy.find((rp) => rp === user?.email)) {
        navigate(`/recipe/${recipe._id}`);
      }

      // case-4: user logged in and have enough coins
      else {
        showConfirmation(
          "Are you sure to buy the recipe with 10 coins?",
          async () => {
            const presentCoinsUser = parseFloat(userData?.coins) - 10;
            const presentCoinsCreator = parseFloat(creatorData?.coins) + 1;
            const purchasedPerson = [...recipe.purchasedBy, user?.email];
            const newWatchCount = parseInt(recipe.watchCount) + 1;

            // now post in api with cleaning data
            const newUserData = {
              ...userData,
              coins: presentCoinsUser,
            };

            const newCreatorData = {
              ...creatorData,
              coins: presentCoinsCreator,
            };

            const newRecipeData = {
              ...recipe,
              purchasedBy: purchasedPerson,
              watchCount: newWatchCount,
            };

            const compressObject = {
              newUserData,
              newCreatorData,
              newRecipeData,
            };

            try {
              const res = await axiosSecure.patch(
                "/update-recipe",
                compressObject
              );
              if (res) {
                toast.success("you have purchased this recipe successfully");
              }
            } catch (error) {
              toast.error(error.message);
            }
          },
          () => {
            toast.error("cancelled");
          }
        );
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="flex gap-3 md:gap-7 items-center">
        <div className="w-36 h-auto md:w-64 md:h-48">
          <img
            src={recipe.recipeImage}
            alt=""
            className="rounded-md w-full h-full"
          />
        </div>

        <div className="flex flex-col gap-2 md:gap-3">
          <h1 className="md:text-xl font-semibold">
            Recipe Name : {recipe.recipeName}
          </h1>
          <h3 className="text-sm md:text-base font-normal">
            {" "}
            <span className="hidden md:inline">Creator Email :</span>{" "}
            {recipe.creatorEmail}
          </h3>
          <p className="text-sm md:text-base font-normal">
            {" "}
            Country : {recipe.countryName}
          </p>
          {recipe.purchasedBy.length > 0 ? (
            <p className="text-sm md:text-base text-nowrap">
              Purchased By : {recipe.purchasedBy.length} persons{" "}
            </p>
          ) : (
            <p className="text-xs italic mt-3">
              {" "}
              ** No Purchased Record Found **{" "}
            </p>
          )}
        </div>
      </div>
      <div className="ml-36 mt-3 md:ml-0 md:mt-0">
        <button
          className={`btn ${btnClass} text-nowrap`}
          onClick={handleViewButton}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
