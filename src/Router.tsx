import { createBrowserRouter, Link } from "react-router-dom";

import MoviesPage from "pages/movies/MoviesPage";
import CreateMoviePage from "pages/movies/CreateMoviePage";
import Home from "pages/home/Home";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "movies",
        element: <MoviesPage />,
      },
      {
        path: "movies/create",
        element: <CreateMoviePage />,
      },
    ],
  },
]);

export default router;
