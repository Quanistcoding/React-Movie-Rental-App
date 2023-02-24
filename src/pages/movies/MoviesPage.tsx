import MovieService from "services/MovieService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "models/movie";
import ConfirmModal from "components/ConfirmModal";

function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    MovieService.findAll((data: any) => {
      setMovies(data);
    });
  }, []);

  const handleConfirm = (confirmed: boolean, id: string): void => {
    if (confirmed) MovieService.deleteOne(id);
  };

  return (
    <div>
      <Link to="/movies/create" className="btn btn-primary">
        Create
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Release Year</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.releaseYear}</td>
              <td>
                <Link className="btn btn-link" to={"/movies/edit/" + movie.id}>
                  Edit
                </Link>{" "}
                |
                <ConfirmModal
                  text="Delete"
                  message={
                    "Are you sure you want to delete" + movie.title + "?"
                  }
                  onConfirm={handleConfirm}
                  id={movie.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MoviesPage;
