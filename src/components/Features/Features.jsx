import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCarById } from "../../../cars-api";
import css from "./Features.module.css";
import Form from "../Form/form";

export default function Features() {
  const { carsId } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCar() {
      try {
        setLoading(true);
        const data = await getCarById(carsId);
        setCar(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [carsId]);

  return (
    <div className={css.box}>
      <div className={css.container}>
        {loading && <b>Loading...</b>}
        {error && <b>Ooops! Something went wrong! Please try again.</b>}
        {car && (
          <div>
            <ul className={css.features}>
              {Object.keys(car)
                .filter((key) => car[key] === true)
                .map((key) => (
                  <li key={key} className={css.feature}>
                    {key}
                  </li>
                ))}
            </ul>
            <p className={css.detailsText}>Vehicle details</p>
            <ul className={css.detailsList}>
              <li className={css.detailsItem}>
                <p>Form</p> <p>{car.form}</p>{" "}
              </li>
              <li className={css.detailsItem}>
                <p>Length</p> <p>{car.length}</p>
              </li>
              <li className={css.detailsItem}>
                <p>Width</p> <p>{car.width}</p>
              </li>
              <li className={css.detailsItem}>
                <p>Height</p> <p>{car.height}</p>
              </li>
              <li className={css.detailsItem}>
                <p>Tank</p>
                <p>{car.tank}</p>{" "}
              </li>
              <li className={css.detailsItem}>
                <p>Consumption</p>
                <p>{car.consumption}</p>
              </li>
            </ul>
          </div>
        )}
      </div>
      <Form></Form>
    </div>
  );
}
