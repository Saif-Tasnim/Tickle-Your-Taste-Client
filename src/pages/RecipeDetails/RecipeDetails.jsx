import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useGetRecipe } from "../../hooks/useGetrecipe";
import { AuthContext } from "../../providers/AuthProvider";
import LoadingPage from "../../component/LoadingPage/LoadingPage";

const RecipeDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [recipeData, isLoading] = useGetRecipe(user?.email, id);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="py-28">
      <h1 className="text-3xl font-bold text-center">
        Recipe Name: {recipeData?.recipeName}
      </h1>
      <div className="w-4/5 mx-auto pt-14 pb-4">
        <p className="pb-2">
          <span className="font-semibold">Posted From :</span>{" "}
          {recipeData?.countryName}
        </p>
        <p className="pb-2">
          <span className="font-semibold"> Category : </span>
          {recipeData?.category}
        </p>
      </div>

      <div className="w-full h-[480px] pt-16">
        <img
          src={recipeData?.recipeImage}
          alt=""
          className="w-auto h-full block mx-auto object-cover rounded-md"
        />
      </div>

      <div className="w-4/5 mx-auto">
        <div className="pt-14 pb-8">
          <h1 className="text-xl font-semibold pb-4">
            Ingredients and Instructions{" "}
          </h1>
          {recipeData?.recipeDetails}
        </div>

        <div className="pt-10 pb-8">
          <h1 className="text-xl font-semibold pb-4">Live Demonstration</h1>

          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${recipeData?.embeddedCode}`}
            title={recipeData.recipeName}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>

        <div className="pt-14 pb-4">
          <h1 className="text-xl font-semibold pb-4">More About Recipe</h1>
          <p className="pb-2">Posted By : {recipeData?.creatorEmail}</p>
          <p className="pb-2">Total Views : {recipeData?.watchCount}</p>
          <p className="pb-2">
            Total Purchased : {recipeData?.purchasedBy?.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;