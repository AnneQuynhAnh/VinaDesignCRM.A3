document.addEventListener("DOMContentLoaded", function () {
  // Ensure the popup is hidden on page load
  document.getElementById("popup-container").style.display = "none";

  // Handle search input
  document
    .getElementById("search-input")
    .addEventListener("input", function () {
      const searchTerm = this.value.trim();

      if (searchTerm.length > 0) {
        fetch(
          `/products/search-products?searchTerm=${encodeURIComponent(
            searchTerm
          )}`
        )
          .then((response) => response.json())
          .then((data) => {
            const container = document.querySelector(".container");
            container.innerHTML = ""; // Clear previous results

            if (data.length > 0) {
              data.forEach((product) => {
                // Create the order div
                const orderDiv = document.createElement("div");
                orderDiv.classList.add("order");

                // Section code
                const codeDiv = document.createElement("div");
                codeDiv.classList.add("section", "code");
                codeDiv.innerHTML = `<p>#${product.product_id || "N/A"}</p>`;
                orderDiv.appendChild(codeDiv);

                // Section info
                const infoDiv = document.createElement("div");
                infoDiv.classList.add("section", "info");

                const columnDiv = document.createElement("div");
                columnDiv.classList.add("column");
                columnDiv.innerHTML = `
                      <p>Tên SP: ${product.product_name || "N/A"}</p>
                      <p>Giá mỗi m²: ${product.price_perm2 || "N/A"}</p>
                      <p>Giá mỗi SP: ${product.price_per_unit || "N/A"}</p>
                      <p>Giá sỉ: ${product.whole_sale || "N/A"}</p>
                    `;
                infoDiv.appendChild(columnDiv);

                // Create a div for the icons and append them
                const iconsDiv = document.createElement("div");
                iconsDiv.classList.add("icons");

                const editIcon = document.createElement("img");
                editIcon.src = "../Assets/images/editpic.png";
                editIcon.alt = "Biểu tượng chỉnh sửa";
                editIcon.classList.add("icon-btn");

                // Add event listener for the edit icon
                editIcon.addEventListener("click", function () {
                  fetch(`/products/get?id=${product.product_id}`)
                    .then((response) => response.json())
                    .then((productData) => {
                      // Populate the form with the fetched data
                      document.getElementById("product-name").value =
                        productData.product_name;
                      document.getElementById(
                        "Thông số kỹ thuật sản phẩm"
                      ).value = productData.product_specification;
                      document.getElementById("price-per-m2").value =
                        productData.price_perm2;
                      document.getElementById("price-per-unit").value =
                        productData.price_per_unit;
                      document.getElementById("extra-supply").value =
                        productData.extra_supply;
                      document.getElementById("whole-sale").value =
                        productData.whole_sale;
                      document.getElementById("quantity-frame").value =
                        productData.quantity_frame;
                      document.getElementById("note").value = productData.note;

                      // Show the popup
                      document.getElementById("popup-container").style.display =
                        "flex";

                      // Update save button to handle product update
                      const saveButton = document.getElementById("save-button");
                      saveButton.onclick = function () {
                        // Gather form data for update
                        const updatedData = {
                          product_id: product.product_id,
                          product_name:
                            document.getElementById("product-name").value,
                          product_specification: document.getElementById(
                            "Thông số kỹ thuật sản phẩm"
                          ).value,
                          price_perm2:
                            document.getElementById("price-per-m2").value,
                          price_per_unit:
                            document.getElementById("price-per-unit").value,
                          extra_supply:
                            document.getElementById("extra-supply").value,
                          whole_sale:
                            document.getElementById("whole-sale").value,
                          quantity_frame:
                            document.getElementById("quantity-frame").value,
                          note: document.getElementById("note").value,
                        };

                        // Send the updated data to the server
                        fetch("/products/update", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(updatedData),
                        })
                          .then((response) => response.json())
                          .then((data) => {
                            if (data.success) {
                              alert("Product updated successfully!");
                              document.getElementById(
                                "popup-container"
                              ).style.display = "none"; // Close the popup
                              // Optionally, refresh the product list here
                            } else {
                              alert("Failed to update product.");
                            }
                          })
                          .catch((error) => {
                            console.error("Error:", error);
                            alert("An error occurred.");
                          });
                      };
                    })
                    .catch((error) => {
                      console.error("Error fetching product details:", error);
                    });
                });

                iconsDiv.appendChild(editIcon);
                infoDiv.appendChild(iconsDiv);
                orderDiv.appendChild(infoDiv);

                // Append orderDiv to the container
                container.appendChild(orderDiv);
              });
            } else {
              container.innerHTML = "<p>No products found.</p>"; // Message if no products are found
            }
          })
          .catch((error) =>
            console.error("Error fetching search results:", error)
          );
      } else {
        document.querySelector(".container").innerHTML = ""; // Clear the container if input is empty
      }
    });

  // Add Product: Show the popup when Add button is clicked
  document.getElementById("add-button").addEventListener("click", function () {
    console.log("Add button clicked"); // Debugging log
    document.getElementById("popup-container").style.display = "flex"; // Show popup

    // Clear the form for adding a new product
    document.getElementById("product-name").value = "";
    document.getElementById("Thông số kỹ thuật sản phẩm").value = "";
    document.getElementById("price-per-m2").value = "";
    document.getElementById("price-per-unit").value = "";
    document.getElementById("extra-supply").value = "";
    document.getElementById("whole-sale").value = "";
    document.getElementById("quantity-frame").value = "";
    document.getElementById("note").value = "";

    // Set the save button to handle adding a new product
    const saveButton = document.getElementById("save-button");
    saveButton.onclick = function () {
      // Gather form data
      const formData = {
        product_name: document.getElementById("product-name").value,
        product_specification: document.getElementById(
          "Thông số kỹ thuật sản phẩm"
        ).value,
        price_perm2: document.getElementById("price-per-m2").value,
        price_per_unit: document.getElementById("price-per-unit").value,
        extra_supply: document.getElementById("extra-supply").value,
        whole_sale: document.getElementById("whole-sale").value,
        quantity_frame: document.getElementById("quantity-frame").value,
        note: document.getElementById("note").value,
      };

      // Send the data to the server via POST
      fetch("/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Product added successfully!");
            document.getElementById("popup-container").style.display = "none"; // Close the popup
            // Optionally, refresh the product list here
          } else {
            alert("Failed to add product.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred.");
        });
    };
  });

  // Close popup functionality
  document.getElementById("close-popup").addEventListener("click", function () {
    document.getElementById("popup-container").style.display = "none"; // Close the popup on clicking close
  });

  // Close the popup when clicking outside of it
  window.addEventListener("click", function (event) {
    if (event.target === document.getElementById("popup-container")) {
      document.getElementById("popup-container").style.display = "none";
    }
  });
});
