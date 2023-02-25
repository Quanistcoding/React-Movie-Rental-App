import GenreService from "services/GenreService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Genre } from "models/genre";
import ConfirmModal from "components/ConfirmModal";

function GenrePage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [modalProps, setModalProps] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    GenreService.findAll((data: any) => {
      setGenres(data);
    });
  }, []);

  const handleConfirmDelete = (confirmed: boolean, id: string): void => {
    if (confirmed) GenreService.deleteOne(id);
  };

  const handleOpenModal = (id: string, name: string) => {
    setModalProps({
      id,
      name,
    });
  };

  return (
    <div>
      <h2>Genres</h2>
      <Link to="/genres/create" className="btn btn-primary">
        Create
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre) => (
            <tr key={genre.id}>
              <td>{genre.name}</td>
              <td>
                <Link className="btn btn-link" to={"/genres/edit/" + genre.id}>
                  Edit
                </Link>{" "}
                |
                <button
                  type="button"
                  className="btn btn-link text-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#modal"
                  onClick={() => handleOpenModal(genre.id, genre.name)}
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
            Are you sure you want to delete <strong>{modalProps.name}</strong>?
          </p>
        }
        onConfirm={handleConfirmDelete}
        id={modalProps.id}
      />
    </div>
  );
}

export default GenrePage;
