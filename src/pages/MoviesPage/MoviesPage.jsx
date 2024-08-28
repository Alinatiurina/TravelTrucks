import { Field, Form, Formik } from "formik";
import css from './MoviesPage.module.css';
import MovieList from "../../components/MovieList/MovieList";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { getMovieByQwery } from "../../../movies-api";

export default function MoviesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const notify = () => toast.error('Please, enter your request!');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [movies, setMovies] = useState([]);

    const query = searchParams.get("query");

    const changeQuery = (newFilter) => {
        setSearchParams({ query: newFilter });
    };

    useEffect(() => {
        async function fetchMovies() {
            const params = searchParams.get("query");
            try {
                setError(false);
                setLoading(true);
                const data = await getMovieByQwery(params, 1);
                setMovies(data);
                if (data.length === 0) {
                    notify();
                }
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchMovies();
    }, [query]);

    return (
        <div className={css.container}>
             <h2 className={css.infoText}>Find movies by name below</h2>
            <Formik
                initialValues={{ query: "" }}
                onSubmit={(values) => {
                    changeQuery(values.query);
                }}
            >
                <Form className={css.form}>
                    <Field className={css.input}
                        type="text"
                        name="query"
                        placeholder="Search movies"
                    />
                    <button type="submit" className={css.button}>Search</button>
                    <Toaster position="top-right" reverseOrder={false} />
                </Form>
            </Formik>
            {loading && <b>Loading...</b>}
            {error && <b>Error fetching data</b>}
            {query && <MovieList movies={movies} />}
        </div>
    );
}
