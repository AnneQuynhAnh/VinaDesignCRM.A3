document.addEventListener("DOMContentLoaded", function () {
  // Fetch user details and populate fields
  fetch("/users/current")
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        document.getElementById("profile-name").textContent = data.fullname;
        document.getElementById("email-input").value = data.email || "";
        document.getElementById("phone-input").value = data.phone_no || "";
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
});

function updateProfile() {
  const email = document.getElementById("email-input").value;
  const currentPassword = document.getElementById(
    "current-password-input"
  ).value;
  const newPassword = document.getElementById("new-password-input").value;
  const confirmPassword = document.getElementById(
    "confirm-password-input"
  ).value;
  const phoneNo = document.getElementById("phone-input").value;

  if (newPassword && newPassword !== confirmPassword) {
    alert("New passwords do not match!");
    return;
  }

  fetch("/users/updateProfile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      currentPassword,
      newPassword,
      phoneNo,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        alert("Profile updated successfully!");
      } else {
        alert(result.error || "Failed to update profile.");
      }
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
    });
}
