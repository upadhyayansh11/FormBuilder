const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const formRoutes = require("./routes/formRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("Successfully connected to MongoDB Atlas!"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.get("/", (req, res) => {
  res.send("Form Builder API is running!");
});

app.use("/api/forms", formRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
