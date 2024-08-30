import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const NotFound = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const CarDetailsPage = lazy(() =>
  import("../pages/CarDetailsPage/CarDetailsPage")
);
const Catalog = lazy(() => import("../pages/Catalog/Catalog"));
const Features = lazy(() => import("./Features/Features"));
const CarReviews = lazy(() => import("./CarReviews/CarsReviews"));

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:carsId" element={<CarDetailsPage />}>
          <Route path="features" element={<Features />} />
          <Route path="revievs" element={<CarReviews />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
