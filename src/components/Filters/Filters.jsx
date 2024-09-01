import css from "./Filters.module.css";
import Button from "../Button/button";
import { IoMapOutline } from "react-icons/io5";
import { FaTv, FaWind } from "react-icons/fa";
import {
  BsDiagram3,
  BsCupHot,
  BsGrid1X2,
  BsGrid3X3Gap,
  BsDroplet,
} from "react-icons/bs";
import { IoGridOutline } from "react-icons/io5";
import { TbMicrowave } from "react-icons/tb";

export default function Filters({ filters, onFilterChange, onSearchClick }) {
  return (
    <div className={css.filtersContainer}>
      {/* <div className={css.location}>
        <h3 className={css.lable}>Location</h3>
        <input className={css.input} type="text" placeholder="Kyiv, Ukraine" />
        <IoMapOutline className={css.mupIcon} />
      </div> */}

      <div className={css.section}>
        <h3 className={css.title}>Filters</h3>

        <p className={css.text}>Vehicle equipment</p>
        <div className={css.filters}>
          {filters.equipment.map((filter, index) => (
            <button
              key={index}
              className={`${css.filterButton} ${
                filter.active ? css.active : ""
              }`}
              onClick={() => onFilterChange("equipment", index)}
            >
              {filter.label === "AC" && <FaWind className={css.icon} />}
              {filter.label === "Automatic" && (
                <BsDiagram3 className={css.icon} />
              )}
              {filter.label === "Kitchen" && <BsCupHot className={css.icon} />}
              {filter.label === "TV" && <FaTv className={css.icon} />}
              {filter.label === "Bathroom" && (
                <BsDroplet className={css.icon} />
              )}
              {filter.label}
            </button>
          ))}
        </div>

        <p className={css.text}>Vehicle type</p>
        <div className={css.filters}>
          {filters.type.map((filter, index) => (
            <button
              key={index}
              className={`${css.filterButton} ${
                filter.active ? css.active : ""
              }`}
              onClick={() => onFilterChange("type", index)}
            >
              {filter.label === "Van" && <BsGrid1X2 className={css.icon} />}
              {filter.label === "Fully Integrated" && (
                <IoGridOutline className={css.icon} />
              )}
              {filter.label === "Alcove" && (
                <BsGrid3X3Gap className={css.icon} />
              )}
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
