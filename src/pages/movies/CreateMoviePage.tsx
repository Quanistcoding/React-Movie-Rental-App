import { useState, useEffect } from "react";
import MovieService from "services/MovieService";
import GenreService from "services/GenreService";
import { Movie, MovieSchema } from "models/movie";
import { Genre } from "models/genre";
import { useNavigate } from "react-router-dom";
import { ValidationError } from "joi";

function CreateMoviePage() {
  const [movie, setMovie] = useState<Movie>(new Movie());
  const [genres, setGenres] = useState<Genre[]>([]);
  const [validationError, setValidationError] = useState<
    ValidationError | undefined
  >(undefined);
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleCreateMovie = (e: any) => {
    e.preventDefault();
    console.log(movie);
    const { error } = MovieSchema.validate(movie);
    setValidationError(error);
    if (!error) {
      MovieService.addOne(movie);
      navigate("/movies");
    }
  };

  return (
    <div>
      <h2>Create New Movie</h2>
      {validationError ? (
        <div className="alert alert-danger">{validationError?.message}</div>
      ) : (
        ""
      )}

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
          onClick={handleCreateMovie}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateMoviePage;
