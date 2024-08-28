import css from "./CarsList.module.css";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button/button";

export default function CarList({ cars }) {
    const defaultImg = '../../img/defaultImg.jpg';
    const location = useLocation();

    return (
        <div>
            {cars.length > 0 && (
                <ul className={css.list}>
                    {cars.map((car) => (
                        <li className={css.item} key={car.id}>
                          <img
                                src={car.gallery && car.gallery.length > 0 ? car.gallery[0].thumb : defaultImg}
                                alt={car.name}
                                className={css.image}
                            />
                            <div className={css.info}>
                                <div className={css.header}>
                                    <h2 className={css.name}>{car.name}</h2>
                                    <p className={css.price}>€{car.price}</p>
                                </div>
                                <div className={css.infoContainer}>
                                <p className={css.rating}>
                                    <svg width="16" height="16" aria-label="icon-star">
                                    <use href="../../img/icons.svg#icon-star"></use>
                                </svg> {car.rating} ({car.reviews.length} Reviews)
                                </p>
                                    <p className={css.location}>
                                        <svg width="16" height="16" aria-label="icon-Map">
                                    <use href="../../img/icons.svg#icon-Map"></use>
                                </svg>{car.location}</p>
                                </div>
                                <p className={css.description}>{car.description}</p>
                                <div className={css.features}>
                                    {car.transmission && <span className={css.feature}>Automatic</span>}
                                    {car.engine && <span className={css.feature}>{car.engine}</span>}
                                    {car.kitchen && <span className={css.feature}>Kitchen</span>}
                                    {car.AC && <span className={css.feature}>AC</span>}
                                </div> 
                                <Button text="Show more"></Button>
                                </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
