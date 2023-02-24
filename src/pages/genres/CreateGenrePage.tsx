import { useState } from "react";
import GenreService from "services/GenreService";
import { Genre } from "models/genre";
import { useNavigate } from "react-router-dom";

function CreateGenrePage() {
  const [formData, setFormData] = useState(new Genre());
  const navigate = useNavigate();

  const handleInputChange = (e: any): void => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateGenre = (e: any) => {
    e.preventDefault();
    GenreService.addOne(formData);
    navigate("/genres");
  };

  return (
    <div>
      <h2>Create New Genre</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="genreTitle" className="form-label">
            Genre
          </label>
          <input
            type="text"
            className="form-control"
            id="genreTitle"
            name="name"
            aria-describedby="genreTitle"
            onChange={handleInputChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleCreateGenre}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateGenrePage;
