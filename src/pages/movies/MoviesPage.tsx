import MovieService from "services/MovieService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MoviesPage() {
  const [movies, setMovies] = useState<{ name: string }[]>([]);
  useEffect(() => {
    MovieService.findAll((data: any) => {
      setMovies(data);
    });
  }, []);

  return (
    <div>
      <Link to="/movies/create" className="btn btn-primary">
        Create
      </Link>
      {movies.map((movie) => (
        <div>{movie.name}</div>
      ))}
    </div>
  );
}

export default MoviesPage;
