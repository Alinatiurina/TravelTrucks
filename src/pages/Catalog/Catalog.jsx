import css from "./Catalog.module.css"
import CarsList from "../../components/CarsList/CarsList";
import Filters from "../../components/Filters/Filters";
import { useEffect, useState } from "react";
import { GetCars } from "../../../cars-api";

export default function Catalog() {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [filters, setFilters] = useState({
        equipment: [
            { label: "AC", active: false },
            { label: "Automatic", active: false },
            { label: "Kitchen", active: false },
            { label: "TV", active: false },
            { label: "Bathroom", active: false },
        ],
        type: [
            { label: "Van", active: false },
            { label: "Fully Integrated", active: false },
            { label: "Alcove", active: false },
        ],
    });

    useEffect(() => {
        async function fetchCars() {
            try {
                setError(false);
                setLoading(true);
                const data = await GetCars();
                setCars(data.items);
                setFilteredCars(data.items);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchCars();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            const filtered = cars.filter(car => {
                const equipmentFilters = filters.equipment
                    .filter(filter => filter.active)
                    .map(filter => filter.label);

                const matchesEquipment = equipmentFilters.every(filter => {
                    if (filter === "AC") return car.AC;
                    if (filter === "Automatic") return car.transmission === "automatic";
                    if (filter === "Kitchen") return car.kitchen;
                    if (filter === "TV") return car.TV;
                    if (filter === "Bathroom") return car.bathroom;
                    return true;
                });

                const typeFilters = filters.type
                    .filter(filter => filter.active)
                    .map(filter => filter.label);

                const matchesType = typeFilters.length === 0 || typeFilters.includes(car.form);

                return matchesEquipment && matchesType;
            });

            setFilteredCars(filtered);
        };

        applyFilters();
    }, [filters, cars]);

    const handleFilterChange = (category, index) => {
        setFilters(prevFilters => {
            const newFilters = { ...prevFilters };
            newFilters[category][index].active = !newFilters[category][index].active;
            return newFilters;
        });
    };

    return (
        <div className={css.catalogContainer}>
            {loading && <b>Loading...</b>}
            {error && <b>Error fetching data</b>}
            <Filters filters={filters} onFilterChange={handleFilterChange} />
            <CarsList cars={filteredCars} />
        </div>
    );
}
