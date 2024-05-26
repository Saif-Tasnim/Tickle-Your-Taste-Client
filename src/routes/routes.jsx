import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import { ErrorPage } from "../component/ErrorPage";
import PrivateRoutes from "./private-routes";
import {
  AddRecipe,
  BuyCoinsPage,
  HomePage,
  PaymentPage,
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
        element: (
          <PrivateRoutes>
            <RecipeDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "buy-coins",
        element: (
          <PrivateRoutes>
            <BuyCoinsPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "payment-gateway/:id",
        element: (
          <PrivateRoutes>
            <PaymentPage />
          </PrivateRoutes>
        ),
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
