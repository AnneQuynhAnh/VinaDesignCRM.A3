const bcrypt = require("bcrypt");
const connection = require("../database"); // Adjust the path to where your database connection file is

const users = [
  { id: 1, email: "s3978161@rmit.edu.vn", password: "1234" },
  { id: 2, email: "anne@vinadesign.vn", password: "1234" },
  { id: 3, email: "annetruongquynhanh@gmail.com", password: "Anne" },
];

users.forEach(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const query = "UPDATE users SET password = ? WHERE id = ?";
  connection.query(query, [hashedPassword, user.id], (err, results) => {
    if (err) {
      console.error(`Error updating password for user ${user.email}:`, err);
    } else {
      console.log(`Password updated for user ${user.email}`);
    }
  });
});
