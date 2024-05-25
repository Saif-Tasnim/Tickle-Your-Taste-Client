import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import { ErrorPage } from "../component/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [{}],
  },
]);
