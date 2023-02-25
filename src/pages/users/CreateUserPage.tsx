import { useState, useEffect } from "react";
import UserService from "services/UserService";
import GenreService from "services/GenreService";
import { User } from "models/user";
import { Genre } from "models/genre";
import { useNavigate } from "react-router-dom";

function CreateUserPage() {
  const [user, setUser] = useState<User>({} as User);
  const [genres, setGenres] = useState<Genre[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    GenreService.findAll((data) => {
      setGenres(data);
    });
  }, []);

  const handleInputChange = (e: any): void => {
    setUser((User) => ({
      ...User,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateUser = (e: any) => {
    e.preventDefault();
    UserService.addOne(user);
    navigate("/Users");
  };

  return (
    <div>
      <h2>Create New User</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="UserTitle" className="form-label">
            User Title
          </label>
          <input
            type="text"
            className="form-control"
            id="UserTitle"
            name="title"
            aria-describedby="UserTitle"
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
          onClick={handleCreateUser}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateUserPage;
