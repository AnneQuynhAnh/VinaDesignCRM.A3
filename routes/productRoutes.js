const express = require("express");
const router = express.Router();
const connection = require("../database");

// Endpoint to get all products
router.get("/", (req, res) => {
  const query = "SELECT DISTINCT product_name FROM pricefull";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).json({ error: "Error fetching products" });
      return;
    }
    res.json(results);
  });
});

// Endpoint to get product specifications
router.get("/product-specifications", (req, res) => {
  const productName = req.query.productName;
  const query =
    "SELECT DISTINCT product_specification FROM pricefull WHERE product_name = ?";
  connection.query(query, [productName], (err, results) => {
    if (err) {
      console.error("Error fetching product specifications:", err);
      res.status(500).json({ error: "Error fetching product specifications" });
      return;
    }
    res.json(results);
  });
});

// Endpoint to get product price based on product name and specification
router.get("/product-price", (req, res) => {
  const { productName, productSpecification } = req.query;
  const query =
    "SELECT price_perm2, price_per_unit FROM pricefull WHERE product_name = ? AND product_specification = ?";
  connection.query(
    query,
    [productName, productSpecification],
    (err, results) => {
      if (err) {
        console.error("Error fetching product price:", err);
        res.status(500).json({ error: "Error fetching product price" });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: "Product price not found" });
        return;
      }
      res.json(results[0]);
    }
  );
});

// Endpoint to get max_side and extra_supply
router.get("/product-max-side", (req, res) => {
  const productName = req.query.productName;
  console.log("Fetching max side for product:", productName); // Log for debugging
  const query =
    "SELECT max_side, extra_supply FROM pricefull WHERE product_name = ?";

  connection.query(query, [productName], (error, results) => {
    if (error) {
      console.error("Error fetching max side:", error); // Log error
      return res.status(500).json({ error: "Database query failed" });
    }
    if (results.length === 0) {
      console.log("Product not found:", productName); // Log not found
      return res.status(404).json({ error: "Product not found" });
    }
    console.log("Max side and extra supply fetched:", results[0]); // Log results
    res.json(results[0]);
  });
});

// Endpoint to search for products by name
router.get("/search-products", (req, res) => {
  const searchTerm = req.query.searchTerm;

  const query = `
    SELECT 
      product_id, 
      product_name, 
      price_perm2, 
      price_per_unit, 
      \`whole-sale\` 
    FROM 
      pricefull 
    WHERE 
      product_name LIKE ?`;

  connection.query(query, [`%${searchTerm}%`], (err, results) => {
    if (err) {
      console.error("Error searching products:", err);
      res.status(500).json({ error: "Error searching products" });
      return;
    }
    res.json(results);
  });
});

// Endpoint to get a specific product by ID
router.get("/get", (req, res) => {
  const productId = req.query.id;
  const query = "SELECT * FROM pricefull WHERE product_id = ?";

  connection.query(query, [productId], (err, results) => {
    if (err) {
      console.error("Error fetching product details:", err);
      res.status(500).json({ success: false });
    } else {
      res.json(results[0]); // Send the product details as a JSON object
    }
  });
});

// Endpoint to handle adding a product
router.post("/add", (req, res) => {
  const {
    product_name,
    product_specification,
    price_perm2,
    price_per_unit,
    extra_supply,
    whole_sale,
    quantity_frame,
    note,
  } = req.body;

  // SQL query to insert the data into the pricefull table
  const query = `
    INSERT INTO pricefull 
    (product_name, product_specification, price_perm2, price_per_unit, extra_supply, \`whole-sale\`, \`quantity frame\`, \`Note\`) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [
      product_name,
      product_specification,
      price_perm2,
      price_per_unit,
      extra_supply,
      whole_sale,
      quantity_frame,
      note,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting product:", err);
        res.status(500).json({ success: false });
      } else {
        res.json({ success: true });
      }
    }
  );
});

// Endpoint to handle updating a product
router.post("/update", (req, res) => {
  const {
    product_id,
    product_name,
    product_specification,
    price_perm2,
    price_per_unit,
    extra_supply,
    whole_sale,
    quantity_frame,
    note,
  } = req.body;

  const query = `
    UPDATE pricefull 
    SET product_name = ?, product_specification = ?, price_perm2 = ?, price_per_unit = ?, 
        extra_supply = ?, \`whole-sale\` = ?, \`quantity frame\` = ?, \`Note\` = ?
    WHERE product_id = ?`;

  connection.query(
    query,
    [
      product_name,
      product_specification,
      price_perm2,
      price_per_unit,
      extra_supply,
      whole_sale,
      quantity_frame,
      note,
      product_id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ success: false });
      } else {
        res.json({ success: true });
      }
    }
  );
});

module.exports = router;
