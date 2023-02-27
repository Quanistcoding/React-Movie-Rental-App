import { Genre } from "./genre";
class Movie {
  id = "";
  title = "";
  releaseYear = "";
  genre = new Genre();
  liked = false;
  likedBy = [] as string[];
}

export { Movie };
