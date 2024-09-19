const express = require("express");
const router = express.Router();
const connection = require("../database"); // Ensure this path is correct

// Endpoint to create a new order
router.post("/create", (req, res) => {
  const orderData = req.body;

  let productDetailsJSON;
  try {
    productDetailsJSON = JSON.stringify(orderData.productDetails);
  } catch (error) {
    console.error("Error stringifying product details:", error.message);
    return res.status(500).json({ error: "Error processing product details" });
  }

  // SQL with delivery details included
  const sql = `INSERT INTO customer_order 
               (staff_name, designer, customer_name, phone_no, payment_method, delivery_method, discount, amount_to_pay, note, product_details, product_name, product_width, product_length, quantity, deposited, payment_timing, delivery_company, delivery_fee, delivery_address, price, total_price, vat) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // Updated values including delivery details
  const values = [
    orderData.staffName || "",
    orderData.designer || "",
    orderData.customerName || "",
    orderData.phoneNo || "",
    orderData.paymentMethod || "",
    orderData.deliveryMethod || "",
    orderData.discount || 0,
    orderData.amountToPay || 0,
    orderData.note || "",
    productDetailsJSON,
    orderData.product_name || "",
    orderData.product_width || "",
    orderData.product_length || "",
    orderData.quantity || "",
    orderData.deposit || 0,
    orderData.payment_timing || null,
    orderData.delivery_company || "",
    orderData.delivery_fee || 0,
    orderData.delivery_address || "", // Added delivery_address
    orderData.price || 0,
    orderData.total_price || 0,
    orderData.vat || 0,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting order:", err.message);
      return res
        .status(500)
        .json({ error: "Error inserting order", details: err.message });
    }
    res.json({
      message: "Order created successfully",
      order_id: result.insertId,
    });
  });
});

// Endpoint to fetch orders
router.get("/", (req, res) => {
  const filter = req.query.filter || "order_id";
  const query = req.query.query || "";

  const allowedFilters = ["order_id", "customer_name", "staff_name"];
  if (!allowedFilters.includes(filter)) {
    return res.status(400).json({ error: "Invalid filter field" });
  }

  const sql = `SELECT * FROM customer_order WHERE ${filter} LIKE ?`;
  connection.query(sql, [`%${query}%`], (err, results) => {
    if (err) {
      console.error("Error fetching orders:", err.message);
      return res.status(500).json({ error: "Error fetching orders" });
    }
    res.json(results);
  });
});

// Endpoint to update order
router.put("/update/:id", (req, res) => {
  const orderData = req.body;
  const orderId = req.params.id;

  const sql = `
    UPDATE customer_order
    SET 
      staff_name = ?, 
      designer = ?, 
      customer_name = ?, 
      phone_no = ?, 
      payment_method = ?, 
      delivery_method = ?, 
      discount = ?, 
      amount_to_pay = ?, 
      note = ?, 
      product_details = ?, 
      product_name = ?,  
      product_width = ?,  
      product_length = ?,  
      quantity = ?,  
      deposited = ?, 
      payment_timing = ?, 
      delivery_company = ?, 
      delivery_fee = ?, 
      price = ?, 
      total_price = ?, 
      vat = ? 
    WHERE order_id = ?`;

  const values = [
    orderData.staff_name,
    orderData.designer,
    orderData.customer_name,
    orderData.phone_no,
    orderData.payment_method,
    orderData.delivery_method,
    orderData.discount,
    orderData.amount_to_pay,
    orderData.note,
    orderData.product_details,
    orderData.product_name,
    orderData.product_width,
    orderData.product_length,
    orderData.quantity,
    orderData.deposited,
    orderData.payment_timing,
    orderData.delivery_company,
    orderData.delivery_fee,
    orderData.price,
    orderData.total_price,
    orderData.vat,
    orderId,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating order:", err.message);
      return res.status(500).json({
        success: false,
        message: "Failed to update order.",
        details: err.message,
      });
    }
    res.json({ success: true, message: "Order updated successfully!" });
  });
});

// Endpoint to update payment details in the customer_order table
router.put("/order_payments/update/:order_id", (req, res) => {
  const { order_id } = req.params;
  const {
    payment_method_2,
    payment_timing_2,
    deposited_2,
    payment_method_3,
    payment_timing_3,
    deposited_3,
    note_payment,
    VAT_number, // Add VAT_number to the destructuring
  } = req.body;

  const checkQuery = `SELECT * FROM customer_order WHERE order_id = ?`;
  connection.query(checkQuery, [order_id], (err, results) => {
    if (err) {
      console.error("Error checking payment entry:", err);
      return res.status(500).json({
        success: false,
        message: "Database error",
        details: err.message,
      });
    }

    if (results.length > 0) {
      let updateQuery;
      let updateValues;

      if (!results[0].payment_method_2) {
        updateQuery = `
          UPDATE customer_order 
          SET payment_method_2 = ?, payment_timing_2 = ?, deposited_2 = ?, note_payment = ?, VAT_number = ? 
          WHERE order_id = ?
        `;
        updateValues = [
          payment_method_2,
          payment_timing_2,
          deposited_2,
          note_payment,
          VAT_number, // Include VAT_number in the values
          order_id,
        ];
      } else if (!results[0].payment_method_3) {
        updateQuery = `
          UPDATE customer_order 
          SET payment_method_3 = ?, payment_timing_3 = ?, deposited_3 = ?, note_payment = ?, VAT_number = ? 
          WHERE order_id = ?
        `;
        updateValues = [
          payment_method_3,
          payment_timing_3,
          deposited_3,
          note_payment,
          VAT_number, // Include VAT_number in the values
          order_id,
        ];
      } else {
        return res.status(400).json({
          success: false,
          message: "All payment slots are already filled.",
        });
      }

      connection.query(updateQuery, updateValues, (updateError) => {
        if (updateError) {
          console.error("Error updating payment details:", updateError);
          return res.status(500).json({
            success: false,
            message: "Failed to update payment details.",
            details: updateError.message,
          });
        }
        return res.json({
          success: true,
          message: "Payment details updated successfully",
        });
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }
  });
});

// Endpoint to fetch payment details for a specific order
router.get("/payment_details/:order_id", (req, res) => {
  const { order_id } = req.params;

  const sql = `
    SELECT 
      order_id, 
      payment_method, 
      payment_timing, 
      deposited, 
      payment_method_2, 
      payment_timing_2, 
      deposited_2, 
      payment_method_3, 
      payment_timing_3, 
      deposited_3,
      note_payment 
    FROM customer_order 
    WHERE order_id = ?`;

  connection.query(sql, [order_id], (err, results) => {
    if (err) {
      console.error("Error fetching payment details:", err.message);
      return res.status(500).json({
        success: false,
        message: "Error fetching payment details",
        details: err.message,
      });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    res.json(results[0]);
  });
});

// Endpoint to fetch order details for the delivery note
router.get("/order_details/:order_id", (req, res) => {
  const { order_id } = req.params;

  const sql = `
    SELECT 
      order_id,
      staff_name,
      customer_name,
      phone_no,
      product_name, -- Ensure this field is included
      product_details,
      product_width, 
      product_length,
      quantity,
      price,
      total_price,
      vat,
      delivery_fee,
      deposited,
      deposited_2,
      deposited_3,
      delivery_address, -- Ensure this field is included
      (total_price + vat + delivery_fee - (deposited + COALESCE(deposited_2, 0) + COALESCE(deposited_3, 0))) AS remaining_balance
    FROM customer_order 
    WHERE order_id = ?`;

  connection.query(sql, [order_id], (err, results) => {
    if (err) {
      console.error("Error fetching order details:", err.message);
      return res.status(500).json({
        success: false,
        message: "Error fetching order details",
        details: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.json(results[0]);
  });
});

// Endpoint to save delivery details directly to customer_order
router.post("/saveDeliveryDetails", (req, res) => {
  const {
    delivery_method,
    delivery_fee,
    delivery_company,
    delivery_address,
    order_id,
  } = req.body;

  const sql = `UPDATE customer_order SET delivery_method = ?, delivery_fee = ?, delivery_company = ?, delivery_address = ? WHERE order_id = ?`;
  const values = [
    delivery_method,
    delivery_fee,
    delivery_company,
    delivery_address,
    order_id,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating delivery details:", err.message);
      return res.status(500).json({
        success: false,
        message: "Error saving delivery details",
        details: err.message,
      });
    }

    res.json({
      success: true,
      message: "Delivery details updated successfully",
      orderId: order_id,
    });
  });
});

// Endpoint to fetch weekly summary or weekly summary with daily breakdown
router.get("/weekly-summary", (req, res) => {
  const { staff_name, daily, start_date, end_date } = req.query;

  if (!staff_name) {
    return res.status(400).json({ error: "Staff name is required" });
  }

  if (!start_date || !end_date) {
    return res
      .status(400)
      .json({ error: "Start date and end date are required" });
  }

  let sql;
  let params = [staff_name, start_date, end_date];

  if (daily === "true") {
    // SQL query to get daily breakdown within the date range with proper time zone handling
    sql = `
      SELECT 
        staff_name,
        DATE(CONVERT_TZ(payment_timing, '+00:00', '+07:00')) AS day,
        COUNT(*) AS total_orders,
        SUM(amount_to_pay) AS total_amount,
        SUM(CASE WHEN status = 'Hoàn Tất' THEN total_price ELSE 0 END) AS completed_amount,
        COUNT(CASE WHEN status = 'Hoàn Tất' THEN 1 ELSE NULL END) AS completed,
        COUNT(CASE WHEN status = 'Đang thực hiện' THEN 1 ELSE NULL END) AS processing,
        COUNT(CASE WHEN status = 'Đã huỷ' THEN 1 ELSE NULL END) AS cancelled,
        COUNT(CASE WHEN status IS NULL THEN 1 ELSE NULL END) AS notUpdated
      FROM customer_order
      WHERE staff_name = ?
        AND DATE(CONVERT_TZ(payment_timing, '+00:00', '+07:00')) BETWEEN ? AND ?
      GROUP BY staff_name, DATE(CONVERT_TZ(payment_timing, '+00:00', '+07:00'))
      ORDER BY DATE(CONVERT_TZ(payment_timing, '+00:00', '+07:00'));
    `;
  } else {
    // SQL query to get weekly summary with order status breakdown within the date range
    sql = `
      SELECT 
        staff_name,
        COUNT(*) AS total_orders,
        SUM(amount_to_pay) AS total_amount,
        SUM(CASE WHEN status = 'Hoàn Tất' THEN total_price ELSE 0 END) AS completed_amount,
        COUNT(CASE WHEN status = 'Hoàn Tất' THEN 1 ELSE NULL END) AS completed,
        COUNT(CASE WHEN status = 'Đang thực hiện' THEN 1 ELSE NULL END) AS processing,
        COUNT(CASE WHEN status = 'Đã huỷ' THEN 1 ELSE NULL END) AS cancelled,
        COUNT(CASE WHEN status IS NULL THEN 1 ELSE NULL END) AS notUpdated
      FROM customer_order
      WHERE staff_name = ? 
        AND DATE(CONVERT_TZ(payment_timing, '+00:00', '+07:00')) BETWEEN ? AND ?
      GROUP BY staff_name;
    `;
  }

  // Execute the query
  connection.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error fetching weekly summary:", err.message);
      return res.status(500).json({ error: "Error fetching weekly summary" });
    }

    // Return the results
    res.json(daily === "true" ? results : results[0] || {});
  });
});

// Correctly defined route to fetch weekly summary without filtering by staff name
router.get("/weekly-summary-ad", (req, res) => {
  const { daily, start_date, end_date } = req.query;

  if (!start_date || !end_date) {
    return res
      .status(400)
      .json({ error: "Start date and end date are required" });
  }

  let sql;
  let params = [start_date, end_date];

  if (daily === "true") {
    sql = `
      SELECT 
        DATE(CONVERT_TZ(payment_timing, '+00:00', '+07:00')) AS day,
        COUNT(*) AS total_orders,
        SUM(amount_to_pay) AS total_amount,
        SUM(CASE WHEN status = 'Hoàn Tất' THEN total_price ELSE 0 END) AS completed_amount,
        COUNT(CASE WHEN status = 'Hoàn Tất' THEN 1 ELSE NULL END) AS completed,
        COUNT(CASE WHEN status = 'Đang thực hiện' THEN 1 ELSE NULL END) AS processing,
        COUNT(CASE WHEN status = 'Đã huỷ' THEN 1 ELSE NULL END) AS cancelled,
        COUNT(CASE WHEN status IS NULL THEN 1 ELSE NULL END) AS notUpdated
      FROM customer_order
      WHERE DATE(CONVERT_TZ(payment_timing, '+00:00', '+07:00')) BETWEEN ? AND ?
      GROUP BY DATE(CONVERT_TZ(payment_timing, '+00:00', '+07:00'))
      ORDER BY DATE(CONVERT_TZ(payment_timing, '+00:00', '+07:00'));
    `;
  } else {
    sql = `
      SELECT 
        COUNT(*) AS total_orders,
        SUM(amount_to_pay) AS total_amount,
        SUM(CASE WHEN status = 'Hoàn Tất' THEN total_price ELSE 0 END) AS completed_amount,
        COUNT(CASE WHEN status = 'Hoàn Tất' THEN 1 ELSE NULL END) AS completed,
        COUNT(CASE WHEN status = 'Đang thực hiện' THEN 1 ELSE NULL END) AS processing,
        COUNT(CASE WHEN status = 'Đã huỷ' THEN 1 ELSE NULL END) AS cancelled,
        COUNT(CASE WHEN status IS NULL THEN 1 ELSE NULL END) AS notUpdated
      FROM customer_order
      WHERE DATE(CONVERT_TZ(payment_timing, '+00:00', '+07:00')) BETWEEN ? AND ?
    `;
  }

  connection.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error fetching weekly summary:", err.message);
      return res.status(500).json({ error: "Error fetching weekly summary" });
    }

    res.json(daily === "true" ? results : results[0] || {});
  });
});

// Endpoint to update the status of an order
router.put("/update-status/:order_id", (req, res) => {
  const { order_id } = req.params;
  const { status } = req.body;

  // Validate the status value
  const allowedStatuses = ["Hoàn Tất", "Đang thực hiện", "Đã huỷ"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  const sql = `UPDATE customer_order SET status = ? WHERE order_id = ?`;

  connection.query(sql, [status, order_id], (err, result) => {
    if (err) {
      console.error("Error updating status:", err.message);
      return res.status(500).json({
        success: false,
        message: "Failed to update status",
        details: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Status updated successfully" });
  });
});

module.exports = router;
