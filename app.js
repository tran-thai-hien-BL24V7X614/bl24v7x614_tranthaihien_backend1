const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

// Route mặc định
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to contact book application."
  });
});

module.exports = app;