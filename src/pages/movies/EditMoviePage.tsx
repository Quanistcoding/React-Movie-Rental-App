import MovieService from "services/MovieService";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Movie } from "models/movie";

function EditMoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(new Movie());

  useEffect(() => {
    MovieService.findOne(id!, (data) => {
      if (!data) return navigate("/pageNotFound");
      setMovie(data);
    });
  }, []);

  const handleInputChange = (e: any): void => {
    setMovie((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateMovie = (e: any) => {
    e.preventDefault();
    MovieService.setOne(id!, movie);
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
