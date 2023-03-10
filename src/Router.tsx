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
import AuthGuard from "components/AuthGuard";
import UsersPage from "pages/users/UserPage";
import EditUserPage from "pages/users/EditUserPage";

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
        element: <AuthGuard component={<GenrePage />} returnUrl="genres" />,
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
        path: "users",
        element: <AuthGuard component={<UsersPage />} returnUrl="users" />,
      },
      {
        path: "users/edit/:id",
        element: <EditUserPage />,
      },
      {
        path: "/pageNotFound",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
