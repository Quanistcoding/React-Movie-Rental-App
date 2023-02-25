import { Genre } from "models/genre";

function GenreListGroup(props: { genres: Genre[] }) {
  return (
    <ul className="list-group">
      {props.genres.map((genre) => (
        <li className="list-group-item">{genre.name}</li>
      ))}
    </ul>
  );
}

export default GenreListGroup;
