
const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const docsRoutes = require("./routes/docsRoutes");
console.log(process.env.MONGO_URI);

const app = express();
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.log("MongoDB Error ❌", err);
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/upload", uploadRoutes);
  app.use("/api/docs", docsRoutes);

app.get("/", (req, res) => {
  res.send("Hello Ipsita! Backend is working 🚀");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});