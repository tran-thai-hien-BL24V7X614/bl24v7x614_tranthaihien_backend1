const express = require("express");
const cors = require("cors");

const contactsRouter = require("./app/routes/contact.route"); // kiểm tra đúng tên file
const ApiError = require("./app/api-error");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contacts", contactsRouter);

// Route mặc định
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to contact book application."
  });
});

// Handle 404
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

// Error-handling middleware (PHẢI đặt cuối cùng)
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error"
  });
});

module.exports = app;