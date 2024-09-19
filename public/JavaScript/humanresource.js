document.addEventListener("DOMContentLoaded", () => {
  // Fetch all users from the server
  fetch("/users/all")
    .then((response) => response.json())
    .then((users) => {
      const gridContainer = document.querySelector(".grid-container");

      users.forEach((user) => {
        // Create the rectangle container
        const rectangleContainer = document.createElement("div");
        rectangleContainer.classList.add("rectangle-container");

        // Create the profile div
        const profileDiv = document.createElement("div");
        profileDiv.classList.add("profile");

        // Profile image
        const profileImage = document.createElement("img");
        profileImage.src = "../Assets/images/profile.png";
        profileImage.alt = "Profile Image";
        profileImage.classList.add("profile-image");

        // Profile info div
        const profileInfoDiv = document.createElement("div");
        profileInfoDiv.classList.add("profile-info");

        // Name div with edit icon
        const nameDiv = document.createElement("div");
        nameDiv.classList.add("name-gender");

        const profileNameSpan = document.createElement("span");
        profileNameSpan.classList.add("profile-name");
        profileNameSpan.textContent = user.fullname || "chưa cập nhật";

        // Edit icon next to the name
        const editIcon = document.createElement("img");
        editIcon.src = "../Assets/images/editpic.png"; // Path to your edit icon
        editIcon.alt = "Edit Icon";
        editIcon.classList.add("edit-icon");
        editIcon.style.cursor = "pointer"; // Make the icon clickable

        // Add event listener to open edit popup on click
        editIcon.addEventListener("click", function () {
          openEditUserPopup(user);
        });

        nameDiv.appendChild(profileNameSpan);
        nameDiv.appendChild(editIcon); // Append the edit icon next to the name

        // Additional icons div
        const additionalIconsDiv = document.createElement("div");
        additionalIconsDiv.classList.add("additional-icons");

        // Text icon
        const textIconWrapper = document.createElement("div");
        textIconWrapper.classList.add("icon-wrapper");
        const textIcon = document.createElement("img");
        textIcon.src = "../Assets/images/text.png";
        textIcon.alt = "Text Icon";
        textIcon.classList.add("icon-image", "text-icon");
        textIcon.dataset.name = user.fullname;
        textIconWrapper.appendChild(textIcon);

        // Report icon
        const reportIconWrapper = document.createElement("div");
        reportIconWrapper.classList.add("icon-wrapper");
        const reportLink = document.createElement("a");
        reportLink.href = `report.html?name=${encodeURIComponent(
          user.fullname
        )}`;
        reportLink.target = "_blank";
        const reportButton = document.createElement("button");
        reportButton.classList.add("action-button");
        const reportImage = document.createElement("img");
        reportImage.src = "../Assets/images/form.png";
        reportImage.alt = "Report";
        reportImage.classList.add("button-image");
        reportButton.appendChild(reportImage);
        reportLink.appendChild(reportButton);
        reportIconWrapper.appendChild(reportLink);

        // Staff Evaluation icon
        const evaluationIconWrapper = document.createElement("div");
        evaluationIconWrapper.classList.add("icon-wrapper");
        const evaluationImage = document.createElement("img");
        evaluationImage.src = "../Assets/images/staffevaluation.png";
        evaluationImage.alt = "Staff Evaluation";
        evaluationImage.classList.add("button-image");
        evaluationIconWrapper.appendChild(evaluationImage);

        // Event listener to open the evaluation popup
        evaluationImage.addEventListener("click", function () {
          openEvaluationBox(user.fullname, user.position, user.ID);
        });

        // Append all icons to the additional icons div
        additionalIconsDiv.appendChild(textIconWrapper);
        additionalIconsDiv.appendChild(reportIconWrapper);
        additionalIconsDiv.appendChild(evaluationIconWrapper);

        // Append name and additional icons to profile info
        profileInfoDiv.appendChild(nameDiv);
        profileInfoDiv.appendChild(additionalIconsDiv);

        // Append profile image and profile info to profile div
        profileDiv.appendChild(profileImage);
        profileDiv.appendChild(profileInfoDiv);

        // Append profile div to rectangle container
        rectangleContainer.appendChild(profileDiv);

        // Append rectangle container to grid container
        gridContainer.appendChild(rectangleContainer);

        // Add event listener for info icon creation and functionality
        const infoIconWrapper = document.createElement("div");
        infoIconWrapper.classList.add("icon-wrapper");

        const infoIcon = document.createElement("img");
        infoIcon.src = "../Assets/images/infoicon-03.jpg";
        infoIcon.alt = "Info Icon";
        infoIcon.classList.add("info-icon");
        infoIcon.style.width = "30px";
        infoIcon.style.height = "30px";
        infoIcon.dataset.name = user.fullname || "chưa cập nhật";
        infoIcon.dataset.position = user.position || "chưa cập nhật";
        infoIcon.dataset.dateJoining = user.date_joining || "chưa cập nhật";
        infoIcon.dataset.address = user.address || "chưa cập nhật";
        infoIcon.dataset.phone = user.phone_no || "chưa cập nhật";
        infoIcon.dataset.email = user.email || "chưa cập nhật";
        infoIconWrapper.appendChild(infoIcon);
        rectangleContainer.appendChild(infoIconWrapper);

        infoIcon.addEventListener("click", function (e) {
          e.stopPropagation();
          openInfoBox(this);
        });
      });

      // Chatbox logic
      document.querySelectorAll(".text-icon").forEach((icon) => {
        icon.addEventListener("click", () => {
          const name = icon.getAttribute("data-name");
          const chatboxHeaderName = document.getElementById(
            "chatbox-header-name"
          );
          const chatbox = document.getElementById("chatbox");

          if (chatboxHeaderName) {
            chatboxHeaderName.textContent = name;
          } else {
            console.error("Element with ID 'chatbox-header-name' not found.");
          }

          if (chatbox) {
            chatbox.style.display = "flex";
          } else {
            console.error("Element with ID 'chatbox' not found.");
          }
        });
      });
    })
    .catch((error) => console.error("Error fetching users:", error));

  // Function to open the info box

  // Function to open the info box
  function openInfoBox(infoElement) {
    document.querySelector(".info-name").textContent = infoElement.dataset.name;
    document.querySelector(".info-position").textContent =
      infoElement.dataset.position;
    document.getElementById("info-date").textContent =
      infoElement.dataset.dateJoining;
    document.getElementById("info-address").textContent =
      infoElement.dataset.address;
    document.getElementById("info-phone").textContent =
      infoElement.dataset.phone;
    document.getElementById("info-email").textContent =
      infoElement.dataset.email;

    const infoBox = document.getElementById("info-box");
    infoBox.style.display = "block";
  }

  // Function to handle closing the info box
  function closeInfoBox() {
    const infoBox = document.getElementById("info-box");
    infoBox.style.display = "none";
  }

  // Ensure the close button is properly targeted and the event listener is added
  const closeBtn = document.querySelector("#info-box .close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeInfoBox);
  }

  // Function to handle closing the info box
  function closeInfoBox() {
    const infoBox = document.getElementById("info-box");
    infoBox.style.display = "none";
  }

  // Add event listener for the close button inside the info box
  document.addEventListener("DOMContentLoaded", () => {
    const closeBtn = document.querySelector(".info-box .close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeInfoBox);
    }
  });

  // Function to handle closing the info box
  function closeInfoBox() {
    const infoBox = document.getElementById("info-box");
    infoBox.style.display = "none";
  }

  // Add event listener for the close button inside the info box
  document.addEventListener("DOMContentLoaded", () => {
    const closeBtn = document.querySelector(".info-box .close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeInfoBox);
    }
  });

  // Ensure clicking outside the info box also closes it
  window.addEventListener("click", function (event) {
    const infoBox = document.getElementById("info-box");
    if (event.target === infoBox) {
      closeInfoBox();
    }
  });

  // Function to handle the click on the edit icon
  function openEditUserPopup(user) {
    // Remove existing popups if any
    const existingPopup = document.querySelector(".edit-user-popup");
    if (existingPopup) existingPopup.remove();

    const editUserPopup = document.createElement("div");
    editUserPopup.classList.add("edit-user-popup");
    editUserPopup.style.cssText = `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 40%;
    margin-top: 20px;
    background-color: black;
    padding: 20px;
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
    color: white;
  `;

    const dateJoining = user.date_joining ? new Date(user.date_joining) : null;
    const formattedDateJoining =
      dateJoining instanceof Date && !isNaN(dateJoining)
        ? dateJoining.toISOString().split("T")[0]
        : "";

    editUserPopup.innerHTML = `
    <div class="edit-user-content">
      <label for="edit-fullname">Tên đầy đủ:</label>
      <input type="text" id="edit-fullname" name="fullname" value="${
        user.fullname || ""
      }" style="color: black;" />

      <label for="edit-position">Chức vụ:</label>
      <input type="text" id="edit-position" name="position" value="${
        user.position || ""
      }" style="color: black;" />

      <label for="edit-date-joining">Ngày vào làm:</label>
      <input type="date" id="edit-date-joining" name="date_joining" value="${formattedDateJoining}" style="color: black;" />

      <label for="edit-address">Địa chỉ:</label>
      <input type="text" id="edit-address" name="address" value="${
        user.address || ""
      }" style="color: black;" />

      <label for="edit-phone">Số điện thoại:</label>
      <input type="text" id="edit-phone" name="phone_no" value="${
        user.phone_no || ""
      }" style="color: black;" />

      <label for="edit-email">Email:</label>
      <input type="text" id="edit-email" name="email" value="${
        user.email || ""
      }" style="color: black;" />

      <div class="edit-user-buttons" style="margin-top: 10px;">
        <button id="save-edit-user">Lưu</button>
        <button id="cancel-edit-user">Hủy</button>
      </div>
    </div>
  `;

    document.body.appendChild(editUserPopup);

    // Add functionality to save and cancel buttons
    document.getElementById("save-edit-user").addEventListener("click", () => {
      const updatedUser = {
        ID: user.ID,
        fullname: document.getElementById("edit-fullname").value,
        position: document.getElementById("edit-position").value,
        date_joining: document.getElementById("edit-date-joining").value,
        address: document.getElementById("edit-address").value,
        phone_no: document.getElementById("edit-phone").value,
        email: document.getElementById("edit-email").value,
      };

      // Send the updated user data to the server
      fetch("/users/updatestaff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Người dùng đã được cập nhật thành công!");
            editUserPopup.remove(); // Close the popup
            fetchAllUsers(); // Refresh user data
          } else {
            alert("Cập nhật người dùng thất bại.");
          }
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    });

    document
      .getElementById("cancel-edit-user")
      .addEventListener("click", () => {
        editUserPopup.remove(); // Close the popup
      });
  }

  // Function to open the evaluation box
  function openEvaluationBox(name, position, userId) {
    console.log("Opening evaluation box for userId:", userId);
    const evaluationBox = document.getElementById("evaluation-box");

    if (!evaluationBox) {
      console.error("Evaluation box element not found.");
      return;
    }

    evaluationBox.querySelector(".employee-name").textContent = name;
    evaluationBox.querySelector(".info-position").textContent =
      position || "chưa cập nhật";
    evaluationBox.querySelector(".evaluation-month").textContent =
      getCurrentMonth();
    evaluationBox.setAttribute("data-user-id", userId);
    resetEvaluationForm();
    evaluationBox.style.display = "block";
  }

  // Close functionality for the evaluation box
  const evaluationBox = document.getElementById("evaluation-box");
  if (evaluationBox) {
    const closeEvaluationBtn = evaluationBox.querySelector(".close-btn");
    if (closeEvaluationBtn) {
      closeEvaluationBtn.addEventListener("click", function () {
        evaluationBox.style.display = "none";
      });
    }
  }

  // Get current month
  function getCurrentMonth() {
    const months = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
    const now = new Date();
    return months[now.getMonth()];
  }

  // Highlight stars based on rating
  function highlightStars(parent, rating) {
    parent.querySelectorAll(".star").forEach((star) => {
      star.classList.toggle("active", star.dataset.value <= rating);
    });
  }

  // Reset evaluation form
  function resetEvaluationForm() {
    if (!evaluationBox) {
      console.error("Evaluation box element not found.");
      return;
    }

    evaluationBox.querySelectorAll(".star-rating").forEach((rating) => {
      rating.dataset.currentRating = 0;
      highlightStars(rating, 0);
    });
    document.getElementById("strengths").value = "";
    document.getElementById("weaknesses").value = "";
  }

  // Star click event listeners
  document.querySelectorAll(".star").forEach((star) => {
    star.addEventListener("click", function () {
      const rating = this.dataset.value;
      const parent = this.closest(".star-rating");
      parent.dataset.currentRating = rating;
      highlightStars(parent, rating);
    });
  });

  // Evaluation box update functionality
  const updateBtn = document.getElementById("update-evaluation");
  if (updateBtn) {
    updateBtn.addEventListener("click", function () {
      const performanceRating =
        document.querySelector("[data-rating-type='performance']").dataset
          .currentRating || 0;
      const attitudeRating =
        document.querySelector("[data-rating-type='attitude']").dataset
          .currentRating || 0;
      const strengths = document.getElementById("strengths").value;
      const weaknesses = document.getElementById("weaknesses").value;

      const userId = evaluationBox.getAttribute("data-user-id");
      console.log("Sending evaluation data for userId:", userId);

      // Send the data to the server
      fetch("/users/evaluation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          performanceRating: performanceRating,
          attitudeRating: attitudeRating,
          strengths: strengths,
          weaknesses: weaknesses,
        }),
      })
        .then((response) => {
          return response.json().then((data) => ({
            data: data,
            response: response,
          }));
        })
        .then(({ data, response }) => {
          console.log("Evaluation updated:", data);
          if (response.ok) {
            alert("Evaluation updated successfully!");
            evaluationBox.style.display = "none";
          } else {
            alert("Error updating evaluation: " + data.error);
          }
        })
        .catch((error) => console.error("Error updating evaluation:", error));
    });
  }
});
