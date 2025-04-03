require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRouters");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", userRoutes);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate(); // Ensure DB connection
    console.log("✅ Database connected successfully!");

    await sequelize.sync(); // Sync Database
    console.log("✅ Database synchronized!");

    console.log(`🚀 Server is running on port ${PORT}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
});
