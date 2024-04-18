import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { BACKEND_URL } from "../../constants";
import { Link } from "react-router-dom";

export default function VehicleSelection() {
  const [vehicles, setVehicles] = useState([]); // State to store vehicles data
  const [cops, setCops] = useState([]); // State to store cops data
  const [selectedVehicles, setSelectedVehicles] = useState({}); // State to store selected vehicles for each cop

  // Fetch vehicles and cops data on component mount
  useEffect(() => {
    fetchVehicles();
    fetchCops();
  }, []);

  // Store selected vehicles in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedVehicles", JSON.stringify(selectedVehicles));
  }, [selectedVehicles]);

  // Retrieve selected vehicles from local storage on component mount
  useEffect(() => {
    const storedVehicles = localStorage.getItem("selectedVehicles");
    if (storedVehicles) {
      setSelectedVehicles(JSON.parse(storedVehicles));
    }
  }, []);

  // Function to fetch vehicles data from the backend
  const fetchVehicles = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/vehicles`);
      if (!response.ok) {
        throw new Error("Failed to fetch Vehicles data");
      }
      const data = await response.json();
      setVehicles(data);
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
      
      // Initialize selected vehicles state with default values for each cop
      const initialSelectedVehicles = {};
      data.forEach((cop) => {
        initialSelectedVehicles[cop.id] = "";
      });
      setSelectedVehicles(initialSelectedVehicles);
    } catch (error) {
      console.error(error);
    }
  };
  
  // Handler function to update selected vehicles for a cop
  const handleVehiclesSelection = (copId, vehicleId) => {
    const selectedVehicleIndex = vehicles.findIndex((vehicle) => vehicle.id === parseInt(vehicleId));
    const selectedVehicle = vehicles[selectedVehicleIndex];
    
    if (selectedVehicle && selectedVehicle.count > 0) {
      const updatedVehicles = [...vehicles];
      updatedVehicles[selectedVehicleIndex] = {
        ...selectedVehicle,
        count: selectedVehicle.count - 1
      };
  
      setVehicles(updatedVehicles);
  
      setSelectedVehicles((prevState) => ({
        ...prevState,
        [copId]: vehicleId,
      }));
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Select Vehicles To Find Criminal</h2>
      <div className={styles.list}>
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className={styles.card}>
            <img src={vehicle.image} alt={vehicle.name} className={styles.image} />
            <h3 className={styles.name}>Name: {vehicle.name}</h3>
            <h3 className={styles.name}>Range: {vehicle.range} KM</h3>
            <h3 className={styles.name}>Available Count: {vehicle.count}</h3>
          </div>
        ))}
      </div>
      <div className={styles.copList}>
        {cops.map((cop) => (
          <div key={cop.id} className={styles.copCard}>
            <img src={cop.image} alt={cop.name} className={styles.copImage} />
            <h3 className={styles.copName}>{cop.name}</h3>
            <select
              className={styles.dropdown}
              value={selectedVehicles[cop.id] || ""}
              onChange={(e) => {
                handleVehiclesSelection(cop.id, e.target.value);
              }}
              disabled={selectedVehicles[cop.id] !== ""}
            >
              <option value="">Select Vehicles</option>
              {vehicles
                .filter((vehicle) => vehicle.count > 0)
                .map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.name}
                  </option>
                ))}
            </select>
          </div>
        ))}
        <Link to="/result" style={{ textDecoration: 'none'}}>
          <button 
            className={styles.button} 
            disabled={Object.values(selectedVehicles).some(VehiclesId => VehiclesId === '')}
          >
            Catch Thief
          </button>
        </Link>
      </div>
    </div>
  );
}
