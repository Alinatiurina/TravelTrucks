import css from "./Filters.module.css";
import { CiMap } from "react-icons/ci";
import Button from "../Button/button";

export default function Filters({ filters, onFilterChange }) {
  return (
    <div className={css.filtersContainer}>
      <div className={css.location}>
        <h3>Location</h3>
        <input className={css.input} type="text" placeholder="Kyiv, Ukraine" />
      </div>

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
              {filter.label}
            </button>
          ))}
        </div>
        <Button text="Search" type="button"></Button>
      </div>
    </div>
  );
}
