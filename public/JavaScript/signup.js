signupForm.addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent form from submitting

  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/users/signup", {
      // Updated path
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullname, email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      emailConfirmationPopup.style.display = "flex"; // Show the popup
      document.body.classList.add("popup-active"); // Add class to hide the container
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.error("Error during sign-up:", error);
    alert("An error occurred. Please try again.");
  }
});
