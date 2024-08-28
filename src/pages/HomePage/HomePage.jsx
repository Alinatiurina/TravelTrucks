import MovieList from "../../components/MovieList/MovieList";
import css from './HomePage.module.css'
import { useEffect, useState } from "react";
import { GetMovies } from "../../../movies-api";

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchMovies() {
            try {
                setError(false);
                setLoading(true);
                const data = await GetMovies();
                setMovies(data);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchMovies();
    }, []);

    return (
        <div className={css.container}>
            <h1 className={css.title}>Trending today</h1>
            {loading && <b>Loading...</b>}
            {error && <b>Error fetching data</b>}
            <MovieList movies={movies} />
        </div>
    );
}
