import { createBrowserRouter, Link } from "react-router-dom";

import MoviesPage from "pages/movies/MoviesPage";
import CreateMoviePage from "pages/movies/CreateMoviePage";
import Home from "pages/home/Home";
import App from "./App";
import EditMoviePage from "pages/movies/EditMoviePage";
import PageNotFound from "pages/errors/PageNotFound";

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
      {
        path: "movies/edit/:id",
        element: <EditMoviePage />,
      },
      {
        path: "/pageNotFound",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
