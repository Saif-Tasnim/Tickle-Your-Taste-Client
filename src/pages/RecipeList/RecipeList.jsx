import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { RecipeCard } from "./component";

const RecipeList = () => {
  const { data: recipeList = [] } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/get-recipe");
      return res.data;
    },
  });

  return (
    <div className="pt-28 pb-10">
      <h1 className="text-3xl font-semibold underline text-center">
        {" "}
        All Recipe List{" "}
      </h1>

      <div className="m-14 flex flex-col gap-10">
        {recipeList.map((recipe, i) => (
          <RecipeCard recipe={recipe} key={i} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
