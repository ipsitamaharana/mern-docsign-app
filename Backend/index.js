
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const docsRoutes = require("./routes/docsRoutes");
const signatureRoutes = require("./routes/signatureRoutes");
const auditRoutes = require("./routes/auditRoutes");
console.log(process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));


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
  app.use("/api/signatures", signatureRoutes);
  app.use("/api/audit", auditRoutes);
  
app.get("/", (req, res) => {
  res.send("Hello Ipsita! Backend is working 🚀");
});

app.listen(5000, () => {
  console.log("IPSITA NEW SERVER STARTED");
});