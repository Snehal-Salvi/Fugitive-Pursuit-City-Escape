import cities from "./data/cities.js"; // Import cities data
import cops from "./data/cops.js"; // Import cops data
import vehicles from "./data/vehicles.js"; // Import vehicles data

// Handler to get cities data
export const getCities = (req, res) => {
  res.json(cities); // Send cities data as JSON response
};

// Handler to get cops data
export const getCops = (req, res) => {
  res.json(cops); // Send cops data as JSON response
};

// Handler to get vehicles data
export const getVehicles = (req, res) => {
  res.json(vehicles); // Send vehicles data as JSON response
};

// Handler to randomly assign a criminal location
export const assignCriminal = (req, res) => {
  const fugitiveLocations = cities.map((city) => city.id); // Extract city IDs
  const criminalLocationId =
    fugitiveLocations[Math.floor(Math.random() * fugitiveLocations.length)]; // Randomly select a city ID as the criminal location
  console.log("Criminal Location ID is " + criminalLocationId); // Log criminal location ID
  res.json({ criminalLocationId }); // Send the criminal location ID as JSON response
};

// Handler to calculate the game result
export const calculateGameResult = (req, res) => {
  const { selectedCities, selectedVehicles, criminalLocationId } = req.body; // Extract data from request body

  const criminalLocation = criminalLocationId; // Extract criminal location
  const winner = { name: "Criminal", result: true }; // Initialize winner object with criminal as default

  // Iterate over selected cities and check if any cop captures the criminal
  Object.entries(selectedCities).forEach(([copId, cityId]) => {
    if (cityId === criminalLocation.toString()) { // Check if the cop's selected city matches the criminal's location
      const vehicleId = selectedVehicles[copId]; // Get the vehicle ID of the cop
      const vehicle = vehicles.find(
        (vehicle) => vehicle.id === parseInt(vehicleId) // Find the vehicle object
      );
      const city = cities.find((city) => city.id === parseInt(cityId)); // Find the city object

      // Check if the cop's vehicle range is sufficient to capture the criminal
      if (vehicle && city && vehicle.range >= city.distance) {
        const cop = cops.find((player) => player.id === parseInt(copId)); // Find the cop object
        if (cop) {
          cop.result = true; // Set cop's result to true (successful capture)
          winner.name = cop.name; // Update winner's name to the cop's name
          winner.result = false; // Update winner's result to false (criminal is captured)
        }
      }
    }
  });

  res.json({ winner }); // Send the game result (winner) as JSON response
};
