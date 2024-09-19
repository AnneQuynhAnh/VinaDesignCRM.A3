document.addEventListener("DOMContentLoaded", function () {
  // Fetch and inject the navbar HTML
  fetch("../HTML/navbar-ad.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;

      // Fetch and display the user's full name
      fetch("/users/current")
        .then((response) => response.json())
        .then((data) => {
          const usernameElement = document.querySelector(".username");
          if (usernameElement) {
            usernameElement.textContent = data.fullname || "Unknown User";
          } else {
            console.error("Username element not found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          const usernameElement = document.querySelector(".username");
          if (usernameElement) {
            usernameElement.textContent = "Error Loading User";
          }
        });

      // Notification functionality
      const notificationImg = document.querySelector(".notification-img");
      const notificationsContainer = document.getElementById(
        "notifications-container"
      );

      if (notificationImg && notificationsContainer) {
        notificationImg.addEventListener("click", function () {
          if (notificationsContainer.style.display === "block") {
            notificationsContainer.style.display = "none"; // Hide if already visible
          } else {
            notificationsContainer.innerHTML =
              "<p>Bạn hiện không có thông báo nào.</p>"; // Set the message
            notificationsContainer.style.display = "block"; // Show the notification box
          }
        });
      } else {
        console.error("Notification icon or container not found.");
      }

      // Initialize the toggle functionality after the navbar HTML is loaded
      const toggleBtn = document.getElementById("toggle-btn");
      if (toggleBtn) {
        toggleBtn.addEventListener("click", toggleNavbar);
      }

      // Function to toggle the navbar state
      function toggleNavbar() {
        const navbar = document.querySelector(".navbar");
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
      }
    })
    .catch((error) => {
      console.error("Error fetching navbar HTML:", error);
    });
  // In navbar-ad.js
  // Define the toggleNavbar function globally
  function toggleNavbar() {
    const navbar = document.querySelector(".navbar");
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
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Fetch and inject the navbar HTML
    fetch("../HTML/navbar-ad.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("navbar-placeholder").innerHTML = data;

        // Fetch and display the user's full name
        fetch("/users/current")
          .then((response) => response.json())
          .then((data) => {
            const usernameElement = document.querySelector(".username");
            if (usernameElement) {
              usernameElement.textContent = data.fullname || "Unknown User";
            } else {
              console.error("Username element not found.");
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            const usernameElement = document.querySelector(".username");
            if (usernameElement) {
              usernameElement.textContent = "Error Loading User";
            }
          });

        // Notification functionality
        const notificationImg = document.querySelector(".notification-img");
        const notificationsContainer = document.getElementById(
          "notifications-container"
        );

        if (notificationImg && notificationsContainer) {
          notificationImg.addEventListener("click", function () {
            if (notificationsContainer.style.display === "block") {
              notificationsContainer.style.display = "none"; // Hide if already visible
            } else {
              notificationsContainer.innerHTML =
                "<p>Bạn hiện không có thông báo nào.</p>"; // Set the message
              notificationsContainer.style.display = "block"; // Show the notification box
            }
          });
        } else {
          console.error("Notification icon or container not found.");
        }

        // Initialize the toggle functionality after the navbar HTML is loaded
        const toggleBtn = document.getElementById("toggle-btn");
        if (toggleBtn) {
          toggleBtn.addEventListener("click", toggleNavbar);
        }
      })
      .catch((error) => {
        console.error("Error fetching navbar HTML:", error);
      });
  });
});
