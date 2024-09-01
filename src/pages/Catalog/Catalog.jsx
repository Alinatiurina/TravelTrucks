import css from "./Catalog.module.css";
import CarsList from "../../components/CarsList/CarsList";
import Filters from "../../components/Filters/Filters";
import { useEffect, useState, useRef } from "react";
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
    like: { active: false }, // Додаємо фільтр для isLiked
  });

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 4;

  const listRef = useRef(null);

  useEffect(() => {
    async function fetchCars(page) {
      try {
        setError(false);
        setLoading(true);
        const data = await GetCars(page);
        setCars(() => [...data.items]);
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

        const matchesLike = !filters.like.active || car.isLiked;

        return matchesEquipment && matchesType && matchesLike;
      });

      setFilteredCars(filtered);
    };

    applyFilters();
  }, [filters, cars]);

  const handleFilterChange = (category, index) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (category === "like") {
        newFilters.like.active = !newFilters.like.active;
      } else {
        newFilters[category][index].active =
          !newFilters[category][index].active;
      }
      return newFilters;
    });

    setCurrentPage(1); // Повертаємося на першу сторінку при зміні фільтрів
  };

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      if (listRef.current) {
        listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      if (listRef.current) {
        listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
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
      <Filters filters={filters} onFilterChange={handleFilterChange} />
      {loading && <b>Loading...</b>}
      {error && <b>Error fetching data</b>}
      <div className={css.list}>
        {loading || error ? (
          <></>
        ) : (
          <>
            <CarsList cars={currentCars} />
            {filteredCars.length === 0 && !loading && !error ? (
              <b>Results not found</b>
            ) : (
              <div className={css.pagination}>
                <button
                  className={css.buttonLoadMore}
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
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
            )}
          </>
        )}
      </div>
    </div>
  );
}
