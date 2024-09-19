const express = require("express");
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const connection = require("./database"); // Ensure your database connection is correctly set up
const app = express();
const port = 3007;

// Ensure the MySQL connection is properly set up for the session store
const sessionStore = new MySQLStore({}, connection.promise());

// Set up the session middleware
app.use(
  session({
    key: "user_sid",
    secret: "your_secret_key", // Replace with a secure key
    store: sessionStore, // Use MySQLStore for session storage
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (like HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Custom middleware to check session and user authentication
app.use((req, res, next) => {
  console.log("Session middleware check:", req.session);
  next();
});

// Import route files
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const congnoRoutes = require("./routes/congnoRoutes");

// Register routes
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
app.use("/congno", congnoRoutes);

// Serve the sign-up page
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "HTML", "signup.html"));
});

// Serve the sign-in page (if needed)
app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "HTML", "signin.html"));
});

// Error handling for 404 (Not Found)
app.use((req, res, next) => {
  res.status(404).send("Sorry, that route doesn't exist.");
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
