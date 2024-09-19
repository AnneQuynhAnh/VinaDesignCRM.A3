document
  .getElementById("signinForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.querySelector('input[name="role"]:checked').value;

    try {
      const response = await fetch("/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Store the full name and role in localStorage for use on other pages
        localStorage.setItem("fullname", result.fullname);
        localStorage.setItem("role", result.role);

        // Redirect based on the user's role
        if (role === "admin") {
          window.location.href = "home-ad.html";
        } else if (role === "employee") {
          window.location.href = "home.html";
        } else {
          alert("Unknown role.");
        }
      } else {
        // Display an error message
        alert(result.error);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("An error occurred. Please try again.");
    }
  });
