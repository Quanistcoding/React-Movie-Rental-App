import MovieService from "services/MovieService";
import { useEffect, useState } from "react";

function MoviesPage() {
  const [movies, setMovies] = useState<{ name: string }[]>([]);
  useEffect(() => {
    MovieService.findAll((data: any) => {
      setMovies(data);
    });
  }, []);

  return (
    <div>
      {movies.map((movie) => (
        <div>{movie.name}</div>
      ))}
    </div>
  );
}

export default MoviesPage;
