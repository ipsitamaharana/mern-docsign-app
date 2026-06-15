const express = require("express");
const router = express.Router();

const Signature = require("../models/Signature");

router.post("/", async (req, res) => {
  try {
    const { fileId, coordinates, signer } = req.body;

    const signature = await Signature.create({
      fileId,
      coordinates,
      signer,
    });

    res.status(201).json(signature);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;