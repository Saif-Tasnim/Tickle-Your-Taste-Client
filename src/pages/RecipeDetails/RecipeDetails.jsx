import React from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const {id} = useParams();
  console.log(id);
  return <div className="py-36">recipe details is here ....</div>;
};

export default RecipeDetails;
