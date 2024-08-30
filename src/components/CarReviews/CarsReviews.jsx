import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCarById } from "../../../cars-api";
import css from "./CarReviews.module.css";
import Form from "../Form/form";

export default function CarReviews() {
  const { carsId } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCar() {
      try {
        setLoading(true);
        const data = await getCarById(carsId);
        setCar(data.reviews);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [carsId]);

  if (loading || !car) {
    return (
      <div className={css.container}>
        {loading && <b>Loading...</b>}
        {error && <b>Ooops! Something wrong! Please try again.</b>}
      </div>
    );
  }

  if (car && car.length === 0) {
    return (
      <div className={css.container}>
        <p>We don't have any reviews</p>
      </div>
    );
  }
  return (
    <div className={css.box}>
      <div className={css.container}>
        <ul className={css.reviewList}>
          {car.map((rev) => (
            <li key={rev.id} className={css.review}>
              <div className={css.autorContainer}>
                <div className={css.avatar}>
                  {rev.reviewer_name[0].toUpperCase()}
                </div>
                <div className={css.details}>
                  <p className={css.author}>{rev.reviewer_name}</p>
                  <p className={css.rating}>
                    {"★".repeat(rev.reviewer_rating)}
                    {"☆".repeat(5 - rev.reviewer_rating)}
                  </p>
                </div>
              </div>
              <p className={css.comment}>{rev.comment}</p>
            </li>
          ))}
        </ul>
      </div>
      <Form></Form>
    </div>
  );
}
