const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");
const setupSwaggerDocs = require("./swagger"); // Import Swagger setup

dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Set up routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Swagger setup
setupSwaggerDocs(app);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
