import { Genre } from "models/genre";

function GenreListGroup(props: { genres: Genre[]; onSelect: any }) {
  return (
    <div className="list-group">
      <a role="button" className="list-group-item list-group-item-action">
        "All"
      </a>
      {props.genres.map((genre, id) => (
        <a
          role="button"
          className="list-group-item list-group-item-action"
          key={id}
        >
          {genre.name}
        </a>
      ))}
    </div>
  );
}

export default GenreListGroup;
