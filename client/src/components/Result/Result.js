import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constants";
import style from "./Result.module.css"; // Import CSS styles
import { Link } from "react-router-dom";

export default function Result() {
  const [gameResult, setGameResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve selected cities and vehicles from localStorage
        const selectedCities = JSON.parse(
          localStorage.getItem("selectedCities")
        );
        const selectedVehicles = JSON.parse(
          localStorage.getItem("selectedVehicles")
        );
        // Retrieve criminal location ID from localStorage
        const criminalLocationId = localStorage.getItem("criminalLocationId");

        // Make a POST request to the backend endpoint with selected cities, vehicles, and criminal location ID
        const response = await axios.post(
          `${BACKEND_URL}/api/calculateGameResult`,
          {
            selectedCities,
            selectedVehicles,
            criminalLocationId,
          }
        );

        // Set the game result in state
        setGameResult(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={style.resultContainer}>
      {gameResult && (
        <div>
          <h2>Game Result</h2>
          {gameResult.winner.result ? (
            <div className={style.criminal}>
              <img
                src="/assets/criminal.png"
                alt="Criminal"
                className={style.image}
              />
              <p>{gameResult.winner.name} escaped! 😢</p>
            </div>
          ) : (
            <div className={style.cop}>
              <img
                src={`/assets/${gameResult.winner.name.toLowerCase()}.png`}
                alt={gameResult.winner.name}
                className={style.image}
              />
              <p>{gameResult.winner.name} found the criminal! 🎉</p>
            </div>
          )}
        </div>
      )}

      <Link to="/" style={{ textDecoration: "none" }}>
        <button className={style.button}>Play Again</button>
      </Link>
    </div>
  );
}
