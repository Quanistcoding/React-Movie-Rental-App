import MovieService from "services/MovieService";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Movie } from "models/movie";
import GenreService from "services/GenreService";
import { Genre } from "models/genre";
function EditMoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(new Movie());
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    MovieService.findOne(id!, (data) => {
      if (!data) return navigate("/pageNotFound");
      setMovie(data);
    });
    GenreService.findAll((data) => {
      setGenres(data);
    });
  }, []);

  const handleInputChange = (e: any): void => {
    if (e.target.name == "genre") {
      const genre = genres.find((genre) => genre.id == e.target.value);
      setMovie((movie) => ({
        ...movie,
        genre: genre!,
      }));
    } else {
      setMovie((movie) => ({
        ...movie,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleUpdateMovie = (e: any) => {
    e.preventDefault();
    MovieService.setOne<Movie>(id!, movie);
    navigate("/movies");
  };

  return (
    <div>
      <h2>Edit Movie</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="movieTitle" className="form-label">
            Movie Title
          </label>
          <input
            type="text"
            className="form-control"
            id="movieTitle"
            name="title"
            value={movie.title}
            aria-describedby="movieTitle"
            onChange={handleInputChange}
          />
          <label htmlFor="releaseYear" className="form-label">
            Release Year
          </label>
          <input
            type="text"
            className="form-control"
            id="releaseYear"
            name="releaseYear"
            value={movie.releaseYear}
            aria-describedby="releaseYear"
            onChange={handleInputChange}
          />

          <label htmlFor="genre" className="form-label">
            Genre
          </label>
          <select
            className="form-select"
            aria-label="Select genre"
            id="genre"
            onChange={handleInputChange}
            name="genre"
          >
            <option value="">Choose Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleUpdateMovie}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditMoviePage;
