import { useEffect, useRef, useState } from "react";
import {
  useParams,
  Link,
  NavLink,
  Outlet,
  useLocation,
} from "react-router-dom";
import { getCarById } from "../../../cars-api";
import { GoChevronLeft } from "react-icons/go";
import css from "./CarDetailsPage.module.css";
import { CiMap } from "react-icons/ci";

export default function CarDetailsPage() {
  const { carsId } = useParams();
  const [car, setCar] = useState(null);

  const location = useLocation();
  const backLink = useRef(location.state ?? "/");

  useEffect(() => {
    async function fetchCar() {
      try {
        const data = await getCarById(carsId);
        setCar(data);
      } catch (error) {}
    }
    fetchCar();
  }, [carsId]);

  const getNavLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  const classLink = ({ isActive }) => {
    return isActive ? css.active : css.link;
  };

  return (
    <div className={css.container}>
      {car && (
        <div className={css.detailContainer}>
          <div>
            <Link to={backLink.current} className={css.goBack}>
              <GoChevronLeft /> Go back
            </Link>
          </div>

          <div className={css.info}>
            <div className={css.header}>
              <h2 className={css.name}>{car.name}</h2>
            </div>
            <div className={css.infoContainer}>
              <NavLink to="revievs">
                <p className={css.rating}>
                  <span className={css.ratingStar}>★</span>
                  {car.rating} ({car.reviews.length} Reviews)
                </p>
              </NavLink>
              <p className={css.location}>
                <CiMap />
                {car.location}
              </p>
            </div>
            <p className={css.price}>€{car.price}</p>
            <div>
              <ul className={css.gallery}>
                {car.gallery && car.gallery.length > 0 ? (
                  car.gallery.map((image, index) => (
                    <li key={index} className={css.galleryItem}>
                      <img
                        src={image.thumb}
                        alt={`Gallery image ${index + 1}`}
                        className={css.galleryImage}
                      />
                    </li>
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </ul>
            </div>
            <p className={css.description}>{car.description}</p>
          </div>
        </div>
      )}
      <div className={css.add}>
        <ul className={css.addList}>
          <li className={css.addItem}>
            <NavLink to="features" className={classLink}>
              Features
            </NavLink>
          </li>
          <li className={css.addItem}>
            <NavLink to="revievs" className={classLink}>
              Revievs
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
