import GenreService from "services/GenreService";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Genre } from "models/genre";

function EditGenrePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [genre, setGenre] = useState(new Genre());

  useEffect(() => {
    GenreService.findOne(id!, (data) => {
      if (!data) return navigate("/pageNotFound");
      setGenre(data);
    });
  }, []);

  const handleInputChange = (e: any): void => {
    setGenre((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateGenre = (e: any) => {
    e.preventDefault();
    GenreService.setOne<Genre>(id!, genre);
    navigate("/genres");
  };

  return (
    <div>
      <h2>Edit Genre</h2>
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
            value={genre.name}
            aria-describedby="genreTitle"
            onChange={handleInputChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleUpdateGenre}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditGenrePage;
