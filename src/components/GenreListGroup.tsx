import { Genre } from "models/genre";

function GenreListGroup(props: {
  genres: Genre[];
  onSelect: (e: any) => void;
  selectedGenre: string;
}) {
  const { selectedGenre } = props;
  return (
    <div className="list-group" onClick={props.onSelect}>
      <a
        role="button"
        className={
          "list-group-item list-group-item-action" +
          (selectedGenre === "all" ? " active" : "")
        }
        data-value="all"
      >
        All
      </a>
      {props.genres.map((genre, id) => (
        <a
          data-value={genre.name}
          role="button"
          className={
            "list-group-item list-group-item-action" +
            (selectedGenre === genre.name ? " active" : "")
          }
          key={id}
        >
          {genre.name}
        </a>
      ))}
    </div>
  );
}

export default GenreListGroup;
