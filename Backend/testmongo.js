const dns = require("dns");

// Force Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ipsitamaharana70_db_user:IPMongodb2026@cluster0.yzevgbo.mongodb.net/?appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.log("MongoDB Error ❌", err);
  });