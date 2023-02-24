import { createBrowserRouter, Link } from "react-router-dom";

import MoviesPage from "pages/movies/MoviesPage";
import CreateMoviePage from "pages/movies/CreateMoviePage";
import Home from "pages/home/Home";
import App from "./App";
import EditMoviePage from "pages/movies/EditMoviePage";
import PageNotFound from "pages/errors/PageNotFound";
import GenrePage from "pages/genres/GenresPaag";
import CreateGenrePage from "pages/genres/CreateGenrePage";
import EditGenrePage from "pages/genres/EditGenrePage";
import LoginPage from "pages/auth/LoginPage";

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
        path: "/login",
        element: <LoginPage />,
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
        path: "genres",
        element: <GenrePage />,
      },
      {
        path: "genres/create",
        element: <CreateGenrePage />,
      },
      {
        path: "genres/edit/:id",
        element: <EditGenrePage />,
      },
      {
        path: "/pageNotFound",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
