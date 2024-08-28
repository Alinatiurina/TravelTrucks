import { useEffect, useRef, useState } from "react";
import { useParams, Link, NavLink, Outlet, useLocation} from "react-router-dom";
import { getMovieById } from "../../../movies-api";
import { GoChevronLeft } from "react-icons/go";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
    const { moviesId } = useParams();
    const [movie, setMovie] = useState(null);
    
    
    const location = useLocation();
    const backLink = useRef(location.state?? "/");
    
    useEffect(() => {
        async function fetchMovie() {
            try {
                const data = await getMovieById(moviesId);
                setMovie(data);
            } catch (error) { }
        }
        fetchMovie();
    }, [moviesId]);
   
    return (
        <div className={css.container}>
            {movie && (      
                    <div className={css.detailContainer}>
                    <div><Link to={backLink.current}className={css.goBack}><GoChevronLeft  /> Go back</Link></div>
                    <div className={css.infoContainer}>
                        <img className={css.image} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                        <div >
                            <h2>{movie.original_title} {movie.release_date.split('-')[0]}</h2>
                            <p>User Score: {movie.vote_average}%</p>
                            <h3>Owerview</h3>
                            <p>{movie.overview}</p>
                            <h3>Genres</h3>
                            <ul className={css.genresList}>
                                {movie.genres.map(genre => (
                                    <li key={genre.id}>{genre.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            <div className={css.add}>
                <h3 className={css.addText}>Additional information</h3>
                <ul className={css.addList}>
                    <li className={css.addItem}><NavLink to='cast'>Cast</NavLink></li>
                    <li className={css.addItem}><NavLink to='revievs'>Revievs</NavLink></li>
                </ul>
            </div>
            <Outlet />
        </div>);
    
}