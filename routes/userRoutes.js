const express = require("express");
const router = express.Router();
const connection = require("../database");
const bcrypt = require("bcrypt");

// Endpoint to handle sign-up
router.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body; // Only required fields

  console.log("Received sign-up request for email:", email);

  // Check if the email is already in use
  const checkUserQuery = "SELECT * FROM users WHERE email = ?";
  connection.query(checkUserQuery, [email], async (err, results) => {
    if (err) {
      console.error("Error checking user existence:", err);
      return res.status(500).json({ error: "Server error during sign-up" });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "Email already in use" });
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database with default NULL values for new fields
      const insertUserQuery =
        "INSERT INTO users (fullname, email, password, position, date_joining, address) VALUES (?, ?, ?, NULL, NULL, NULL)";
      connection.query(
        insertUserQuery,
        [fullname, email, hashedPassword],
        (err) => {
          if (err) {
            console.error("Error inserting new user:", err);
            return res
              .status(500)
              .json({ error: "Server error during sign-up" });
          }

          console.log("User registered successfully with email:", email);
          return res
            .status(201)
            .json({ message: "User registered successfully" });
        }
      );
    } catch (hashError) {
      console.error("Error hashing password:", hashError);
      return res.status(500).json({ error: "Server error during sign-up" });
    }
  });
});

// Endpoint to handle sign-in
router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  console.log("Received sign-in request for email:", email);

  // Check if the user exists
  const query = "SELECT * FROM users WHERE email = ?";
  connection.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Server error during user fetch" });
    }

    if (results.length === 0) {
      console.warn("No user found with email:", email);
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = results[0];
    try {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        console.warn("Password mismatch for email:", email);
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Set the session userEmail
      req.session.userEmail = user.email;

      // Save the session and respond
      req.session.save((saveErr) => {
        if (saveErr) {
          console.error("Error saving session:", saveErr);
          return res
            .status(500)
            .json({ error: "Server error during session save" });
        }

        console.log("Sign-in successful for email:", email);
        // Successful sign-in, return the fullname and role
        return res.json({
          message: "Sign-in successful",
          fullname: user.fullname,
          role: user.role,
        });
      });
    } catch (compareError) {
      console.error("Error comparing passwords:", compareError);
      return res
        .status(500)
        .json({ error: "Server error during password comparison" });
    }
  });
});

// Endpoint to get all users
router.get("/all", (req, res) => {
  const query =
    "SELECT ID, fullname, email, phone_no, IFNULL(position, 'chưa cập nhật') AS position, IFNULL(date_joining, 'chưa cập nhật') AS date_joining, IFNULL(address, 'chưa cập nhật') AS address FROM users"; // Include ID field

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Server error during user fetch" });
    }
    return res.json(results);
  });
});

// Endpoint to fetch the user's details for the navbar and profile page
router.get("/current", (req, res) => {
  const userEmail = req.session.userEmail;
  const staffName = req.query.name; // Extract the 'name' parameter from the query

  // If both email and name are missing, return an error
  if (!userEmail && !staffName) {
    console.log("No user email or name found.");
    return res
      .status(401)
      .json({ error: "Not authenticated or user not specified" });
  }

  let query;
  let queryParam;

  // Determine the query based on the available information
  if (staffName) {
    console.log("Fetching data for staff name:", staffName);
    query =
      "SELECT fullname, email, phone_no, position, date_joining, address FROM users WHERE fullname = ?"; // Include new fields
    queryParam = [staffName];
  } else {
    console.log("Fetching data for user email:", userEmail);
    query =
      "SELECT fullname, email, phone_no, position, date_joining, address FROM users WHERE email = ?"; // Include new fields
    queryParam = [userEmail];
  }

  connection.query(query, queryParam, (err, results) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ error: "Server error during user fetch" });
    }

    if (results.length === 0) {
      console.log("User not found for the given identifier.");
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User data fetched:", results[0]);
    return res.json({
      fullname: results[0].fullname,
      email: results[0].email,
      phone_no: results[0].phone_no,
      position: results[0].position, // Include new fields
      date_joining: results[0].date_joining,
      address: results[0].address,
    });
  });
});

