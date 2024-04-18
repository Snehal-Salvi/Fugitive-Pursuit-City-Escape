import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { BACKEND_URL } from "../../constants";
import { Link } from "react-router-dom";

export default function CitySelection() {
  // State variables
  const [cities, setCities] = useState([]); // State to store cities data
  const [cops, setCops] = useState([]); // State to store cops data
  const [selectedCities, setSelectedCities] = useState({}); // State to store selected cities for each cop

  // Fetch cities and cops data on component mount
  useEffect(() => {
    fetchCities();
    fetchCops();
  }, []);

  // Store selected cities in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedCities", JSON.stringify(selectedCities));
  }, [selectedCities]);

  // Retrieve selected cities from local storage on component mount
  useEffect(() => {
    const storedCities = localStorage.getItem("selectedCities");
    if (storedCities) {
      setSelectedCities(JSON.parse(storedCities));
    }
  }, []);

  // Function to fetch cities data from the backend
  const fetchCities = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cities`);
      if (!response.ok) {
        throw new Error("Failed to fetch cities data");
      }
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to fetch cops data from the backend
  const fetchCops = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cops`);
      if (!response.ok) {
        throw new Error("Failed to fetch cop data");
      }
      const data = await response.json();
      setCops(data);
      
      // Initialize selected cities state with default values for each cop
      const initialSelectedCities = {};
      data.forEach((cop) => {
        initialSelectedCities[cop.id] = "";
      });
      setSelectedCities(initialSelectedCities);
    } catch (error) {
      console.error(error);
    }
  };

  // Handler function to update selected cities for a cop
  const handleCitiesSelection = (copId, cityId) => {
    setSelectedCities((prevState) => ({
      ...prevState,
      [copId]: cityId,
    }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Select Cities To Find Criminal</h2>
      <div className={styles.list}>
        {/* Display list of cities */}
        {cities.map((city) => (
          <div key={city.id} className={styles.card}>
            <img src={city.image} alt={city.name} className={styles.image} />
            <h3 className={styles.name}>Name: {city.name}</h3>
          </div>
        ))}
      </div>
      <div className={styles.copList}>
        {/* Display list of cops */}
        {cops.map((cop) => (
          <div key={cop.id} className={styles.copCard}>
            <img src={cop.image} alt={cop.name} className={styles.copImage} />
            <h3 className={styles.copName}>{cop.name}</h3>
            {/* Dropdown to select city for each cop */}
            <select
              className={styles.dropdown}
              value={selectedCities[cop.id] || ""}
              onChange={(e) => {
                handleCitiesSelection(cop.id, e.target.value);
              }}
              disabled={selectedCities[cop.id] !== ""}
            >
              <option value="">Select City</option>
              {/* Filter out already selected cities */}
              {cities
                .filter((city) => !Object.values(selectedCities).includes(city.id.toString()))
                .map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
            </select>
          </div>
        ))}
        {/* Button to navigate to the next step */}
        <Link to="/vehicles" style={{ textDecoration: 'none'}}>
          <button 
            className={styles.button} 
            disabled={Object.values(selectedCities).some(cityId => cityId === '')}
          >
            Catch Thief
          </button>
        </Link>
      </div>
    </div>
  );
}
