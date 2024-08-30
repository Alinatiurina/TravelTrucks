import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCarById } from "../../../cars-api";
import css from "./Features.module.css";
import Form from "../Form/form";
import { FaWind, FaTv } from "react-icons/fa";
import {
  BsDiagram3,
  BsCupHot,
  BsGrid3X3Gap,
  BsPeople,
  BsUiRadios,
  BsDroplet,
} from "react-icons/bs";
import { MdLocalGasStation } from "react-icons/md";
import { TbMicrowave } from "react-icons/tb";

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

  const renderIcon = (key) => {
    switch (key.toLowerCase()) {
      case "automatic":
        return <BsDiagram3 className={css.icon} />;
      case "ac":
        return <FaWind className={css.icon} />;
      case "petrol":
        return <MdLocalGasStation className={css.icon} />;
      case "kitchen":
        return <BsCupHot className={css.icon} />;
      case "radio":
        return <BsUiRadios className={css.icon} />;
      case "bathroom":
        return <BsDroplet className={css.icon} />;
      case "2 adults":
        return <BsPeople className={css.icon} />;
      case "tv":
        return <FaTv className={css.icon} />;
      case "water":
        return <BsDroplet className={css.icon} />;
      case "microwave":
        return <TbMicrowave className={css.icon} />;
      default:
        return null;
    }
  };

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
                    {renderIcon(key)}
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
