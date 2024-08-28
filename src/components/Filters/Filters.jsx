import css from "./Filters.module.css";

export default function Filters({ filters, onFilterChange }) {
    return (
        <div className={css.filtersContainer}>
            <div className={css.location}>
                <h3>Location</h3>
                <div className={css.filterItem}>
                    <span role="img" aria-label="location">📍</span> Kyiv, Ukraine
                </div>
            </div>

            <div className={css.section}>
                <h3>Filters</h3>
                <h4>Vehicle equipment</h4>
                <div className={css.filters}>
                    {filters.equipment.map((filter, index) => (
                        <button
                            key={index}
                            className={`${css.filterButton} ${filter.active ? css.active : ""}`}
                            onClick={() => onFilterChange('equipment', index)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                <h4>Vehicle type</h4>
                <div className={css.filters}>
                    {filters.type.map((filter, index) => (
                        <button
                            key={index}
                            className={`${css.filterButton} ${filter.active ? css.active : ""}`}
                            onClick={() => onFilterChange('type', index)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                <button className={css.searchButton}>Search</button>
            </div>
        </div>
    );
}
