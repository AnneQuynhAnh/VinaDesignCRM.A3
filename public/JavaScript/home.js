document.addEventListener("DOMContentLoaded", function () {
  // Retrieve and display user's full name from localStorage
  const fullname = localStorage.getItem("username");

  if (fullname) {
    document.querySelector(".user-info h2").textContent = fullname;
  } else {
    // Redirect to sign-in page if user is not signed in
    window.location.href = "signin.html";
  }

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
});
