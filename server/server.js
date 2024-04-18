import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes.js";

// Create Express application
const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware setup
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Routes setup
app.use("/api", routes); // Set routes for API endpoints

// Default route
app.get("/", (req, res) => {
  res.send("App Started"); // Send a response for the root route
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
