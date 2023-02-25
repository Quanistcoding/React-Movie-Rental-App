import UserService from "services/UserService";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User } from "models/user";
function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    isAdmin: false,
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    UserService.findOneOnce(id!, (data) => {
      if (!data) return navigate("/");
      for (let key in data) {
        setUser((user) => ({ ...user, [key]: data[key] }));
      }
    });
  }, []);

  const handleInputChange = (e: any): void => {
    setUser((user) => ({
      ...user,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAdminChange = () => {
    setUser((user) => ({
      ...user,
      isAdmin: !user.isAdmin,
    }));
  };

  const handleUpdateUser = (e: any) => {
    e.preventDefault();
    UserService.setOne<User>(id!, user);
    navigate("/users");
  };

  return (
    <div>
      <h2>Edit User: {user.id}</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="UserTitle" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="userName"
            name="name"
            value={user.name! || ""}
            aria-describedby="userName"
            onChange={handleInputChange}
          />

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="isAdmin"
              onChange={handleAdminChange}
              name="isAdmin"
              checked={user.isAdmin}
            />
            <label className="form-check-label" htmlFor="isAdmin">
              Is Admin
            </label>
          </div>

          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={user.phone! || ""}
            aria-describedby="phone"
            onChange={handleInputChange}
          />
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={user.email! || ""}
            aria-describedby="email"
            onChange={handleInputChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleUpdateUser}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditUserPage;
