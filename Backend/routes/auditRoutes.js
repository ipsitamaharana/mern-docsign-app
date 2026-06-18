const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Audit = require("../models/Audit");

router.get("/:fileId", async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(
      req.params.fileId
    );

    const audits = await Audit.find({
      fileId,
    });

    res.status(200).json(audits);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;