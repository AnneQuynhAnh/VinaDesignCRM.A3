document.addEventListener("DOMContentLoaded", function () {
  fetchDataFromDB(); // Fetch data from the server and display it

  const billPhoto = document.getElementById("bill-photo");
  const imageUpload = document.getElementById("image-upload");
  const addButton = document.getElementById("add-button");
  const saveButton = document.getElementById("save-button");
  const cancelButton = document.getElementById("cancel-button");
  const inputContainer = document.getElementById("input-container");
  const uploadedBillPhoto = document.getElementById("uploaded-bill-photo");
  const modalOverlay = document.getElementById("modal-overlay");
  let currentEditingOrderId = null; // To track the current editing order ID

  // Show modal and input container
  function showModal() {
    modalOverlay.style.display = "block"; // Show dimmed background
    inputContainer.style.display = "flex"; // Show input container
  }

  // Hide modal and input container
  function hideModal() {
    modalOverlay.style.display = "none"; // Hide dimmed background
    inputContainer.style.display = "none"; // Hide input container
  }

  // Event listener for clicks on the modal overlay to hide the modal
  modalOverlay.addEventListener("click", function (event) {
    // Check if the clicked element is the modal overlay, not inside the input container
    if (event.target === modalOverlay) {
      hideModal();
    }
  });

  // Close uploaded photo modal by clicking outside
  document.addEventListener("click", function (event) {
    const photoContainer = document.getElementById("uploaded-photo-container");
    if (photoContainer && !photoContainer.contains(event.target)) {
      photoContainer.style.display = "none"; // Hide the photo container
    }
  });

  // Event listener for showing the input container when the edit button or photo button is clicked
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("editbtn")) {
      const orderDiv = event.target.closest(".order"); // Get the parent order div
      const orderId = orderDiv
        .querySelector(".section.code p")
        .textContent.trim()
        .substring(1); // Extract order ID, remove '#' prefix
      handleEditClick(orderId); // Call the edit handler with the order ID
    } else if (event.target.classList.contains("photobtn")) {
      const orderDiv = event.target.closest(".order");
      const orderId = orderDiv
        .querySelector(".section.code p")
        .textContent.trim()
        .substring(1); // Extract order ID, remove '#' prefix
      handlePhotoClick(orderId); // Handle photo display
    }
  });

  // Function to handle edit button click
  function handleEditClick(orderId) {
    if (!orderId) {
      console.error("Invalid order ID:", orderId);
      return;
    }

    currentEditingOrderId = orderId; // Save the order ID for the current editing session

    // Fetch the order details by ID
    fetch(`/congno/get-order/${orderId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Order not found");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Order details fetched:", data);
        populateInputFields(data); // Populate input fields with the fetched data
        showModal(); // Show the input container and dimmed background
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        alert("Order not found.");
      });
  }

  // Function to handle photo button click
  function handlePhotoClick(orderId) {
    fetch(`/congno/get-order/${orderId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }
        return response.json();
      })
      .then((data) => {
        if (data.bill_photo) {
          // Show the image if the photo exists
          showOrderPhoto(data.bill_photo);
        } else {
          // Display the message if there is no photo
          displayNoImageMessage();
        }
      })
      .catch((error) => {
        console.error("Error fetching photo details:", error);
        alert("Failed to fetch photo details.");
      });
  }

  // Function to display the order photo
  function showOrderPhoto(photoPath) {
    uploadedBillPhoto.src = photoPath; // This should be in the format "/uploads/filename"
    uploadedBillPhoto.style.display = "block"; // Ensure the image is visible

    // Handle the case where the image fails to load
    uploadedBillPhoto.onerror = function () {
      console.error("Image not found at path:", photoPath);
      displayNoImageMessage(); // Display an error message if the image cannot be loaded
    };

    // Show the photo container if it's hidden
    document.getElementById("uploaded-photo-container").style.display = "block";
  }

  // Function to display "Chưa cập nhật hình ảnh" message
  function displayNoImageMessage() {
    const uploadedBillPhoto = document.getElementById("uploaded-bill-photo");
    uploadedBillPhoto.src = ""; // Clear the image source
    uploadedBillPhoto.alt = "Chưa cập nhật hình ảnh"; // Set alt text
    uploadedBillPhoto.style.display = "none"; // Hide the image

    // Check if the message already exists
    let existingMessage =
      uploadedBillPhoto.parentElement.querySelector(".no-image-message");
    if (!existingMessage) {
      const message = document.createElement("p");
      message.textContent = "Chưa cập nhật hình ảnh";
      message.classList.add("no-image-message");
      message.style.color = "red";
      uploadedBillPhoto.parentElement.appendChild(message);
    }
  }

  // Populate input fields with order data
  function populateInputFields(data) {
    document.getElementById("order-number").value = data.order_id;
    document.getElementById("company-name").value = data.company_name;
    document.getElementById("products").value = data.product_details;
    document.getElementById("price").value = data.price;
    document.getElementById("condition").value = data.status;

    if (data.bill_photo) {
      uploadedBillPhoto.src = `/${data.bill_photo}`; // Adjusted to correctly show the image from the path
      billPhoto.src = `/${data.bill_photo}`;
      billPhoto.onerror = function () {
        // If image fails to load, show the "Chưa cập nhật hình ảnh" message
        displayNoImageMessage();
      };
    } else {
      displayNoImageMessage();
    }
  }

  // Event listener for showing the input container when the add button is clicked
  if (addButton) {
    addButton.addEventListener("click", function () {
      currentEditingOrderId = null; // Reset the editing ID for new order
      clearInputFields(); // Clear the input fields for new order
      showModal(); // Show the input container and dimmed background
    });
  }

  // Clear input fields for adding new order
  function clearInputFields() {
    document.getElementById("order-number").value = "";
    document.getElementById("company-name").value = "";
    document.getElementById("products").value = "";
    document.getElementById("price").value = "";
    document.getElementById("condition").value = "";
    uploadedBillPhoto.src = "";
    uploadedBillPhoto.alt = "Bill Photo";
  }

  // Handle image upload
  if (imageUpload) {
    imageUpload.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        compressImage(file, 800, 0.7, (compressedFile) => {
          const reader = new FileReader();
          reader.onload = function (e) {
            uploadedBillPhoto.src = e.target.result; // Set the source of the uploaded image
            if (billPhoto) {
              billPhoto.src = e.target.result; // Update the source of the original bill photo
            }
          };
          reader.readAsDataURL(compressedFile);
        });
      }
    });
  }

  // Function to compress the image
  function compressImage(file, maxWidth, quality, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const scaleSize = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            callback(blob);
          },
          "image/jpeg",
          quality
        );
      };
    };
  }

  // Event listener for save button
  if (saveButton) {
    saveButton.addEventListener("click", function () {
      const orderNumber = document.getElementById("order-number").value;
      const companyName = document.getElementById("company-name").value;
      const products = document.getElementById("products").value;
      const price = document.getElementById("price").value;
      const status = document.getElementById("condition").value;

      const formData = new FormData();
      formData.append("orderNumber", orderNumber);
      formData.append("companyName", companyName);
      formData.append("products", products);
      formData.append("price", price);
      formData.append("status", status);

      // If adding a new order
      if (!currentEditingOrderId) {
        if (imageUpload.files[0]) {
          compressImage(imageUpload.files[0], 800, 0.7, (compressedFile) => {
            formData.append("billPhoto", compressedFile); // Append compressed image file

            fetch("/congno/save-data", {
              method: "POST",
              body: formData,
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("Success:", data);
                alert("Data saved successfully!");
                fetchDataFromDB(); // Refresh the data
                hideModal(); // Hide input container and dimmed background
              })
              .catch((error) => {
                console.error("Error:", error);
                alert("Failed to save data!");
              });
          });
        } else {
          fetch("/congno/save-data", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
              alert("Data saved successfully!");
              fetchDataFromDB(); // Refresh the data
              hideModal(); // Hide input container and dimmed background
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Failed to save data!");
            });
        }
      } else {
        // If editing an existing order
        formData.append("orderId", currentEditingOrderId); // Include the current editing order ID

        if (imageUpload.files[0]) {
          compressImage(imageUpload.files[0], 800, 0.7, (compressedFile) => {
            formData.append("billPhoto", compressedFile); // Append compressed image file

            fetch("/congno/update-order", {
              method: "POST",
              body: formData,
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("Success:", data);
                alert("Data updated successfully!");
                fetchDataFromDB(); // Refresh the data
                hideModal(); // Hide input container and dimmed background
              })
              .catch((error) => {
                console.error("Error:", error);
                alert("Failed to update data!");
              });
          });
        } else {
          fetch("/congno/update-order", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
              alert("Data updated successfully!");
              fetchDataFromDB(); // Refresh the data
              hideModal(); // Hide input container and dimmed background
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Failed to update data!");
            });
        }
      }
    });
  }

  // Event listener for cancel button
  if (cancelButton) {
    cancelButton.addEventListener("click", function () {
      hideModal(); // Hide input container and dimmed background
    });
  }

  // Fetch data from the database
  function fetchDataFromDB() {
    fetch("/congno/get-data")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetched:", data);
        displayData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  // Display fetched data
  function displayData(data) {
    const container = document.getElementById("order-container");
    if (!container) {
      console.error("Order container element not found.");
      return;
    }
    container.innerHTML = ""; // Clear the existing content

    data.forEach((item) => {
      const orderDiv = document.createElement("div");
      orderDiv.classList.add("order");
      orderDiv.innerHTML = `
        <div class="section code">
          <p>#${item.order_id}</p>
        </div>
        <div class="section info">
          <div class="column">
            <p>CÔNG TY: ${item.company_name}</p>
            <p>SẢN PHẨM: ${item.product_details}</p>
          </div>
        </div>
        <div class="section delivery">
          <div class="column">
            <p>${formatPrice(item.price)}</p>
          </div>
        </div>
        <div class="section actions">
          <div class="result">
            <p>${item.status}</p>
          </div>
        </div>
        <div class="section charged">
          <img src="../Assets/images/editpic.png" alt="Edit Icon" class="editbtn">
          <img src="../Assets/images/photo.png" alt="Bill Photo" class="photobtn">
        </div>
      `;
      container.appendChild(orderDiv);
    });
  }

  // Format price function to add commas and remove unnecessary decimals
  function formatPrice(price) {
    const formattedPrice = parseFloat(price)
      .toFixed(3)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    return `${formattedPrice} VND`;
  }
});
