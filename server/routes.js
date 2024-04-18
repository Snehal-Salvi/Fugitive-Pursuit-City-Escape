import express from "express";
import {
  getCities,
  getCops,
  assignCriminal,
  getVehicles,
  calculateGameResult,
} from "./controller.js"; // Import controller functions

const router = express.Router(); // Create a router instance

// Define routes and their corresponding controller functions
router.get("/cities", getCities); // Route to get cities data
router.get("/cops", getCops); // Route to get cops data
router.get("/vehicles", getVehicles); // Route to get vehicles data
router.get("/assignCriminal", assignCriminal); // Route to randomly assign a criminal location
router.post("/calculateGameResult", calculateGameResult); // Route to calculate the game result based on user inputs

export default router; // Export the router for use in other parts of the application
