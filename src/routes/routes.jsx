import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import { ErrorPage } from "../component/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import PrivateRoutes from "./private-routes";
import AddRecipe from "../pages/AddRecipe/AddRecipe";

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
