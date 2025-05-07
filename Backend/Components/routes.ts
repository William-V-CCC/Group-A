import express from "npm:express";
import { connection } from "../sqlconnector.ts";





const router = express.Router();

console.log("Router initialized");

// Route to fetch all users from the database
router.get("/users", async (_req, res) => {
  console.log("GET /users route hit");
  const query = "SELECT * FROM UserList"; // Ensure this matches your table name
  console.log("Query to execute:", query);

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      console.log("Sending 500 response due to error");
      return res.status(500).json({ error: "Failed to fetch users" });
    }
    console.log("Query executed successfully. Results:", results);
    res.json(results);
  });
});

// Route to add a new user
router.post("/Addauser", (req, res) => {
  console.log("POST /Addauser route hit");
  console.log("Request body received:", req.body);

  const { firstName, lastName } = req.body; // No need to include 'id' in the request body
  console.log("Parsed request body - firstName:", firstName, "lastName:", lastName);

  // Check if required fields are provided
  if (!firstName || !lastName) {
    console.error("Validation error: Missing required fields");
    return res.status(400).json({ error: "Missing required fields: firstName and lastName" });
  }

  // Step 1: Get the current maximum id from the database
  const getMaxIdQuery = "SELECT MAX(id) AS maxId FROM UserList";
  console.log("Query to get max id:", getMaxIdQuery);

  connection.query(getMaxIdQuery, (err, results: { maxId: number }[]) => {
    if (err) {
      console.error("Error fetching max id:", err.message);
      console.error("SQL State:", err.sqlState || "N/A");
      console.error("SQL Error Code:", err.code || "N/A");
      console.error("Full Error Object:", err);
      return res.status(500).json({ error: "Failed to fetch max id", details: err.message });
    }

    const maxId = results[0]?.maxId || 0; // If no rows exist, start with 0
    const newId = maxId + 1; // Increment the max id by 1
    console.log("Calculated new id:", newId);

    // Step 2: Insert the new user with the calculated id
    const insertQuery = `INSERT INTO UserList (id, firstName, lastName) VALUES (${newId}, '${firstName}', '${lastName}')`;
    console.log("Query to execute:", insertQuery);

    connection.query(insertQuery, (err, results) => {
      if (err) {
        console.error("Error executing insert query:", err.message);
        console.error("SQL State:", err.sqlState || "N/A");
        console.error("SQL Error Code:", err.code || "N/A");
        console.error("Full Error Object:", err);
        return res.status(500).json({ error: "Failed to add user", details: err.message });
      }

      console.log("User added successfully. Results:", results);
      res.status(201).json({ message: "User added successfully", userId: newId });
    });
  });
});

// Route to delete a user by ID
router.delete("/deleteUser/:id", (req, res) => {
  console.log("DELETE /deleteUser/:id route hit");
  const { id } = req.params; // Extract the user ID from the URL parameter
  console.log("Parsed request params - id:", id);

  // Check if the ID is provided
  if (!id) {
    console.error("Validation error: Missing required field 'id'");
    return res.status(400).json({ error: "Missing required field: id" });
  }

  // Construct the query to delete the user
  const query = `DELETE FROM UserList WHERE id = ${id}`;
  console.log("Query to execute:", query);

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error deleting user:", err.message);
      return res.status(500).json({ error: "Failed to delete user", details: err.message });
    }

    if ((results as any).affectedRows === 0) {
      console.log("No rows affected. User not found.");
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User deleted successfully");
    res.json({ message: "User deleted successfully" });
  });
});

router.post("/addBadge", (req, res) => {
  console.log("POST /addBadge route hit");
  console.log("Request body received:", req.body);

  // Extract badge details from the nested "data" object in the request body
  const { badgeName, badgeDescription, badgeImage } = req.body.data || {};

  // Validate the required fields
  if (!badgeName || !badgeDescription || !badgeImage) {
    console.error("Validation error: Missing required fields");
    return res.status(400).json({
      error: "Missing required fields: badgeName, badgeDescription, and badgeImage",
    });
  }

  // Step 1: Get the current maximum badgeID from the database
  const getMaxBadgeIdQuery = "SELECT MAX(badgeID) AS maxBadgeID FROM Badges";
  console.log("Query to get max badgeID:", getMaxBadgeIdQuery);

  connection.query(getMaxBadgeIdQuery, (err, results: { maxBadgeID: number }[]) => {
    if (err) {
      console.error("Error fetching max badgeID:", err.message);
      return res.status(500).json({ error: "Failed to fetch max badgeID", details: err.message });
    }

    const maxBadgeID = results[0]?.maxBadgeID || 0; // If no rows exist, start with 0
    const newBadgeID = maxBadgeID + 1; // Increment the max badgeID by 1
    console.log("Calculated new badgeID:", newBadgeID);

    // Step 2: Insert the new badge with the calculated badgeID
    const insertBadgeQuery = `INSERT INTO Badges (badgeID, badgeName, badgeDescription, badgeImage) VALUES (${newBadgeID}, '${badgeName}', '${badgeDescription}', '${badgeImage}')`;
    console.log("Query to execute:", insertBadgeQuery);

    connection.query(insertBadgeQuery, (err, results) => {
      if (err) {
        console.error("Error adding badge:", err.message);
        return res.status(500).json({ error: "Failed to add badge", details: err.message });
      }

      console.log("Badge added successfully. Results:", results);
      res.status(201).json({ message: "Badge added successfully", badgeID: newBadgeID });
    });
  });
});



