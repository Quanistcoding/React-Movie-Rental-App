import { useState, useRef } from "react";
import MovieService from "services/MovieService";

const likedStyle = {
  backgroundColor: "red",
};

function LikedButton(props: {
  liked: boolean;
  uid: string;
  movieId: string;
  likedBy: string[];
}) {
  const [liked, setLiked] = useState(props.liked);
  const likedByRef = useRef(props.likedBy);
  const handleLiked = () => {
    if (props.uid) {
      const index = likedByRef.current.indexOf(props.uid);
      if (index === -1) likedByRef.current.push(props.uid);
      else {
        likedByRef.current.splice(index, 1);
      }
      MovieService.updateOne(props.movieId, { likedBy: likedByRef.current });
    }
    setLiked(!liked);
  };
  return (
    <i
      className={liked ? "bi bi-heart-fill" : "bi bi-heart"}
      style={liked ? { color: "red" } : { color: "black" }}
      role="button"
      onClick={handleLiked}
    ></i>
  );
}

export default LikedButton;
