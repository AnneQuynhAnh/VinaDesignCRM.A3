document.addEventListener("DOMContentLoaded", function () {
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
  const cartIcon = document.getElementById("cartIcon");
  const cartPopup = document.getElementById("cartPopup");
  const cartItemsList = document.getElementById("cartItems");
  const closeCartButton = document.getElementById("closeCartButton");
  const nextButton = document.getElementById("nextButton");
  const customerNameInput = document.getElementById("customerName");
  const phoneNoInput = document.getElementById("phoneNo");
  const finalizationPopup = document.getElementById("finalizationPopup");
  const finalizationPopupContent = document.getElementById(
    "finalizationPopupContent"
  );
  const finalCustomerName = document.getElementById("finalCustomerName");
  const finalCustomerPhone = document.getElementById("finalCustomerPhone");
  const finalCartDetails = document.getElementById("finalCartDetails");
  const printButton = document.getElementById("printButton");

  let chosenProducts = [];
  let maxSide = 3; // default value if not fetched from DB
  let extraSupply = 1; // default value if not fetched from DB

  lengthInput.addEventListener("input", updateCalculations);
  widthInput.addEventListener("input", updateCalculations);
  quantityInput.addEventListener("input", updateCalculations);

  function displayProductDetails(product) {
    productNameSpan.textContent = product.product_name;
    productDetails.classList.remove("hidden");

    const url = `/products/product-specifications?productName=${encodeURIComponent(
      product.product_name
    )}`;
    console.log("Fetching specifications from URL:", url);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
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

  function fetchPricePerM2(productName, productSpecification) {
    const url = `/products/product-price?productName=${encodeURIComponent(
      productName
    )}&productSpecification=${encodeURIComponent(productSpecification)}`;
    console.log("Fetching price from URL:", url);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((priceData) => {
        console.log("Price Data fetched:", priceData);
        if (priceData.price_per_unit) {
          // Update Giá mỗi đơn vị if price_per_unit is available
          perPieceMoneySpan.textContent = parseFloat(
            priceData.price_per_unit
          ).toFixed(2);
          pricePerM2Span.textContent = "0.00"; // Reset per m2 price since we use per unit
        } else if (priceData.price_perm2) {
          // Fall back to Giá mỗi m² if price_perm2 is available
          const price = parseFloat(priceData.price_perm2);
          pricePerM2Span.textContent = price.toFixed(2);
          perPieceMoneySpan.textContent = "0.00"; // Reset per unit price since we use per m2
        } else {
          // Default if neither is available
          pricePerM2Span.textContent = "0.00";
          perPieceMoneySpan.textContent = "0.00";
        }
        updateCalculations();
      })
      .catch((error) => {
        console.error("Error fetching product price:", error);
        pricePerM2Span.textContent = "0.00";
        perPieceMoneySpan.textContent = "0.00";
        updateCalculations();
      });
  }

  function fetchMaxSide(productName) {
    const url = `/products/product-max-side?productName=${encodeURIComponent(
      productName
    )}`;
    console.log("Fetching max side from URL:", url);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Max side data fetched:", data);
        maxSide = parseFloat(data.max_side) || 3; // default to 3 if not specified
        extraSupply = parseFloat(data.extra_supply) || 1; // default to 1 if not specified
        updateCalculations();
      })
      .catch((error) => {
        console.error("Error fetching max side:", error);
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

    let effectiveMaxSide = maxSide;

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

    leftMaterial *= extraSupply;

    console.log(`Length: ${lengthValue}, Width: ${widthValue}`);
    console.log(
      `Effective Max Side: ${effectiveMaxSide}, Left Material Size: ${leftMaterial}`
    );

    return leftMaterial;
  }

  function calculatePerPieceMoney() {
    const printingMoney = calculatePrintingMoney();
    const leftMaterial = calculateLeftMaterial();
    console.log("Vật tư dư:", leftMaterial); // Log Vật tư dư
    leftMaterialSpan.textContent = leftMaterial.toFixed(2);

    const pricePerUnit = parseFloat(perPieceMoneySpan.textContent) || 0;
    if (pricePerUnit > 0) {
      return pricePerUnit;
    }

    return printingMoney + leftMaterial;
  }

  function calculateTotalMoney() {
    const perPieceMoney = calculatePerPieceMoney();
    const quantity = parseFloat(quantityInput.value) || 1;
    return perPieceMoney * quantity;
  }

  function updateCalculations() {
    const totalSize = calculateTotalSize();
    totalSizeSpan.textContent = totalSize.toFixed(2);

    const printingMoney = calculatePrintingMoney();
    printingMoneySpan.textContent = printingMoney.toFixed(2);

    const perPieceMoney = calculatePerPieceMoney();
    perPieceMoneySpan.textContent = perPieceMoney.toFixed(2);

    const totalMoney = calculateTotalMoney();
    totalMoneySpan.textContent = totalMoney.toFixed(2);
  }

  addToCartButton.addEventListener("click", function () {
    const productName = productNameSpan.textContent;
    const productSpecification = specificationsSelect.value;
    const totalMoney = parseFloat(totalMoneySpan.textContent) || 0;
    const note = noteInput.value;

    const cartItem = {
      productName,
      productSpecification,
      totalMoney,
      note,
    };

    chosenProducts.push(cartItem);
    updateCartPopup();
  });

  cartIcon.addEventListener("click", function () {
    cartPopup.classList.toggle("hidden");
  });

  closeCartButton.addEventListener("click", function () {
    cartPopup.classList.add("hidden");
  });

  function updateCartPopup() {
    cartItemsList.innerHTML = "";
    chosenProducts.forEach((item, index) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.className = "cart-item";
      cartItemDiv.innerHTML = `
              <span>${item.productName} - ${
        item.productSpecification
      }: ${item.totalMoney.toFixed(2)} VND</span>
              <span>Note: ${item.note}</span>
              <button class="remove-from-cart" data-index="${index}"><i class="fas fa-times"></i></button>
          `;
      cartItemsList.appendChild(cartItemDiv);
    });

    const removeButtons = document.querySelectorAll(".remove-from-cart");
    removeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        chosenProducts.splice(index, 1);
        updateCartPopup(); // Recalculate the total amount due after removing an item
      });
    });
  }

  nextButton.addEventListener("click", function () {
    const customerName = customerNameInput.value.trim();
    const phoneNo = phoneNoInput.value.trim();

    if (customerName === "" || phoneNo === "") {
      alert("Vui lòng nhập tên khách hàng và số điện thoại.");
      return;
    }

    finalCustomerName.textContent = customerName;
    finalCustomerPhone.textContent = phoneNo;

    finalCartDetails.innerHTML = chosenProducts
      .map(
        (item) =>
          `<div>
              <span>${item.productName} - ${
            item.productSpecification
          }: ${item.totalMoney.toFixed(2)} VND</span>
              <span>Note: ${item.note}</span>
          </div>`
      )
      .join("");

    cartPopup.classList.add("hidden");
    finalizationPopup.classList.remove("hidden");
  });

  document
    .getElementById("closeFinalizationPopupButton")
    .addEventListener("click", function () {
      finalizationPopup.classList.add("hidden");
    });
  // Close button event listener
  document
    .getElementById("closeFinalizationPopupButton")
    .addEventListener("click", function () {
      finalizationPopup.classList.add("hidden");
    });

  printButton.addEventListener("click", function () {
    // Add a class to hide the print button during printing
    printButton.classList.add("no-print");

    const printContent = finalizationPopupContent.innerHTML;

    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write("<html><head><title>Print</title>");
    printWindow.document.write(
      "<style>@media print { .no-print { display: none; } }</style>"
    );
    printWindow.document.write("</head><body>");
    printWindow.document.write(printContent);
    printWindow.document.write("</body></html>");
    printWindow.document.close();

    printWindow.focus(); // Focus on the print window// Print and then remove the no-print class
    printWindow.print();
    printWindow.onafterprint = function () {
      printButton.classList.remove("no-print");
      printWindow.close(); // Close the print window after printing
    };
  });

  // Fetch products and initialize search functionality
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
      console.log("Products:", products);

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
