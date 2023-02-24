import MovieService from "services/MovieService";
import { useState, useEffect } from "react";
import { Movie } from "models/movie";
import { useParams, useNavigate } from "react-router-dom";

function EditMoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(new Movie());

  useEffect(() => {
    if (!id) return navigate("/pageNotFound");

    MovieService.findOne(id, (data) => {
      if (!data) return navigate("/pageNotFound");
      setMovie(data);
    });
  }, []);
  return <div>{movie.title}</div>;
}

export default EditMoviePage;
