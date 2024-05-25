import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import { ErrorPage } from "../component/ErrorPage";
import PrivateRoutes from "./private-routes";
import {
  AddRecipe,
  BuyCoinsPage,
  HomePage,
  RecipeDetails,
  RecipeList,
} from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "recipes",
        element: <RecipeList />,
      },
      {
        path: "recipe/:id",
        element: <RecipeDetails />,
      },
      {
        path: "buy-coins",
        element: <BuyCoinsPage />,
      },
      {
        path: "add-recipes",
        element: (
          <PrivateRoutes>
            <AddRecipe />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
