import MovieService from "services/MovieService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "models/movie";
import ConfirmModal from "components/ConfirmModal";
import GenreListGroup from "components/GenreListGroup";
import { Genre } from "models/genre";
import GenreService from "services/GenreService";

function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [modalProps, setModalProps] = useState({
    id: "",
    title: "",
  });

  useEffect(() => {
    MovieService.findAll((data: any) => {
      setMovies(data);
      if (filteredMovies.length === 0) setFilteredMovies(data);
    });

    GenreService.findAll((data: any) => {
      setGenres(data);
    });
  }, []);

  const handleConfirmDelete = (confirmed: boolean, id: string): void => {
    if (confirmed) MovieService.deleteOne(id);
  };

  const handleOpenModal = (id: string, title: string) => {
    setModalProps({
      id,
      title,
    });
  };

  const handleSelectGenre = (e: any) => {
    const genre = e.target.getAttribute("data-value");
    setSelectedGenre(genre);
    if (genre === "all") return setFilteredMovies(movies);
    const filteredMovies = movies.filter((movie) => movie.genre.name === genre);
    setFilteredMovies(filteredMovies);
  };

  return (
    <div>
      <h2>Moives</h2>
      <div className="row">
        <div className="col-2">
          <GenreListGroup
            genres={genres}
            onSelect={handleSelectGenre}
            selectedGenre={selectedGenre}
          />
        </div>
        <div className="col">
          {" "}
          <Link to="/movies/create" className="btn btn-primary">
            Create
          </Link>
          <table className="table align-middle">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Release Year</th>
                <th scope="col">Genre</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.title}</td>
                  <td>{movie.releaseYear}</td>
                  <td>{movie.genre ? movie.genre.name : ""}</td>
                  <td>
                    <Link
                      className="btn btn-link"
                      to={"/movies/edit/" + movie.id}
                    >
                      Edit
                    </Link>{" "}
                    |
                    <button
                      type="button"
                      className="btn btn-link text-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#modal"
                      onClick={() => handleOpenModal(movie.id, movie.title)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ConfirmModal
            modalId="modal"
            text="Delete"
            message={
              <p>
                Are you sure you want to delete{" "}
                <strong>{modalProps.title}</strong>?
              </p>
            }
            onConfirm={handleConfirmDelete}
            id={modalProps.id}
          />
        </div>
      </div>
    </div>
  );
}

export default MoviesPage;
