import css from "./Catalog.module.css";
import CarsList from "../../components/CarsList/CarsList";
import Filters from "../../components/Filters/Filters";
import { useEffect, useState } from "react";
import { GetCars } from "../../../cars-api";
import LoadMore from "../../components/LoadMore/LoadMore";

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

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 4;

  useEffect(() => {
    async function fetchCars(page) {
      try {
        setError(false);
        setLoading(true);
        const data = await GetCars(page);
        setCars((prevCars) => [...prevCars, ...data.items]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCars(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const applyFilters = () => {
      const activeEquipmentFilters = filters.equipment
        .filter((filter) => filter.active)
        .map((filter) => filter.label);

      const activeTypeFilters = filters.type
        .filter((filter) => filter.active)
        .map((filter) => filter.label);

      const filtered = cars.filter((car) => {
        const matchesEquipment = activeEquipmentFilters.every((filter) => {
          switch (filter) {
            case "AC":
              return car.AC;
            case "Automatic":
              return car.transmission === "automatic";
            case "Kitchen":
              return car.kitchen;
            case "TV":
              return car.TV;
            case "Bathroom":
              return car.bathroom;
            default:
              return true;
          }
        });

        const matchesType = activeTypeFilters.every((filter) => {
          switch (filter) {
            case "Van":
              return car.form === "panelTruck";
            case "Fully Integrated":
              return car.form === "fullyIntegrated";
            case "Alcove":
              return car.form === "alcove";

            default:
              return true;
          }
        });

        return matchesEquipment && matchesType;
      });

      setFilteredCars(filtered);
    };

    applyFilters();
  }, [filters, cars]);

  const handleFilterChange = (category, index) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      newFilters[category][index].active = !newFilters[category][index].active;
      return newFilters;
    });
  };

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    async function fetchMoreCars() {
      if (currentPage > 1) {
        try {
          setError(false);
          setLoading(true);
          const data = await GetCars(currentPage);
          setCars((prevCars) => [...prevCars, ...data.items]);
          setFilteredCars((prevFilteredCars) => [
            ...prevFilteredCars,
            ...data.items,
          ]);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchMoreCars();
  }, [currentPage]);

  return (
    <div className={css.catalogContainer}>
      {loading && <b>Loading...</b>}
      {error && <b>Error fetching data</b>}
      <Filters filters={filters} onFilterChange={handleFilterChange} />
      <div className={css.list}>
        {filteredCars.length === 0 ? (
          <b>Results not found</b>
        ) : (
          <>
            <CarsList cars={currentCars} />
            <div className={css.pagination}>
              <button
                className={css.buttonLoadMore}
                onClick={handleNextPage}
                disabled={
                  currentPage === totalPages || filteredCars.length === 0
                }
              >
                Load more
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
