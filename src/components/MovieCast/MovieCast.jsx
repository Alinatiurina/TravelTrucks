import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieCastById } from "../../../movies-api";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { moviesId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        const data = await getMovieCastById(moviesId);
        setMovie(data);
      } catch (error) { setError(true); }
      finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [moviesId]);

  return (
    <div className={css.container}>
      {loading && <b>Loading...</b>}
      {error && <b>Ooops! Something wrong! Please try again.</b>}
      {movie && (
        <ul className={css.castList}>
          {movie.map(cast => (
            <li className={css.castItem} key={cast.id}>
              <img src={cast.profile_path ? `https://image.tmdb.org/t/p/w500${cast.profile_path}` : defaultImg} alt="poster" />
              <p className={css.castName}>{cast.name}</p>
              <p>Character: {cast.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
