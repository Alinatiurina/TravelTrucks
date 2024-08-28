import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";


const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const NotFound = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const MovieDetailsPage = lazy(() => import("../pages/MovieDetailsPage/MovieDetailsPage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage"));
const MovieCast = lazy(() => import("./MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("./MovieReviews/MovieReviews"));

export default function App() {
    return (
    <Layout>
        <Routes>
            <Route path="/" element={<HomePage/>} /> 
            <Route path="/movies" element={<MoviesPage/>} />
            <Route path="/movies/:moviesId" element={<MovieDetailsPage />}>
                <Route path="cast" element={<MovieCast/>} />
                <Route path="revievs" element={<MovieReviews/>} />
            </Route>
            <Route path="*" element={ <NotFound/>} />   
        </Routes>       
    </Layout>
    )
}