router.delete("/removeBadge/:badgeID", (req, res) => {
  console.log("DELETE /removeBadge/:badgeID route hit");
  const { badgeID } = req.params; // Extract the badge ID from the URL parameter
  console.log("Parsed request params - badgeID:", badgeID);

  // Check if the badgeID is provided
  if (!badgeID) {
    console.error("Validation error: Missing required field 'badgeID'");
    return res.status(400).json({ error: "Missing required field: badgeID" });
  }

  // Construct the query to delete the badge
  const query = `DELETE FROM Badges WHERE badgeID = ${badgeID}`;
  console.log("Query to execute:", query);

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error deleting badge:", err.message);
      return res.status(500).json({ error: "Failed to delete badge", details: err.message });
    }

    if ((results as any).affectedRows === 0) {
      console.log("No rows affected. Badge not found.");
      return res.status(404).json({ error: "Badge not found" });
    }

    console.log("Badge deleted successfully");
    res.json({ message: "Badge deleted successfully" });
  });
});







router.post("/allbadges", (req, res) => {
  console.log("POST /allbadges route hit");

  // Construct the query to fetch all badges
  const query = "SELECT badgeID, badgeName, badgeDescription, badgeImage FROM Badges";
  console.log("Query to execute:", query);

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching badges:", err.message);
      return res.status(500).json({ error: "Failed to fetch badges", details: err.message });
    }

    console.log("Badges fetched successfully. Results:", results);
    res.status(200).json({
      message: "Badges fetched successfully",
      data: results,
    });
  });
});




router.get("/getChallenges", (req, res) => {
  console.log("GET /getChallenges route hit");

  // Construct the query to fetch all challenges
  const query = "SELECT id, challengeName, challengeDescription FROM Challenges";
  console.log("Query to execute:", query);

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching challenges:", err.message);
      return res.status(500).json({ error: "Failed to fetch challenges", details: err.message });
    }

    console.log("Challenges fetched successfully. Results:", results);
    res.status(200).json({
      message: "Challenges fetched successfully",
      data: results,
    });
  });
});

router.post("/addChallenge", (req, res) => {
  console.log("POST /addChallenge route hit");
  console.log("Request body received:", req.body);

  // Extract challenge details from the request body
  const { challengeName, challengeDescription } = req.body;

  // Validate the required fields
  if (!challengeName || !challengeDescription) {
    console.error("Validation error: Missing required fields");
    return res.status(400).json({
      error: "Missing required fields: challengeName and challengeDescription",
    });
  }

  // Step 1: Get the current maximum id from the database
  const getMaxIdQuery = "SELECT MAX(id) AS maxId FROM Challenges";
  console.log("Query to get max id:", getMaxIdQuery);

  connection.query(getMaxIdQuery, (err, results: { maxId: number }[]) => {
    if (err) {
      console.error("Error fetching max id:", err.message);
      return res.status(500).json({ error: "Failed to fetch max id", details: err.message });
    }

    const maxId = results[0]?.maxId || 0; // If no rows exist, start with 0
    const newId = maxId + 1; // Increment the max id by 1
    console.log("Calculated new id:", newId);

    // Step 2: Insert the new challenge with the calculated id
    const insertChallengeQuery = `INSERT INTO Challenges (id, challengeName, challengeDescription) VALUES (${newId}, '${challengeName}', '${challengeDescription}')`;
    console.log("Query to execute:", insertChallengeQuery);

    connection.query(insertChallengeQuery, (err, results) => {
      if (err) {
        console.error("Error adding challenge:", err.message);
        return res.status(500).json({ error: "Failed to add challenge", details: err.message });
      }

      console.log("Challenge added successfully. Results:", results);
      res.status(201).json({ message: "Challenge added successfully", id: newId });
    });
  });
});

router.delete("/removeChallenge/:id", (req, res) => {
  console.log("DELETE /removeChallenge/:id route hit");
  const { id } = req.params; // Extract the id from the URL parameter
  console.log("Parsed request params - id:", id);

  // Check if the id is provided
  if (!id) {
    console.error("Validation error: Missing required field 'id'");
    return res.status(400).json({ error: "Missing required field: id" });
  }

  // Construct the query to delete the challenge using a parameterized query
  const query = `DELETE FROM Challenges WHERE id = ?`;
  console.log("Query to execute:", query);

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting challenge:", err.message);
      return res.status(500).json({ error: "Failed to delete challenge", details: err.message });
    }

    if ((results as any).affectedRows === 0) {
      console.log("No rows affected. Challenge not found.");
      return res.status(404).json({ error: "Challenge not found" });
    }

    console.log("Challenge deleted successfully");
    res.json({ message: "Challenge deleted successfully" });
  });
});








































console.log("Router setup complete");







export default router;