// Endpoint to update the user profile (email, phone number, and password)
router.post("/updateProfile", (req, res) => {
  const { email, currentPassword, newPassword, phoneNo } = req.body;
  const userEmail = req.session.userEmail;

  if (!userEmail) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  //Fetch the user to verify the current password
  const query = "SELECT * FROM users WHERE email = ?";
  connection.query(query, [userEmail], async (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Server error during user fetch" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = results[0];
    try {
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!passwordMatch) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }

      // If a new password is provided, hash it
      let updatedPassword = user.password;
      if (newPassword) {
        updatedPassword = await bcrypt.hash(newPassword, 10);
      }

      // Update user details
      const updateQuery =
        "UPDATE users SET email = ?, password = ?, phone_no = ? WHERE email = ?";
      connection.query(
        updateQuery,
        [email, updatedPassword, phoneNo, userEmail],
        (updateErr) => {
          if (updateErr) {
            console.error("Error updating user profile:", updateErr);
            return res
              .status(500)
              .json({ error: "Server error during profile update" });
          }

          // Update session email if it has changed
          req.session.userEmail = email;

          return res.json({
            success: true,
            message: "Profile updated successfully",
          });
        }
      );
    } catch (error) {
      console.error("Error updating profile:", error);
      return res
        .status(500)
        .json({ error: "Server error during profile update" });
    }
  });
});

// Endpoint to handle evaluation data update
router.post("/evaluation", (req, res) => {
  const { userId, performanceRating, attitudeRating, strengths, weaknesses } =
    req.body;

  console.log("Received evaluation update for userId:", userId); // Add this line

  // Check if all required fields are present
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  // Query to update the user's evaluation data
  const updateQuery = `
    UPDATE users
    SET 
      performance_rating = ?,
      attitude_rating = ?,
      strengths = ?,
      weaknesses = ?
    WHERE ID = ?
  `;

  const values = [
    performanceRating,
    attitudeRating,
    strengths,
    weaknesses,
    userId,
  ];

  connection.query(updateQuery, values, (err, result) => {
    if (err) {
      console.error("Error updating evaluation data:", err);
      return res
        .status(500)
        .json({ error: "Server error during evaluation update" });
    }

    if (result.affectedRows === 0) {
      console.log("User not found for ID:", userId); // Additional log
      return res.status(404).json({ error: "User not found" });
    }

    console.log("Evaluation data updated for user ID:", userId);
    return res.status(200).json({ message: "Evaluation updated successfully" });
  });
});

// Endpoint to fetch user details by name for dynamic reports
router.get("/by-name", (req, res) => {
  const staffName = req.query.name; // Extract the 'name' parameter from the query

  if (!staffName) {
    console.log("No staff name provided.");
    return res.status(400).json({ error: "Staff name is required" });
  }

  const query =
    "SELECT fullname, email, phone_no, position, date_joining, address FROM users WHERE fullname = ?"; // Include new fields
  connection.query(query, [staffName], (err, results) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ error: "Server error during user fetch" });
    }

    if (results.length === 0) {
      console.log("User not found for name:", staffName);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User data fetched:", results[0]);
    return res.json({
      fullname: results[0].fullname,
      email: results[0].email,
      phone_no: results[0].phone_no,
      position: results[0].position,
      date_joining: results[0].date_joining,
      address: results[0].address,
    });
  });
});

// Endpoint to update a user's data
router.post("/updatestaff", (req, res) => {
  const { ID, fullname, position, date_joining, address, phone_no, email } =
    req.body;

  // SQL query to update user data
  const query = `
    UPDATE users
    SET fullname = ?, position = ?, date_joining = ?, address = ?, phone_no = ?, email = ?
    WHERE ID = ?
  `;

  const values = [
    fullname,
    position,
    date_joining,
    address,
    phone_no,
    email,
    ID,
  ];

  // Execute the query
  connection.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating user data:", err);
      return res
        .status(500)
        .json({ success: false, error: "Failed to update user data" });
    }

    // Check if the user was found and updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.json({ success: true, message: "User updated successfully" });
  });
});

module.exports = router;
