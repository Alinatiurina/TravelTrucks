import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieReviewById } from "../../../movies-api";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { moviesId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        const data = await getMovieReviewById(moviesId);
        setMovie(data);
      } catch (error) {
        setError(true);
      }
      finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [moviesId]);

  // Check if loading or if movie is not yet loaded
  if (loading || !movie) {
    return (
      <div className={css.container}>
        {loading && <b>Loading...</b>}
        {error && <b>Ooops! Something wrong! Please try again.</b>}
      </div>
    );
  }

  if (movie && movie.length === 0) {
    return (
      <div className={css.container}>
        <p>We don't have any reviews</p>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <ul>
        {movie.map(rev => (
          <li key={rev.id} className={css.review}>
            <p className={css.author}>{rev.author}</p>
            <p>{rev.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
