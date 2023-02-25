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
    UserService.findOne(id!, (data) => {
      if (!data) return navigate("/");
      setUser(data);
    });
  }, []);

  const handleInputChange = (e: any): void => {
    setUser((user) => ({
      ...user,
      [e.target.name]: e.target.value,
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
          <label htmlFor="isAdmin" className="form-label">
            Is Admin
          </label>
          <input
            type="text"
            className="form-control"
            id="isAdmin"
            name="isAdmin"
            value={user.isAdmin ? "ture" : "false"}
            aria-describedby="isAdmin"
            onChange={handleInputChange}
          />
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
