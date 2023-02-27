import { Genre } from "./genre";
import Joi from "joi";
class Movie {
  id = "";
  title = "";
  releaseYear = 1900;
  genre = new Genre();
  liked = false;
  likedBy = [] as string[];
}

const MovieSchema = Joi.object({
  id: Joi.string().allow(null, ""),
  releaseYear: Joi.number().integer().min(0).max(10000),
  title: Joi.string(),
  genre: Joi.object().keys({
    id: Joi.string().messages({
      "string.empty": "Must select a genre.",
    }),
    name: Joi.string(),
  }),
  liked: Joi.boolean(),
  likedBy: Joi.array().items(Joi.string().allow(null)),
});

export { Movie, MovieSchema };
