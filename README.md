# Fugitive Pursuit: City Escape

This is a full-stack web application called "Fugitive Pursuit: City Escape" developed using React for the frontend and Node.js for the backend.

# Deployment Link
```
https://yocket-assignment-nw8g.onrender.com
```

## Features

- Choose Cities: Players can select from neighboring cities where the fugitive might be hiding.
- Choose Vehicles: Players can pick vehicles with varying capabilities to aid in their pursuit.
- Find Criminal: Utilizing clues and strategic thinking, players must locate the fugitive within the chosen city.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/weather-api.git
   ```

2. Install frontend dependencies:

```
cd client
npm install
```

3. 3. Install backend dependencies:

```
cd server
npm install
```

4. 4. Start the frontend and backend servers:

```
npm start

```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Technologies Used

- Frontend:
- React
- CSS Modules
- Backend:
- Node.js
- Express

## APIs

- `GET /api/players`: Fetches data of available players (cops).
- `GET /api/cities`: Fetches data of available cities.
- `GET /api/vehicles`: Fetches data of available vehicles.
- `GET /api/assignCriminal`: Assigns a criminal location for the game.
- `POST /api/calculateGameResult`: Calculates the game result based on player actions.

## Approach

The development of Fugitive Pursuit followed a structured approach to ensure scalability, maintainability, and a seamless gaming experience. Here's an overview of the approach taken:

### 1. Planning and Design

- **Requirements Gathering**: Identified key features and functionalities based on the game concept.

- **Data Design**: Designed the data schema to efficiently store game data such as player information, cities, vehicles, and game progress.

### 2. Frontend Development

- **Component-based Architecture**: Implemented a modular structure using React components to promote reusability and maintainability.
- **Responsive Design**: Ensured compatibility across various devices and screen sizes for an optimal user experience.
- **Styling**: Utilized CSS Modules for scoped styling, enhancing code organization and reducing styling conflicts.

### 3. Backend Development

- **RESTful API Design**: Designed clear and consistent API endpoints for communication between the frontend and backend.
- **Middleware**: Implemented middleware functions for request processing, such as parsing JSON bodies and enabling CORS.

### 4. Testing

- **Unit Testing**: Conducted unit tests for both frontend and backend components to validate functionality and identify potential bugs.
- **Integration Testing**: Tested API endpoints and database interactions to ensure seamless communication and data integrity.

### 5. Deployment

- **Scalability Considerations**: Deployed the application on scalable platform.

## Authors

- [@Snehal](https://github.com/Snehal-Salvi)
