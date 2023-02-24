import { useState } from "react";
import MovieService from "services/MovieService";
import { Movie } from "models/movie";
import { useNavigate } from "react-router-dom";

function CreateMoviePage() {
  const [formData, setFormData] = useState(new Movie());
  const naviatae = useNavigate();

  const handleInputChange = (e: any): void => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateMovie = (e: any) => {
    e.preventDefault();
    MovieService.addOne(formData);
    naviatae("/movies");
  };

  return (
    <div>
      <h2>Create New Movie</h2>
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
