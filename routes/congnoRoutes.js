const express = require("express");
const router = express.Router();
const connection = require("../database");
const multer = require("multer");

// Configure Multer to store uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the upload directory (ensure 'uploads/' exists)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Use a unique file name
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Set a file size limit (e.g., 10 MB)
});

// Endpoint to handle form submission with file upload
router.post("/save-data", upload.single("billPhoto"), (req, res) => {
  const { orderNumber, companyName, products, price, status } = req.body;
  const billPhotoPath = req.file ? `/uploads/${req.file.filename}` : null; // Store the relative path to the file

  const query = `INSERT INTO congno (order_id, company_name, product_details, price, status, bill_photo)
                 VALUES (?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [orderNumber, companyName, products, price, status, billPhotoPath],
    (err, result) => {
      if (err) {
        console.error("Error saving data:", err);
        return res
          .status(500)
          .json({ message: "Failed to save data", error: err });
      }
      res.json({ message: "Data saved successfully", result });
    }
  );
});

// Endpoint to fetch data from the database
router.get("/get-data", (req, res) => {
  const query = "SELECT * FROM congno";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data from 'congno' table:", err.message);
      return res
        .status(500)
        .json({ error: "Error fetching data from database." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No records found." });
    }

    res.json(results);
  });
});

// Endpoint to fetch a specific order by ID
router.get("/get-order/:id", (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM congno WHERE order_id = ?`; // Changed from 'ID' to 'order_id'

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching order details:", err);
      return res.status(500).json({ error: "Failed to fetch order details" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(results[0]);
  });
});

// Endpoint to update an order
router.post("/update-order", upload.single("billPhoto"), (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);

  const { orderNumber, companyName, products, price, status, orderId } =
    req.body;
  const billPhotoPath = req.file ? req.file.path : null;

  // Ensure all required fields are present
  if (
    !orderNumber ||
    !companyName ||
    !products ||
    !price ||
    !status ||
    !orderId
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `UPDATE congno SET order_id = ?, company_name = ?, product_details = ?, price = ?, status = ?, bill_photo = ? WHERE ID = ?`;
  const values = [
    orderNumber,
    companyName,
    products,
    price,
    status,
    billPhotoPath,
    orderId,
  ];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating order:", err);
      return res
        .status(500)
        .json({ error: "Failed to update order", details: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Order not found or not updated" });
    }

    res.json({ message: "Order updated successfully" });
  });
});

module.exports = router;
