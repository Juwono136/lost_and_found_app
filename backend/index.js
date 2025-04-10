require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");

// Route modules
const authRouter = require("./routes/auth");
const itemsRouter = require("./routes/items");
const meetingsRouter = require("./routes/meetings");
const notificationsRouter = require("./routes/notifications");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Mount routes
app.use("/auth", authRouter);            
app.use("/items", itemsRouter);
app.use("/meetings", meetingsRouter);
app.use("/notifications", notificationsRouter);

// Health check
app.get("/", (req, res) => {
  res.send("Backend API is running.");
});

// Start the server after connecting to MongoDB
const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("Database connection error:", err));
