document.addEventListener("DOMContentLoaded", function () {
  const filterIcon = document.querySelector(".filter-icon");
  const filterDropdown = document.querySelector(".filter-dropdown");

  // Correctly reference the modal element
  const modal = document.getElementById("billingModal");
  const closeModalButton = document.querySelector(".close");

  // Toggle filter dropdown visibility
  filterIcon.addEventListener("click", function () {
    filterDropdown.style.display =
      filterDropdown.style.display === "block" ? "none" : "block";
  });

  // Close modal when the user clicks on <span> (x)
  closeModalButton.addEventListener("click", function () {
    closeModal();
  });

  // Close modal when the user clicks anywhere outside of the modal
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      closeModal();
    }
  });

  // Function to close the modal
  window.closeModal = function () {
    modal.style.display = "none";
  };

  // Set minimum date for date inputs
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  dateInputs.forEach((input) => {
    input.setAttribute("min", today);
  });

  // Function to populate the edit payment section
  function populateEditPaymentSection(order) {
    const modalContent = document.querySelector(".modal-content");

    // Create the form for updating the next payment
    // Create the form for updating the next payment
    const editForm = `
    

       <h2>Cập nhật thanh toán</h2>
       <input type="radio" id="paymentCash" name="payment" value="Tiền mặt" ${
         order.payment_method_2 === "Tiền mặt" ? "checked" : ""
       } />
       <label for="paymentCash">Tiền mặt</label>
       <input type="radio" id="paymentTransaction" name="payment" value="Chuyển Khoản" ${
         order.payment_method_2 === "Chuyển Khoản" ? "checked" : ""
       } />
       <label for="paymentTransaction">Chuyển Khoản</label>
   
       <!-- New VAT Invoice Number Section -->
       <div id="vatInvoiceSection" style="margin-top: 10px;">
         <p>
           Mã đơn VAT:
           <input type="text" id="vatNumber" value="${
             order.VAT_number || ""
           }" placeholder="Nhập mã đơn VAT" style="color: black; border-radius:8px;  border: 1px solid #ccc; padding: 5px;" />
         </p>
       </div>
   
     <div id="cashDetails" class="${
       order.payment_method_2 === "Tiền mặt" ? "" : "hidden"
     }">
     <p>Thời gian: 
       <input 
         type="date" 
         id="timeReceiveCash" 
         value="${
           order.payment_timing_2
             ? new Date(order.payment_timing_2).toISOString().split("T")[0]
             : ""
         }" 
         min="${today}" 
         style="color: black; border-radius: 8px; border: 1px solid #ccc; padding: 5px;" 
       />  
     </p>
     <p>Tiền đặt cọc: 
       <input 
         type="number" 
         id="depositedAmountCash" 
         value="${order.deposited_2 || 0}" 
         style="color: black; border-radius: 8px; border: 1px solid #ccc; padding: 5px;" 
       />
     </p>
   </div>
   
   
   <div id="transactionDetails" class="${
     order.payment_method_2 === "Chuyển Khoản" ? "" : "hidden"
   }">
     <p>Thời gian: 
       <input 
         type="date" 
         id="timeTransaction" 
         value="${
           order.payment_timing_2
             ? new Date(order.payment_timing_2).toISOString().split("T")[0]
             : ""
         }" 
         min="${today}" 
         style="color: black; border-radius: 8px; border: 1px solid #ccc; padding: 5px;" 
       />
     </p>
     <p>Tiền đặt cọc: 
       <input 
         type="number" 
         id="depositedAmountTransaction" 
         value="${order.deposited_2 || 0}" 
         style="color: black; border-radius: 8px; border: 1px solid #ccc; padding: 5px;" 
       /> 
     </p>
     <p>Ngân hàng:</p>
     <input 
       type="radio" 
       id="vietcombank" 
       name="bank" 
       value="Vietcombank" 
       ${order.bank === "Vietcombank" ? "checked" : ""} 
       style="margin-right: 5px;" 
     />
     <label for="vietcombank">Vietcombank</label>
     <input 
       type="radio" 
       id="acb" 
       name="bank" 
       value="ACB" 
       ${order.bank === "ACB" ? "checked" : ""} 
       style="margin-left: 10px; margin-right: 5px;" 
     />
     <label for="acb">ACB</label>
   </div>
   
   
       <p>Ghi chú: <input type="text" id="noteDetails" value="${
         order.note || ""
       }" placeholder="Thêm ghi chú"  style="color: black; border-radius: 8px; border: 1px solid #ccc; padding: 5px;"/></p>
   
       <!-- Update Payment Button with Styling -->
       <button id="editUpdateButton" style="background-color: #df2524; color: white; border: none; border-radius:25px; padding: 10px 20px; cursor: pointer; font-size: 16px; display: block; margin: 20px auto;">Cập nhật Thanh Toán</button>
     `;

    modalContent.innerHTML = editForm;

    // Add event listeners for payment method radio buttons
    document
      .getElementById("paymentCash")
      .addEventListener("change", function () {
        document.getElementById("cashDetails").classList.remove("hidden");
        document.getElementById("transactionDetails").classList.add("hidden");
      });

    document
      .getElementById("paymentTransaction")
      .addEventListener("change", function () {
        document
          .getElementById("transactionDetails")
          .classList.remove("hidden");
        document.getElementById("cashDetails").classList.add("hidden");
      });

    // Add event listener to handle the update button click
    const editUpdateButton = document.getElementById("editUpdateButton");
    editUpdateButton.addEventListener("click", function () {
      handleEditPaymentUpdate(order);
    });
  }

  // Function to handle payment updates
  function handleEditPaymentUpdate(order) {
    const orderId = order.order_id; // Use order object to fetch order_id

    // Get the selected payment method
    const paymentMethodElement = document.querySelector(
      'input[name="payment"]:checked'
    );

    if (!paymentMethodElement) {
      alert("Vui lòng chọn phương thức thanh toán.");
      return;
    }

    const paymentMethod = paymentMethodElement.value;
    let finalPaymentMethod = paymentMethod;

    // Determine if the user selected "Chuyển khoản" and capture the bank name
    if (paymentMethod === "Chuyển Khoản") {
      const selectedBankElement = document.querySelector(
        'input[name="bank"]:checked'
      );

      if (selectedBankElement) {
        const selectedBank = selectedBankElement.value;
        finalPaymentMethod = `Chuyển khoản ${selectedBank}`;
      } else {
        alert("Vui lòng chọn ngân hàng.");
        return; // Exit the function if no bank is selected
      }
    }

    // Retrieve payment timing and amount based on the payment method
    const paymentTimingElement =
      paymentMethod === "Tiền mặt"
        ? document.getElementById("timeReceiveCash")
        : document.getElementById("timeTransaction");
    const paymentTiming = paymentTimingElement
      ? paymentTimingElement.value
      : null;

    const depositedAmountElement =
      paymentMethod === "Tiền mặt"
        ? document.getElementById("depositedAmountCash")
        : document.getElementById("depositedAmountTransaction");
    const depositedAmount = depositedAmountElement
      ? depositedAmountElement.value
      : null;

    // Ensure payment timing and amount are available
    if (!paymentTiming || !depositedAmount) {
      alert("Vui lòng điền đầy đủ thông tin thanh toán.");
      return;
    }

    // Retrieve note details
    const noteDetails = document.getElementById("noteDetails")?.value || "";

    // Prepare the payment data dynamically based on which payment slot is available
    const paymentData = {
      order_id: orderId,
      note_payment: noteDetails, // Send note details to the Note_payment column
    };

    if (!order.payment_method_2) {
      paymentData.payment_method_2 = finalPaymentMethod;
      paymentData.payment_timing_2 = paymentTiming;
      paymentData.deposited_2 = depositedAmount;
    } else if (!order.payment_method_3) {
      paymentData.payment_method_3 = finalPaymentMethod;
      paymentData.payment_timing_3 = paymentTiming;
      paymentData.deposited_3 = depositedAmount;
    } else {
      alert("Đã hết lượt giao dịch.");
      return;
    }

    console.log("Updating Payment Data:", paymentData); // Debugging purpose: Check values before sending

    fetch(`/orders/order_payments/update/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Cập nhật giao dịch thành công!");
          modal.style.display = "none";
          fetchOrders(); // Refresh the order list
        } else {
          alert("Cập nhật giao dịch thất bại.");
        }
      })
      .catch((error) => console.error("Lỗi cập nhật giao dịch:", error));
  }

  // Function to fetch and display orders
  function fetchOrders(filter = "order_id", query = "") {
    fetch(`/orders?filter=${filter}&query=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Orders fetched:", data);
        const container = document.querySelector(".container");
        container.innerHTML = ""; // Clear existing content

        // Sort orders by order_id in descending order
        data.sort((a, b) => b.order_id - a.order_id);

        // Separate matching and non-matching orders
        let matchedOrders = [];
        let otherOrders = [];

        data.forEach((order) => {
          if (matchesQuery(order, filter, query)) {
            matchedOrders.push(order);
          } else {
            otherOrders.push(order);
          }
        });

        // Combine matched and non-matched orders, then limit to 10
        const displayedOrders = matchedOrders.concat(otherOrders).slice(0, 10);

        // Display the orders
        displayedOrders.forEach((order) => {
          const orderDiv = createOrderDiv(order);
          container.appendChild(orderDiv);
        });

        // Attach event listeners to "Đã thu" sections
        attachChargedSectionEventListeners();
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }

  // Function to check if the order matches the search query
  function matchesQuery(order, filter, query) {
    const value = order[filter];
    if (typeof value === "string" || typeof value === "number") {
      return value.toString().toLowerCase().includes(query.toLowerCase());
    }
    return false;
  }

  // Function to create the order div dynamically
  function createOrderDiv(order) {
    const orderDiv = document.createElement("div");
    orderDiv.classList.add("order");

    // Section code
    const sectionCode = document.createElement("div");
    sectionCode.classList.add("section", "code");
    const orderId = document.createElement("p");
    orderId.textContent = `#${order.order_id}`;
    sectionCode.appendChild(orderId);
    orderDiv.appendChild(sectionCode);

    // Section info
    const sectionInfo = document.createElement("div");
    sectionInfo.classList.add("section", "info");
    const columnDiv = document.createElement("div");
    columnDiv.classList.add("column");

    const customerInfo = document.createElement("p");
    customerInfo.textContent = `Tên KH: ${order.customer_name || ""} SĐT: ${
      order.phone_no || ""
    }`;
    columnDiv.appendChild(customerInfo);

    const amountInfo = document.createElement("p");
    amountInfo.textContent = `Số tiền KH trả: ${
      order.amount_to_pay || "0.00"
    } VND`;
    columnDiv.appendChild(amountInfo);

    const productInfo = document.createElement("p");
    productInfo.textContent = `Sản phẩm: ${order.product_details || "null"}`;
    columnDiv.appendChild(productInfo);

    sectionInfo.appendChild(columnDiv);
    orderDiv.appendChild(sectionInfo);

    // Section charged
    const sectionCharged = document.createElement("div");
    sectionCharged.classList.add("section", "charged");
    const chargedInfo = document.createElement("p");

    // Calculate 'Đã thu' value in VND
    const totalDeposited =
      (parseFloat(order.deposited) || 0) +
      (parseFloat(order.deposited_2) || 0) +
      (parseFloat(order.deposited_3) || 0);
    chargedInfo.textContent = `Đã thu: ${totalDeposited.toFixed(3)} VND`;
    sectionCharged.appendChild(chargedInfo);
    orderDiv.appendChild(sectionCharged);

    // Section actions
    const sectionActions = document.createElement("div");
    sectionActions.classList.add("section", "actions");

    const resultDiv = document.createElement("div");
    resultDiv.classList.add("result");

    const statusBtn = document.createElement("button");
    statusBtn.classList.add("status-btn");
    statusBtn.textContent = order.status || "Đang thực hiện"; // Set the initial status
    statusBtn.setAttribute("data-order-id", order.order_id); // Set the orderId
    resultDiv.appendChild(statusBtn);
    sectionActions.appendChild(resultDiv);

    // Add click event for the status button
    statusBtn.addEventListener("click", function () {
      showStatusSelectionPopup(order.order_id, statusBtn);
    });

    // Add print and edit icons
    const printIcon = document.createElement("img");
    printIcon.src = "../Assets/images/printericons-02.png";
    printIcon.alt = "Biểu tượng in";
    printIcon.classList.add("icon-btn");

    const newIcon = document.createElement("img");
    newIcon.src = "../Assets/images/deliveryman-03.png";
    newIcon.alt = "Biểu tượng giao hàng";
    newIcon.classList.add("icon-btn");

    const editIcon = document.createElement("img");
    editIcon.src = "/Assets/images/editpic.png";
    editIcon.alt = "Biểu tượng chỉnh sửa";
    editIcon.classList.add("icon-btn");

    // Add the icons to the actions section in the correct order
    sectionActions.appendChild(printIcon);
    sectionActions.appendChild(newIcon);
    sectionActions.appendChild(editIcon);

    // Add click event for the edit icon
    editIcon.addEventListener("click", function () {
      populateEditPaymentSection(order);
      modal.style.display = "block";
    });

    // Add click event for the print icon
    printIcon.addEventListener("click", function () {
      generateAndPrintBillContent(order);
    });

    // Add click event for the new icon to display the delivery details popup
    newIcon.addEventListener("click", function () {
      const orderId = this.closest(".order")
        .querySelector(".code p")
        .textContent.slice(1); // Remove the '#' prefix

      console.log("Fetching delivery details for order ID:", orderId); // Debugging

      // Fetch order details from the backend
      fetch(`/orders/order_details/${orderId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success === false) {
            alert(data.message);
          } else {
            showDeliveryDetailsPopup(data); // Call to show delivery details popup (New Function)
          }
        })
        .catch((error) => {
          console.error("Error fetching order details:", error);
        });
    });

    orderDiv.appendChild(sectionActions);

    return orderDiv;
  }

  // Function to show the status selection popup
  function showStatusSelectionPopup(orderId, statusButton) {
    // Create a simple popup for selecting the status
    const statusPopup = document.createElement("div");
    statusPopup.classList.add("status-popup");
    statusPopup.innerHTML = `
      <div class="status-popup-content">
        <!-- "X" Close Button -->
        <span class="close-popup">&times;</span> 
        <h3>Chọn Trạng Thái</h3>
        <button class="status-option" data-status="Hoàn Tất">Hoàn Tất</button>
        <button class="status-option" data-status="Đang thực hiện">Đang thực hiện</button>
        <button class="status-option" data-status="Đã huỷ">Bị Huỷ</button>
      </div>
    `;

    document.body.appendChild(statusPopup);

    // Close popup when the "X" button is clicked
    statusPopup
      .querySelector(".close-popup")
      .addEventListener("click", function () {
        statusPopup.remove();
      });

    // Add event listeners for status options
    statusPopup.querySelectorAll(".status-option").forEach(function (option) {
      option.addEventListener("click", function () {
        const selectedStatus = this.getAttribute("data-status");
        updateOrderStatus(orderId, selectedStatus, statusButton); // Pass the button to update its text
        statusPopup.remove(); // Remove the popup after selection
      });
    });
  }

  // Function to update the order status
  function updateOrderStatus(orderId, status, statusButton) {
    console.log("Order ID:", orderId);
    console.log("New Status:", status);

    fetch(`/orders/update-status/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: status }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data.success) {
          alert("Status updated successfully");
          statusButton.textContent = status; // Update the button text with the new status
        } else {
          alert("Failed to update status");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const getOrderId = () => {
    // Placeholder implementation; replace with actual logic
    return 1;
  };

  // Function to attach event listeners to "Đã thu" sections
  function attachChargedSectionEventListeners() {
    const chargedSections = document.querySelectorAll(".section.charged");

    chargedSections.forEach((section) => {
      section.addEventListener("click", function () {
        const orderId = section
          .closest(".order")
          .querySelector(".code p")
          .textContent.slice(1); // Extract order_id

        // Fetch payment details for the clicked order
        fetchPaymentDetails(orderId);
      });
    });
  }

  // Function to fetch payment details from the server
  function fetchPaymentDetails(orderId) {
    fetch(`/orders/payment_details/${orderId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          showPaymentDetailsModal(data);
        } else {
          alert("No payment details found for this order.");
        }
      })
      .catch((error) =>
        console.error("Error fetching payment details:", error)
      );
  }

  // Function to display payment details in a modal
  function showPaymentDetailsModal(data) {
    const modalContent = document.querySelector(".modal-content");
    modalContent.innerHTML = `
    <h2>Chi tiết thanh toán đơn #${data.order_id}</h2>
    <p>Lần thanh toán 1: ${data.deposited} - ${
      data.payment_method
    } on ${new Date(data.payment_timing).toLocaleString()}</p>
    <p>Lần thanh toán 2: ${data.deposited_2 || "N/A"} - ${
      data.payment_method_2 || "N/A"
    } on ${
      data.payment_timing_2
        ? new Date(data.payment_timing_2).toLocaleString()
        : "N/A"
    }</p>
    <p>Lần thanh toán 3: ${data.deposited_3 || "N/A"} - ${
      data.payment_method_3 || "N/A"
    } on ${
      data.payment_timing_3
        ? new Date(data.payment_timing_3).toLocaleString()
        : "N/A"
    }</p>
    <p>Ghi chú: ${data.note_payment || "Không có ghi chú."}</p>
    <button class="close" onclick="closeModal()">X</button>
  `;

    modal.style.display = "block";
  }

  function showDeliveryPopup(order) {
    const totalPrice = parseFloat(order.total_price || 0);
    const deposited1 = parseFloat(order.deposited || 0);
    const deposited2 = parseFloat(order.deposited_2 || 0);
    const deposited3 = parseFloat(order.deposited_3 || 0);
    const deliveryFee = parseFloat(order.delivery_fee || 0);

    // Calculate the total deposited amount
    const totalDeposited = deposited1 + deposited2 + deposited3;

    // Calculate remaining amount and amount to pay
    const remainingAmount = totalPrice - totalDeposited;
    const amountToPay = remainingAmount + deliveryFee;

    const deliveryContent = `
    <div class="bill">
      <h1>Phiếu Giao Nhận</h1>
      <p class="date">${new Date().toLocaleDateString("vi-VN")}</p>
  
      <!-- Table Section -->
      <table class="bill-table">
        <thead>
          <tr>
            <td colspan="7" style="text-align: left;"><strong>Tên KH: ${
              order.customer_name || ""
            }</strong></td>
          </tr>
          <tr>
            <td colspan="7" style="text-align: left;"><strong>SĐT: ${
              order.phone_no || ""
            }</strong></td>
          </tr>
          <tr>
            <td colspan="7" style="text-align: left;"><strong>Địa chỉ: ${
              order.delivery_address || ""
            }</strong></td>
          </tr>
          <tr>
            <td colspan="7" style="text-align: left;"><strong>Nhân viên KD: ${
              order.staff_name || ""
            }</strong></td>
          </tr>
          <tr class="note">
            <td colspan="7" style="text-align: center;">Lưu Ý: gọi khách không được, không đúng địa chỉ...mang hàng về gửi lại cho kinh doanh làm việc trực tiếp với khách sau. Cảm ơn mấy anh tài xế nhiều ạ!</td>
          </tr>
          <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Chiều rộng</th>
            <th>Chiều dài</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Tổng giá</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>${
              order.product_name || "Lỗi SP"
            }</td> <!-- Ensure this uses product_name -->
            <td>${order.product_width || "10cm"}</td>
            <td>${order.product_length || "15cm"}</td>
            <td>${order.quantity || "100"}</td>
            <td>${
              order.price
                ? parseFloat(order.price).toLocaleString("vi-VN")
                : "0.000"
            } VND</td>
            <td>${
              order.total_price
                ? parseFloat(order.total_price).toLocaleString("vi-VN")
                : "0.000"
            } VND</td>
          </tr>
          <tr>
            <td colspan="6" class="text-right">VAT</td>
            <td>${
              order.vat
                ? parseFloat(order.vat).toLocaleString("vi-VN")
                : "0.000"
            } VND</td>
          </tr>
          <tr>
            <td colspan="6" class="text-right">Tổng cộng</td>
            <td>${
              order.total_price
                ? parseFloat(order.total_price).toLocaleString("vi-VN")
                : "0.000"
            } VND</td>
          </tr>
          <tr>
            <td colspan="6" class="text-right">Đã thanh toán</td>
            <td>${totalDeposited.toLocaleString("vi-VN")} VND</td>
          </tr>
          <tr>
            <td colspan="6" class="text-right">Còn lại</td>
            <td>${remainingAmount.toLocaleString("vi-VN")} VND</td>
          </tr>
          <tr>
            <td colspan="6" class="text-right">Phí giao hàng</td>
            <td>${deliveryFee.toLocaleString("vi-VN")} VND</td>
          </tr>
          <tr>
            <td colspan="6" class="text-right">Số tiền KH cần trả</td>
            <td>${amountToPay.toLocaleString("vi-VN")} VND</td>
          </tr>
        </tbody>
      </table>
  
      <div class="signature-section">
        <div class="signature-box">
          <p>Người Nhận</p>
          <p>(ký và họ tên)</p>
        </div>
        <div class="signature-box">
          <p>Người Lập Phiếu</p>
          <p>(ký và họ tên)</p>
        </div>
      </div>
    </div>`;

    // Open a new window for the delivery note popup
    const deliveryWindow = window.open("", "_blank");

    deliveryWindow.document.write(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Phiếu Giao Nhận</title>
      <style>
        body, html {
          font-family: 'Minion Pro', serif;
          color: black;
          background-color: #2a2020;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
          padding: 0;
          min-height: 100vh;
          overflow-x: hidden;
          background-image: url("../Assets/images/Wavyline.png");
          background-size: 150%;
          background-position: center;
          background-repeat: no-repeat;
          width: 100%;
          height: 100%;
        }
  
        .bill {
          background-color: white;
          color: black;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
          max-width: 90%;
          width: 90%;
          text-align: center;
          margin: auto;
          transform: scale(0.9);
          transform-origin: center center;
        }
  
        h1 {
          color: red;
        }
  
        .bill-table {
          width: 100%;
          margin-top: 10px;
          border-collapse: collapse;
          text-align: center;
          font-size: 0.8em;
        }
  
        .bill-table th, .bill-table td {
          padding: 4px 8px;
          border: 1px solid #ddd;
        }
  
        .signature-section {
          display: flex;
          justify-content: space-around;
          margin-top: 20px;
        }
  
        .signature-box {
          text-align: center;
          width: 25%;
          position: relative;
        }
  
        .note {
          margin-top: 40px;
        }
      </style>
    </head>
    <body>
      ${deliveryContent}
    </body>
    </html>
    `);

    deliveryWindow.document.close();
  }

  // Function to show delivery details popup
  function showDeliveryDetailsPopup(order) {
    const modalContent = document.querySelector(".modal-content");
    modalContent.innerHTML = `
      <h2>Nhập thông tin giao hàng</h2>
      <p>Phương thức giao hàng:</p>
      <input type="radio" id="deliveryPickup" name="delivery" value="pickup" />
      <label for="deliveryPickup">Khách tự đến lấy</label>
      <input type="radio" id="deliveryDelivery" name="delivery" value="delivery" />
      <label for="deliveryDelivery">Giao hàng</label>
      <div id="deliveryDetails">
         <p>Địa chỉ: 
    <input 
      type="text" 
      id="deliveryAddress" 
      placeholder="Nhập địa chỉ" 
      style="color: black; border-radius: 8px; border: 1px solid #ccc; padding: 5px;" 
    />
  </p>
  <p>Phí giao hàng: 
    <input 
      type="number" 
      id="deliveryFee" 
      placeholder="Nhập phí giao hàng" 
      style="color: black; border-radius: 8px; border: 1px solid #ccc; padding: 5px;" 
    />
  </p>
  <p>Note: 
    <input 
      type="text" 
      id="deliveryNote" 
      placeholder="Thêm ghi chú" 
      style="color: black; border-radius: 8px; border: 1px solid #ccc; padding: 5px;" 
    />
  </p>
</div>
      <button id="submitDeliveryDetails" style="background-color: #df2524; color: white; border: none;border-radius:25px; padding: 10px 20px; cursor: pointer; font-size: 16px; display: block; margin: 20px auto;">Xác nhận</button>
    `;

    modal.style.display = "block";

    // Add event listener for the submit button
    const submitButton = document.getElementById("submitDeliveryDetails");
    if (submitButton) {
      submitButton.addEventListener("click", function () {
        console.log("Submit button clicked"); // Debugging log
        submitDeliveryDetails(order);
      });
    } else {
      console.error("Submit button not found!"); // Error log
    }
  }

  function submitDeliveryDetails(order) {
    try {
      // Safely capture the selected delivery method
      const deliveryMethodElement = document.querySelector(
        'input[name="delivery"]:checked'
      );
      if (!deliveryMethodElement) {
        alert("Please select a delivery method.");
        return;
      }

      const deliveryMethod = deliveryMethodElement.value;
      const deliveryCompany = document.getElementById("deliveryCompany")
        ? document.getElementById("deliveryCompany").value
        : ""; // Ensure the element exists
      const deliveryFee = document.getElementById("deliveryFee")
        ? document.getElementById("deliveryFee").value
        : 0; // Ensure the element exists
      const deliveryAddress = document.getElementById("deliveryAddress")
        ? document.getElementById("deliveryAddress").value
        : ""; // Ensure the element exists

      // Ensure order ID is correctly captured
      const orderId = order.order_id;

      // Prepare the data to be sent
      const deliveryData = {
        delivery_method: deliveryMethod,
        delivery_fee: parseFloat(deliveryFee).toFixed(3),
        delivery_company: deliveryCompany,
        delivery_address: deliveryAddress,
        order_id: orderId,
      };

      // Send delivery data to the server
      fetch("/orders/saveDeliveryDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deliveryData),
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error(text);
            });
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            alert("Delivery details saved successfully!");
            showDeliveryPopup(order); // Show the delivery note popup
          } else {
            alert("Failed to save delivery details. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error submitting delivery details:", error.message);
        });
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  // Function to generate the bill content dynamically and print
  function generateAndPrintBillContent(order) {
    const printContent = `
      <div class="bill">
        <div class="logo-container">
          <img src="../Assets/images/logo.png" alt="Logo" class="logo">
        </div>
        <div class="bill-info">
          <div class="column">
            <p>Đơn Hàng: ${order.order_id || "N/A"}</p>
            <p>Khách Hàng: ${order.customer_name || "N/A"}</p>
            <p>Điện Thoại: ${order.phone_no || "N/A"}</p>
          </div>
          <div class="column">
            <p>Ngày Tạo: ${order.created_date || "N/A"}</p>
            <p>Kinh Doanh: ${order.staff_name || "Anne Truong"}</p>
            <p>Thiết Kế: ${order.designer || "N/A"}</p>
          </div>
        </div>
        <table class="bill-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th>Chiều rộng</th>
              <th>Chiều dài</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Tổng giá</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>${order.product_name || "HIFLEX Bạt 3.2dzem - Chừa biên"}</td>
              <td>${order.width || "2cm"}</td>
              <td>${order.length || "1cm"}</td>
              <td>${order.quantity || "1"}</td>
              <td>${
                order.price ? Number(order.price).toFixed(3) : "50.000"
              } VND</td>
              <td>${
                order.total_price
                  ? Number(order.total_price).toFixed(3)
                  : "125.000"
              } VND</td>
            </tr>
            <tr>
              <td colspan="6" class="text-right">VAT (8%)</td>
              <td>${
                order.vat ? Number(order.vat).toFixed(3) : "10.000"
              } VND</td>
            </tr>
            <tr>
              <td colspan="6" class="text-right">Tổng tiền hàng</td>
              <td>${
                order.total_price
                  ? Number(order.total_price).toFixed(3)
                  : "135.000"
              } VND</td>
            </tr>
            <tr>
              <td colspan="6" class="text-right">Số tiền đặt cọc</td>
              <td>${
                order.deposited ? Number(order.deposited).toFixed(3) : "0.000"
              } VND</td>
            </tr>
            <tr>
              <td colspan="6" class="text-right">Số tiền khách cần trả</td>
              <td>${
                order.amount_to_pay
                  ? Number(order.amount_to_pay).toFixed(3)
                  : "135.000"
              } VND</td>
            </tr>
          </tbody>
        </table>
        <div class="signature-section">
          <div class="signature-box">
            <p>Kế Toán</p>
            <p>(ký và họ tên)</p>
            <div class="bank">
              <p class="bank-text">Tài Khoản Ngân Hàng</p>
              <p>VCB 0531002468134</p>
              <img src="../Assets/images/qr_code_1.png" alt="Bank QR Code 1" class="qr-code">
            </div>
          </div>
          <div class="signature-box">
            <p>Thủ Quỹ</p>
            <p>(ký và họ tên)</p>
            <div class="company">
              <p>CÔNG TY TNHH IN KỸ THUẬT SỐ</p>
              <p>PGD Lê Quang Định, HCM</p>
            </div>
          </div>
          <div class="signature-box">
            <p>Người Lập Phiếu</p>
            <p>(ký và họ tên)</p>
            <div class="bank">
              <p class="bank-text">Tài Khoản Ngân Hàng</p>
              <p>ACB 1234567890123</p>
              <img src="../Assets/images/qr_code_2.png" alt="Bank QR Code 2" class="qr-code">
            </div>
          </div>
        </div>
        <div class="note">
          <p>Lưu Ý:</p>
          <p>Hàng in xong hoàn tất, không có bao đổi trả hàng. Màu sắc in ấn: Được tư vấn rõ khi đặt in. Không phản ánh màu sắc in ấn theo ý khách hàng yêu cầu. Phiếu in an có giá trị trong tháng kể từ ngày lập phiếu. Cảm ơn quý khách hàng.</p>
        </div>
      </div>`;

    // Open a new window for printing
    const printWindow = window.open("", "_blank");

    // Write the HTML content to the new window
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Print Order</title>
        <style>
          body, html {
            font-family: 'Minion Pro', serif;
            color: black;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
          }
  
          .bill {
            background-color: white;
            color: black;
            padding: 20px;
            max-width: 100%;
            width: 100%;
            text-align: center;
            margin: 0;
          }
  
          .logo-container {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 10px;
          }
  
          .logo {
            width: 150px;
            height: auto;
            margin-right: 15px;
          }
  
          .bill-info {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            text-align: left;
            font-size: 0.8em;
          }
  
          .bill-info .column {
            width: 48%;
          }
  
          .bill-info .column p {
            margin: 3px 0;
          }
  
          .bill-table {
            width: 100%;
            margin-top: 10px;
            border-collapse: collapse;
            text-align: center;
            font-size: 0.8em;
          }
  
          .bill-table th,
          .bill-table td {
            padding: 4px 8px;
            border: 1px solid #ddd;
          }
  
          .bill-table th {
            background-color: #f4f4f4;
          }
  
          .bill-table td {
            background-color: #fdfdfd;
          }
  
          .text-right {
            text-align: right;
          }
  
          .signature-section {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
          }
  
          .signature-box {
            text-align: center;
            width: 25%;
            position: relative;
            font-size: 0.8em;
          }
  
          .bank {
            border: 1px solid black;
            padding: 8px;
            margin-top: 100px;
          }
  
          .bank-text {
            margin-top: 6px;
            font-size: 12px;
            font-weight: bold;
          }
  
          .qr-code {
            margin-top: 6px;
            width: 70px;
            height: 70px;
          }
  
          .company {
            margin-top: 150px;
          }
  
          .note {
            margin-top: 40px;
          }
  
          @media print {
            body * {
              visibility: hidden;
            }
  
            .bill, .bill * {
              visibility: visible;
            }
  
            body {
              background: none;
              margin: 0;
              padding: 0;
            }
  
            .bill {
              margin: 0;
              padding: 0;
              width: 100%;
            }
  
            .hidden {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        ${printContent}
      </body>
      </html>
    `);
    printWindow.document.close();

    // Focus and print the new window
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 500);
  }

  // Handle search input
  document
    .getElementById("search-input")
    .addEventListener("input", function () {
      const filter = document.querySelector(
        'input[name="filter"]:checked'
      ).value;
      const query = this.value;

      fetchOrders(filter, query);
    });

  // Initial fetch with default filter
  fetchOrders();
});
