import UserService from "services/UserService";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "models/user";
import ConfirmModal from "components/ConfirmModal";
import { useContext } from "react";
import { UserContext } from "context/UserContext";
import AuthService from "services/AuthService";

function UsersPage() {
  const [Users, setUsers] = useState<User[]>([]);
  const [modalProps, setModalProps] = useState({
    id: "",
    title: "",
  });
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    UserService.findAll((data: any) => {
      setUsers(data);
    });
  }, []);

  const handleConfirmDelete = (confirmed: boolean, id: string): void => {
    if (confirmed) {
      UserService.deleteOne(id, () => {
        if (id === userContext.user.uid) {
          console.log("logging out");
          AuthService.logout();
        }
      });
    }
  };

  const handleOpenModal = (id: string, title: string) => {
    setModalProps({
      id,
      title,
    });
  };

  return (
    <div>
      <h2>Users</h2>
      <table className="table align-middle">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Is Admin</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {Users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.isAdmin ? "true" : "false"}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>
                <Link className="btn btn-link" to={"/users/edit/" + user.id}>
                  Edit
                </Link>{" "}
                |
                <button
                  type="button"
                  className="btn btn-link text-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#modal"
                  onClick={() => handleOpenModal(user.id, user.name!)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmModal
        modalId="modal"
        text="Delete"
        message={
          <p>
            Are you sure you want to delete <strong>{modalProps.title}</strong>?
          </p>
        }
        onConfirm={handleConfirmDelete}
        id={modalProps.id}
      />
    </div>
  );
}

export default UsersPage;
