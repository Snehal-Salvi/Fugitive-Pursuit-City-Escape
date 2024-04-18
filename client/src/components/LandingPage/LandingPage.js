import React, { useState, useEffect } from "react";
import style from "./LandingPage.module.css"; // Import styles
import { BACKEND_URL } from "../../constants"; // Import backend URL constant

export default function LandingPage() {
  const [cops, setCops] = useState([]); // State to store cop data

  useEffect(() => {
    fetchCops(); // Fetch cop data when component mounts
  }, []);

  // Function to fetch cop data from the backend
  const fetchCops = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cops`); // Fetch cop data from backend
      if (!response.ok) {
        throw new Error("Failed to fetch cop data");
      }
      const data = await response.json(); // Extract cop data from response
      // Filter cop data to include only cops
      setCops(data.filter(player => player.name.startsWith("Cop")));
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle starting the game
  const handleStartGame = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/assignCriminal`); // Request to assign criminal location
      if (!response.ok) {
        throw new Error("Failed to assign criminal location");
      }
      const data = await response.json(); // Extract criminal location ID from response
      const criminalLocationId = data.criminalLocationId;
      localStorage.setItem('criminalLocationId', criminalLocationId); // Store criminal location ID in local storage
      window.location.href = "/cities"; // Redirect to cities page
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <>
      {/* Header section */}
      <div className={style.header}>
        <div className={style.headerImage}>
          <h1 className={style.heading}>Fugitive Pursuit: City Escape</h1>
        </div>
      </div>

      {/* Main content section */}
      <div className={style.backgroundImage}>
        {/* Game description */}
        <p className={style.gameDescription}>
          A notorious criminal escape artist has vanished again!!!<br />
          However, the criminal may be hiding in only one of the possible 5 neighboring cities.<br />
          3 fearless cops have volunteered in capturing the fugitive hiding and they need your help!
        </p>
        
        {/* Display cops */}
        <div className={style.copsContainer}>
          {cops.map((cop, index) => (
            <img key={index} src={cop.image} alt={cop.name} className={style.copImage} />
          ))}
        </div>

        {/* Start game button */}
        <button className={style.startGame} onClick={handleStartGame}>START GAME</button>
      </div>
    </>
  );
}
