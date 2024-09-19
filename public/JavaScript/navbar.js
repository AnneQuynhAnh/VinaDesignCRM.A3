document.addEventListener("DOMContentLoaded", function () {
  // Load the navbar HTML
  fetch("../HTML/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      const navbarPlaceholder = document.getElementById("navbar-placeholder");

      if (navbarPlaceholder) {
        navbarPlaceholder.innerHTML = data;

        // Initialize event listeners for the dynamically loaded navbar content
        initializeNavbarEventListeners();

        // Fetch and display the user's full name with credentials
        fetch("/users/current", {
          credentials: "include",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            const usernameElement = document.querySelector(".username");
            if (usernameElement) {
              usernameElement.textContent = data.fullname || "Unknown User";
              localStorage.setItem("username", data.fullname);
            } else {
              console.error("Username element not found in navbar.");
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            const usernameElement = document.querySelector(".username");
            if (usernameElement) {
              usernameElement.textContent = "Error Loading User";
            }
          });
      } else {
        console.error("Navbar placeholder element not found.");
      }
    })
    .catch((error) => {
      console.error("Error fetching navbar HTML:", error);
    });
});

// Function to initialize event listeners for dynamically loaded navbar
function initializeNavbarEventListeners() {
  const toggleBtn = document.getElementById("toggle-btn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleNavbar); // Attach the event handler properly
  } else {
    console.error("Toggle button not found.");
  }

  document.querySelectorAll(".nav-btn").forEach((button) => {
    if (button.textContent.trim() === "BÁO CÁO") {
      button.addEventListener("click", redirectToUserReport);
    }
  });

  const notificationImg = document.querySelector(".notification-img");
  const notificationsContainer = document.getElementById(
    "notifications-container"
  );

  if (notificationImg && notificationsContainer) {
    notificationImg.addEventListener("click", function () {
      if (notificationsContainer.style.display === "block") {
        notificationsContainer.style.display = "none";
      } else {
        notificationsContainer.innerHTML =
          "<p>Bạn hiện không có thông báo nào.</p>";
        notificationsContainer.style.display = "block";
      }
    });
  } else {
    console.error("Notification icon or container not found.");
  }
}

// Function to toggle the navbar state
window.toggleNavbar = function () {
  // Ensure this function is available globally
  const navbar = document.getElementById("navbar");
  if (!navbar) {
    console.error("Navbar element not found.");
    return;
  }

  navbar.classList.toggle("collapsed");

  const toggleArrow = document.querySelector(".toggle-btn img");

  if (navbar.classList.contains("collapsed")) {
    toggleArrow.style.transform = "rotate(0deg)";
  } else {
    toggleArrow.style.transform = "rotate(180deg)";
  }
};

// Function to redirect to the report page with the logged-in user's name
function redirectToUserReport() {
  const userName = localStorage.getItem("username");

  if (!userName) {
    console.error("User name not found. Make sure the user is logged in.");
    return;
  }

  const encodedUserName = encodeURIComponent(userName);
  const reportUrl = `/HTML/report.html?name=${encodedUserName}`;
  location.href = reportUrl;
}
