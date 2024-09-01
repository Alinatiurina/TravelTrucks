import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CiMap } from "react-icons/ci";
import Button from "../Button/button";
import css from "./CarsList.module.css";
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
import { CgSmartHomeRefrigerator } from "react-icons/cg";

export default function CarList({ cars }) {
  const defaultImg = "../../img/defaultImg.jpg";
  const location = useLocation();

  const renderIcon = (key) => {
    switch (key.toLowerCase()) {
      case "automatic":
        return <BsDiagram3 className={css.icon} />;
      case "ac":
        return <FaWind className={css.icon} />;
      case "petrol":
      case "gas":
        return <MdLocalGasStation className={css.icon} />;
      case "kitchen":
        return <BsCupHot className={css.icon} />;
      case "radio":
        return <BsUiRadios className={css.icon} />;
      case "bathroom":
        return <BsDroplet className={css.icon} />;
      case "water":
        return <BsDroplet className={css.icon} />;
      case "2 adults":
        return <BsPeople className={css.icon} />;
      case "tv":
        return <FaTv className={css.icon} />;
      case "microwave":
        return <TbMicrowave className={css.icon} />;
      case "refrigerator":
        return <CgSmartHomeRefrigerator className={css.icon} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {cars.length > 0 && (
        <ul className={css.list}>
          {cars.map((car) => {
            const likedCars =
              JSON.parse(localStorage.getItem("likedCars")) || {};
            const [isLiked, setIsLiked] = useState(likedCars[car.id] || false);

            const handleLikeClick = () => {
              setIsLiked((prevIsLiked) => {
                const updatedIsLiked = !prevIsLiked;
                const updatedLikedCars = {
                  ...likedCars,
                  [car.id]: updatedIsLiked,
                };
                localStorage.setItem(
                  "likedCars",
                  JSON.stringify(updatedLikedCars)
                );
                return updatedIsLiked;
              });
            };

            return (
              <li className={css.item} key={car.id}>
                <img
                  src={
                    car.gallery && car.gallery.length > 0
                      ? car.gallery[0].thumb
                      : defaultImg
                  }
                  alt={car.name}
                  className={css.image}
                />
                <div className={css.info}>
                  <div className={css.header}>
                    <h2 className={css.name}>{car.name}</h2>
                    <div className={css.priceLike}>
                      <p className={css.price}>€{car.price}.00</p>
                      <button className={css.like} onClick={handleLikeClick}>
                        <svg
                          className={`${css.icon} ${
                            isLiked ? css.checked : ""
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="24"
                          viewBox="0 0 26 24"
                          fill="none"
                        >
                          <path d="M13 9.854L11.659 7.1705C11.326 6.506 10.7485 5.5505 9.931 4.778C9.127 4.0175 8.164 3.5 7 3.5C4.486 3.5 2.5 5.489 2.5 7.88C2.5 9.6965 3.331 10.979 5.302 12.935C5.8075 13.436 6.3835 13.9775 7.021 14.5745C8.683 16.1345 10.75 18.0755 13 20.6705C15.25 18.0755 17.317 16.1345 18.979 14.5745C19.6165 13.9775 20.194 13.4345 20.698 12.935C22.669 10.979 23.5 9.6965 23.5 7.88C23.5 5.489 21.514 3.5 19 3.5C17.8345 3.5 16.873 4.0175 16.069 4.778C15.2515 5.5505 14.674 6.506 14.341 7.1705L13 9.854ZM13.588 22.292C13.5158 22.3776 13.4257 22.4463 13.3242 22.4935C13.2226 22.5407 13.112 22.5651 13 22.5651C12.888 22.5651 12.7774 22.5407 12.6758 22.4935C12.5743 22.4463 12.4842 22.3776 12.412 22.292C10.0105 19.439 7.837 17.399 6.0475 15.7205C2.95 12.812 1 10.9835 1 7.88C1 4.6325 3.685 2 7 2C9.4 2 11.0785 3.575 12.106 5.012C12.496 5.5595 12.793 6.086 13 6.5C13.2597 5.982 13.5586 5.48456 13.894 5.012C14.9215 3.5735 16.6 2 19 2C22.315 2 25 4.6325 25 7.88C25 10.9835 23.05 12.812 19.9525 15.7205C18.163 17.4005 15.9895 19.442 13.588 22.292Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className={css.infoContainer}>
                    <p className={css.rating}>
                      <span className={css.ratingStar}>★</span>
                      {car.rating} ({car.reviews.length} Reviews)
                    </p>
                    <p className={css.location}>
                      <CiMap />
                      {car.location}
                    </p>
                  </div>
                  <p className={css.description}>{car.description}</p>
                  <div className={css.features}>
                    {Object.keys(car)
                      .filter(
                        (key) =>
                          car[key] === true &&
                          key !== "id" &&
                          key !== "gallery" &&
                          key !== "rating" &&
                          key !== "reviews" &&
                          key !== "description" &&
                          key !== "price" &&
                          key !== "name" &&
                          key !== "location"
                      )
                      .map((key) => (
                        <p key={key} className={css.feature}>
                          {renderIcon(key)}
                          {key}
                        </p>
                      ))}
                  </div>
                  <Link
                    className={css.navLink}
                    to={`/catalog/${car.id}`}
                    state={location}
                  >
                    <Button text="Show more" type="button"></Button>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
