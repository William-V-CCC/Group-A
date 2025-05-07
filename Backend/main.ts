import express from "npm:express";
import routes from "./Components/routes.ts"; // Import the routes
import cors from "npm:cors";



const app = express();
app.use(cors()); // Enable CORS for all routes
const PORT = 3005;

// Middleware to parse JSON request bodies
app.use(express.json());

// Use the routes defined in routes.ts
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});