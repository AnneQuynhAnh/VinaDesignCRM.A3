document.addEventListener("DOMContentLoaded", function () {
  // Declare the buttons once
  const printButton = document.createElement("button");
  printButton.innerHTML =
    '<img src="../Assets/images/printericons-02.png" alt="Print" style="width: 40px; height: 40px;">';
  printButton.className = "print-button";
  printButton.onclick = function () {
    printFinalOrder();
  };

  const newOrderButton = document.createElement("button");
  newOrderButton.innerHTML =
    '<img src="../Assets/images/plus.png" alt="New Order" style="width: 30px; height: 30px;">'; // Add explicit width and height for the image
  newOrderButton.className = " new-order-button";
  newOrderButton.onclick = function () {
    resetForm();
  };

  // Function to reset the form
  function resetForm() {
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
    document
      .querySelectorAll("span")
      .forEach((span) => (span.textContent = ""));
    chosenProducts = [];
    productPrices = [];
    tongTienHangValue = 0;
    finalProductDetails.innerHTML = "";
    finalizationPopup.classList.add("hidden");
  }

  // Function to handle moving to the next input field on Enter key press
  function moveToNextInput(event) {
    if (event.key === "Enter") {
      const formElements = Array.from(
        document.querySelectorAll('input:not([type="radio"]), select, textarea')
      );
      const index = formElements.indexOf(event.target);
      if (index >= 0 && index < formElements.length - 1) {
        formElements[index + 1].focus();
        event.preventDefault(); // Prevent form submission or other default actions
      }
    }
  }

  // Apply the focus move handler to all inputs, selects, and textareas
  document
    .querySelectorAll('input:not([type="radio"]), select, textarea')
    .forEach((element) => {
      element.addEventListener("keydown", moveToNextInput);
    });

  // Other necessary variables
  const searchBar = document.getElementById("searchBar");
  const suggestions = document.getElementById("suggestions");
  const productDetails = document.getElementById("productDetails");
  const productNameSpan = document.getElementById("productName");
  const specificationsSelect = document.getElementById("specifications");
  const pricePerM2Span = document.getElementById("pricePerM2");
  const lengthInput = document.getElementById("length");
  const widthInput = document.getElementById("width");
  const totalSizeSpan = document.getElementById("totalSize");
  const printingMoneySpan = document.getElementById("printingMoney");
  const leftMaterialSpan = document.getElementById("leftMaterial");
  const perPieceMoneySpan = document.getElementById("perPieceMoney");
  const quantityInput = document.getElementById("quantity");
  const totalMoneySpan = document.getElementById("totalMoney");
  const noteInput = document.getElementById("note");
  const addToCartButton = document.getElementById("addToCartButton");
  const finalProductDetails = document.getElementById("finalProductDetails");
  const finalizationPopup = document.getElementById("finalizationPopup");
  const finalizationPopupContent = document.getElementById(
    "finalizationPopupContent"
  );

  const depositedAmountCashInput = document.getElementById(
    "depositedAmountCash"
  );
  const depositedAmountTransactionInput = document.getElementById(
    "depositedAmountTransaction"
  );
  const timeReceiveCash = document.getElementById("timeReceiveCash");
  const timeTransaction = document.getElementById("timeTransaction");

  // Restrict date inputs to today and future dates only
  const today = new Date().toISOString().split("T")[0];
  timeReceiveCash.setAttribute("min", today);
  timeTransaction.setAttribute("min", today);

  let chosenProducts = [];
  let maxSide = 3; // Default value if not fetched from DB
  let extraSupply = 1; // Default value if not fetched from DB
  let productPrices = []; // Array to store the prices of products
  let tongTienHangValue = 0; // Variable to store Tổng tiền hàng

  // Variable to store the full name of the signed-in user
  let userFullName = "";

  // Fetch the full name of the signed-in user
  function fetchUserFullName() {
    fetch("/users/current", { credentials: "include" })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch user details");
        return response.json();
      })
      .then((data) => {
        userFullName = data.fullname || "Jane Smith";
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        userFullName = "Jane Smith"; // Default fallback
      });
  }

  fetchUserFullName(); // Fetch user details on load

  // Event listeners for the "Tiền Đặt Cọc" inputs
  depositedAmountCashInput.addEventListener("input", calculateFinalAmount);
  depositedAmountTransactionInput.addEventListener(
    "input",
    calculateFinalAmount
  );

  // Event listeners for the discount input field
  document
    .getElementById("discount")
    .addEventListener("input", calculateFinalAmount);

  lengthInput.addEventListener("input", updateCalculations);
  widthInput.addEventListener("input", updateCalculations);
  quantityInput.addEventListener("input", updateCalculations);

  // Handle payment method selection
  const paymentCash = document.getElementById("paymentCash");
  const paymentTransaction = document.getElementById("paymentTransaction");
  const cashDetails = document.getElementById("cashDetails");
  const transactionDetails = document.getElementById("transactionDetails");

  // Show or hide details based on payment method
  paymentCash.addEventListener("change", function () {
    if (paymentCash.checked) {
      cashDetails.classList.remove("hidden");
      transactionDetails.classList.add("hidden");
    }
  });

  paymentTransaction.addEventListener("change", function () {
    if (paymentTransaction.checked) {
      cashDetails.classList.add("hidden");
      transactionDetails.classList.remove("hidden");
    }
  });

  // Bank selection logic
  const bankRadios = document.querySelectorAll("input[name='bank']");
  bankRadios.forEach((radio) =>
    radio.addEventListener("change", function () {
      calculateFinalAmount();
    })
  );

  // Function to fetch max side data from the server
  function fetchMaxSide(productName) {
    const url = `/products/product-max-side?productName=${encodeURIComponent(
      productName
    )}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        maxSide = parseFloat(data.max_side) || 3;
        extraSupply = parseFloat(data.extra_supply) || 1;
        updateCalculations();
      })
      .catch((error) => {
        console.error("Error fetching max side:", error);
      });
  }

  // Function to display product details
  function displayProductDetails(product) {
    productNameSpan.textContent = product.product_name;
    productDetails.classList.remove("hidden");

    const url = `/products/product-specifications?productName=${encodeURIComponent(
      product.product_name
    )}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((specifications) => {
        specificationsSelect.innerHTML = specifications
          .map(
            (spec) =>
              `<option value="${spec.product_specification}">${spec.product_specification}</option>`
          )
          .join("");

        if (specifications.length > 0) {
          fetchPricePerM2(
            product.product_name,
            specifications[0].product_specification
          );
          fetchMaxSide(product.product_name);
        }

        specificationsSelect.addEventListener("change", function () {
          fetchPricePerM2(product.product_name, this.value);
        });
      })
      .catch((error) => {
        console.error("Error fetching product specifications:", error);
        alert(
          "Sorry, there was an error fetching the product specifications. Please try again later."
        );
      });
  }

  // Function to fetch price per square meter from the server
  function fetchPricePerM2(productName, productSpecification) {
    const url = `/products/product-price?productName=${encodeURIComponent(
      productName
    )}&productSpecification=${encodeURIComponent(productSpecification)}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((priceData) => {
        if (priceData.price_perm2) {
          const price = parseFloat(priceData.price_perm2);
          pricePerM2Span.textContent = price.toFixed(3); // Adjusted to three decimal places
          updateCalculations();
        } else {
          pricePerM2Span.textContent = "0.000";
        }

        if (priceData.price_per_unit) {
          const pricePerUnit = parseFloat(priceData.price_per_unit).toFixed(3); // Adjusted to three decimal places
          perPieceMoneySpan.textContent = pricePerUnit;
          totalMoneySpan.textContent = pricePerUnit;
        } else {
          perPieceMoneySpan.textContent = "0.000";
          totalMoneySpan.textContent = "0.000";
        }
      })
      .catch((error) => {
        console.error("Error fetching product price:", error);
        pricePerM2Span.textContent = "0.000";
        perPieceMoneySpan.textContent = "0.000";
        totalMoneySpan.textContent = "0.000";
        updateCalculations();
      });
  }

  function calculateTotalSize() {
    const lengthValue = parseFloat(lengthInput.value) || 0;
    const widthValue = parseFloat(widthInput.value) || 0;
    return lengthValue * widthValue;
  }

  function calculatePrintingMoney() {
    const totalSize = calculateTotalSize();
    const pricePerM2 = parseFloat(pricePerM2Span.textContent) || 0;
    return totalSize * pricePerM2;
  }

  function calculateLeftMaterial() {
    const lengthValue = parseFloat(lengthInput.value) || 0;
    const widthValue = parseFloat(widthInput.value) || 0;

    let effectiveMaxSide = maxSide || 3;

    if (lengthValue > maxSide || widthValue > maxSide) {
      if (lengthValue <= 2 * maxSide && widthValue <= 2 * maxSide) {
        effectiveMaxSide = 2 * maxSide;
      } else if (lengthValue <= 3 * maxSide && widthValue <= 3 * maxSide) {
        effectiveMaxSide = 3 * maxSide;
      }
    }

    const smallerSide = Math.min(lengthValue, widthValue);
    const largerSide = Math.max(lengthValue, widthValue);

    let leftMaterial = (effectiveMaxSide - largerSide) * smallerSide;
    if (leftMaterial < 0) {
      leftMaterial = 0;
    }

    leftMaterial *= extraSupply || 1;

    return leftMaterial;
  }

  function calculatePerPieceMoney() {
    const printingMoney = calculatePrintingMoney();
    const leftMaterial = calculateLeftMaterial();
    leftMaterialSpan.textContent = leftMaterial.toFixed(3); // Adjusted to three decimal places
    return printingMoney + leftMaterial;
  }

  function updateCalculations() {
    const totalSize = calculateTotalSize();
    totalSizeSpan.textContent = totalSize.toFixed(3); // Adjusted to three decimal places

    const printingMoney = calculatePrintingMoney();
    printingMoneySpan.textContent = printingMoney.toFixed(3); // Adjusted to three decimal places

    const perPieceMoney = calculatePerPieceMoney();
    perPieceMoneySpan.textContent = perPieceMoney.toFixed(3); // Adjusted to three decimal places

    const totalMoney = parseFloat(calculateTotalMoney());
    totalMoneySpan.textContent = totalMoney.toFixed(3); // Adjusted to three decimal places
    tongTienHangValue = totalMoney; // Already a number
  }

  function calculateTotalMoney() {
    const perPieceMoney = calculatePerPieceMoney();
    const quantity = parseFloat(quantityInput.value) || 1;
    return parseFloat((perPieceMoney * quantity).toFixed(3)); // Ensure the result is a number
  }

  addToCartButton.addEventListener("click", function () {
    const productName = productNameSpan.textContent;
    const productSpecification = specificationsSelect.value;
    const TenSP = `${productName} - ${productSpecification}`;

    const product = {
      productName: TenSP,
      width: document.getElementById("width").value || "0.00",
      length: document.getElementById("length").value || "0.00",
      quantity: parseFloat(document.getElementById("quantity").value) || 1,
      price: parseFloat(pricePerM2Span.textContent) || 0,
      totalMoney: parseFloat(calculateTotalMoney()) || 0,
    };

    chosenProducts.push(product);
    productPrices.push(product.totalMoney);

    calculateTotalAndFinalAmount();
    updateFinalProductDetails();
  });

  function calculateTotalAndFinalAmount() {
    tongTienHangValue = productPrices.reduce((sum, price) => sum + price, 0);
    calculateFinalAmount();
  }

  function updateFinalProductDetails() {
    let tableHTML = `
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
    `;

    chosenProducts.forEach((item, index) => {
      tableHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.productName}</td>
          <td>${item.width}cm</td>
          <td>${item.length}cm</td>
          <td>${item.quantity}</td>
          <td>${item.price.toFixed(
            3
          )} VND</td> <!-- Adjusted to three decimal places -->
          <td>${item.totalMoney.toFixed(
            3
          )} VND</td> <!-- Adjusted to three decimal places -->
        </tr>
      `;
    });

    tongTienHangValue = chosenProducts.reduce(
      (sum, item) => sum + item.totalMoney,
      0
    );

    const vat = tongTienHangValue * 0.08;
    const total = tongTienHangValue + vat;

    tableHTML += `
      <tr>
        <td colspan="6" class="text-right">VAT (8%)</td>
        <td>${vat.toFixed(3)} VND</td> <!-- Adjusted to three decimal places -->
      </tr>
      <tr>
        <td colspan="6" class="text-right">Tổng tiền hàng</td>
        <td>${total.toFixed(
          3
        )} VND</td> <!-- Adjusted to three decimal places -->
      </tr>
    `;

    tableHTML += `
        </tbody>
      </table>
    `;

    finalProductDetails.innerHTML = tableHTML;
  }

  function calculateFinalAmount() {
    const discount = parseFloat(document.getElementById("discount").value) || 0;
    const depositedAmountTransaction =
      parseFloat(depositedAmountTransactionInput.value) || 0;
    const depositedAmountCash = parseFloat(depositedAmountCashInput.value) || 0;
    const totalDeposited = depositedAmountTransaction + depositedAmountCash;

    updateFinalProductDetails(); // Updates the product details in the table

    const tongTienHangCell = document.querySelector(
      "#finalProductDetails tr:last-child td:last-child"
    );

    // Extract the 'Tổng tiền hàng' value from the table
    if (tongTienHangCell) {
      tongTienHangValue =
        parseFloat(tongTienHangCell.textContent.replace(/[^0-9.-]+/g, "")) || 0;
    } else {
      console.error("Failed to find Tổng tiền hàng cell in the table.");
    }

    // Calculate the final amount the customer needs to pay
    const soTienKhachCanTra = tongTienHangValue - discount - totalDeposited;

    // Display the calculated amount on the page
    const amountToPayElement = document.getElementById("amountToPay");
    if (amountToPayElement) {
      amountToPayElement.textContent = soTienKhachCanTra.toFixed(3); // Display with three decimal places
    }

    // Store the value in a global or a specific variable to be sent to the server
    return soTienKhachCanTra.toFixed(3); // Ensure the amount has three decimal places
  }

  function submitBillingData(orderID) {
    const customerName =
      document.getElementById("billingCustomerName").value || "N/A";
    const phoneNo = document.getElementById("phoneNo").value || "N/A";
    const designer = document.getElementById("designer").value || "N/A";

    const createdAt = new Date().toISOString().slice(0, 10);
    const salesPerson = userFullName || "Jane Smith";
    const vatAmount = tongTienHangValue * 0.08;
    const totalAmount = tongTienHangValue + vatAmount;
    const paidAmount =
      parseFloat(depositedAmountCashInput.value) +
      parseFloat(depositedAmountTransactionInput.value);
    const checkAmount = totalAmount - paidAmount;

    const productRows = chosenProducts
      .map(
        (product, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${product.productName}</td>
        <td>${product.width}cm</td>
        <td>${product.length}cm</td>
        <td>${product.quantity}</td>
        <td>${product.price.toFixed(3)} VND</td>
        <td>${product.totalMoney.toFixed(3)} VND</td>
      </tr>`
      )
      .join("");

    const billHTML = `
      <div class="bill">
        <div class="logo-container">
          <img src="../Assets/images/logo.png" alt="Logo" class="logo">
        </div>
        <div class="bill-info">
          <div class="column">
            <p>Đơn Hàng: ${orderID}</p>
            <p>Khách Hàng: ${customerName}</p>
            <p>Điện Thoại: ${phoneNo}</p>
          </div>
          <div class="column">
            <p>Ngày Tạo: ${createdAt}</p>
            <p>Kinh Doanh: ${salesPerson}</p>
            <p>Thiết Kế: ${designer}</p>
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
            ${productRows}
            <tr>
              <td colspan="6" class="text-right">VAT (8%)</td>
              <td>${vatAmount.toFixed(3)} VND</td>
            </tr>
            <tr>
              <td colspan="6" class="text-right">Tổng tiền hàng</td>
              <td>${totalAmount.toFixed(3)} VND</td>
            </tr>
            <tr>
              <td colspan="6" class="text-right">Số tiền đặt cọc</td>
              <td>${paidAmount.toFixed(3)} VND</td>
            </tr>
            <tr>
              <td colspan="6" class="text-right">Số tiền khách cần trả</td>
              <td>${checkAmount.toFixed(3)} VND</td>
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
      </div>
    `;

    finalizationPopupContent.innerHTML = billHTML;

    finalizationPopupContent.appendChild(printButton);
    finalizationPopupContent.appendChild(newOrderButton);

    finalizationPopup.classList.remove("hidden");
  }

  // Function to print the bill
  function printFinalOrder() {
    const printContent = document.getElementById(
      "finalizationPopupContent"
    ).innerHTML;

    if (!printContent) {
      console.error("No content to print");
      return;
    }

    // Open a new window for printing
    const printWindow = window.open("", "_blank", "width=800,height=600");

    if (!printWindow) {
      console.error(
        "Failed to open print window. Please check if the popup is blocked."
      );
      return;
    }

    printWindow.document.open();
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Print Order</title>
        <style>
          body, html {
            font-family: url(Assets/font/MINIONPRO-BOLD.OTF);
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

    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 500);
  }

  window.printFinalOrder = printFinalOrder;

  // Function to handle order submission and fetching
  document;
  // Function to handle order submission and fetching
  document
    .getElementById("next-billing")
    .addEventListener("click", function () {
      // Calculate the necessary values for storing in the database
      const discount =
        parseFloat(document.getElementById("discount").value) || 0;
      const depositedAmountTransaction =
        parseFloat(depositedAmountTransactionInput.value) || 0;
      const depositedAmountCash =
        parseFloat(depositedAmountCashInput.value) || 0;
      const totalDeposited = depositedAmountTransaction + depositedAmountCash;

      // Update the final product details in the table
      updateFinalProductDetails();

      // Extract the 'Tổng tiền hàng' value from the table
      const tongTienHangCell = document.querySelector(
        "#finalProductDetails tr:last-child td:last-child"
      );
      let tongTienHangValue = 0; // Initialize the total price of products

      if (tongTienHangCell) {
        tongTienHangValue =
          parseFloat(tongTienHangCell.textContent.replace(/[^0-9.-]+/g, "")) ||
          0;
      } else {
        console.error("Failed to find Tổng tiền hàng cell in the table.");
      }

      // Calculate the final amount to pay
      const soTienKhachCanTra = tongTienHangValue - discount - totalDeposited;
      const vatAmount = parseFloat((tongTienHangValue * 0.08).toFixed(3)); // 8% VAT
      const totalAmount = parseFloat(
        (tongTienHangValue + vatAmount).toFixed(3)
      ); // Total including VAT
      const price = parseFloat(tongTienHangValue.toFixed(3)); // Total price of the products

      // Get payment method and bank details
      const paymentMethodElement = document.querySelector(
        'input[name="payment"]:checked'
      );
      let paymentMethod = paymentMethodElement
        ? paymentMethodElement.value
        : "";
      if (paymentMethod === "transaction") {
        const selectedBankElement = document.querySelector(
          'input[name="bank"]:checked'
        );
        if (selectedBankElement) {
          const selectedBank = selectedBankElement.value;
          paymentMethod = `Chuyển khoản ${selectedBank}`;
        } else {
          alert("Vui lòng chọn ngân hàng.");
          return; // Exit if no bank is selected
        }
      } else if (paymentMethod === "cash") {
        paymentMethod = "Tiền mặt";
      }

      // Prepare the product details for each chosen product
      const productNames = chosenProducts
        .map((product) => product.productName)
        .join(", ");
      const productWidths = chosenProducts
        .map((product) => parseFloat(product.width) || 0.0)
        .join(", ");
      const productLengths = chosenProducts
        .map((product) => parseFloat(product.length) || 0.0)
        .join(", ");
      const productQuantities = chosenProducts
        .map((product) => parseInt(product.quantity) || 0)
        .join(", ");

      // Store the calculated values in the orderData object
      const orderData = {
        staffName: userFullName || "Jane Smith",
        designer: document.getElementById("designer").value || "N/A",
        customerName:
          document.getElementById("billingCustomerName").value || "N/A",
        phoneNo: document.getElementById("phoneNo").value || "N/A",
        paymentMethod: paymentMethod,
        discount: discount,
        amountToPay: soTienKhachCanTra.toFixed(3), // Use the calculated final amount here
        note: noteInput.value || "",
        productDetails: chosenProducts,
        product_name: productNames, // New field
        product_width: productWidths, // New field
        product_length: productLengths, // New field
        quantity: productQuantities, // New field
        deposit: totalDeposited,
        payment_timing: new Date().toISOString().slice(0, 19).replace("T", " "),
        price: price, // Store the calculated price
        total_price: totalAmount, // Store the total price including VAT
        vat: vatAmount, // Store the VAT amount
      };

      // Send the order data to the server
      fetch("/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error creating order: " + response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          if (data.order_id) {
            submitBillingData(data.order_id);
            finalizationPopupContent.appendChild(printButton);
            finalizationPopup.classList.remove("hidden");
          } else {
            console.error("Order ID not returned from server");
          }
        })
        .catch((error) => {
          console.error("Error creating order:", error);
        });
    });

  document
    .getElementById("closeFinalizationPopupButton")
    .addEventListener("click", function () {
      finalizationPopup.classList.add("hidden");
    });

  fetch("/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((products) => {
      if (!Array.isArray(products)) {
        throw new Error("Products is not an array");
      }

      searchBar.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        suggestions.innerHTML = "";
        if (query) {
          const filteredProducts = products.filter((product) =>
            product.product_name.toLowerCase().includes(query)
          );
          filteredProducts.forEach((product) => {
            const suggestionDiv = document.createElement("div");
            suggestionDiv.textContent = product.product_name;
            suggestionDiv.addEventListener("click", function () {
              displayProductDetails(product);
              suggestions.style.display = "none";
            });
            suggestions.appendChild(suggestionDiv);
          });
          suggestions.style.display = "block";
        } else {
          suggestions.style.display = "none";
        }
      });

      if (products.length > 0) {
        displayProductDetails(products[0]);
      }
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
});
