import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import LandingPage from "./components/LandingPage/LandingPage";
import CitySelection from "./components/city_Vehicles/CitySelection";
import VehicleSelection from "./components/city_Vehicles/VehicleSelection";
import Result from "./components/Result/Result";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cities" element={<CitySelection />} />
          <Route path="/vehicles" element={<VehicleSelection />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
