const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const File = require("../models/File");
const Signature = require("../models/Signature");

// Upload PDF
router.post(
    "/upload",
    upload.single("pdf"),
    async (req, res) => {

        const file = await File.create({
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size
        });

        res.status(200).json({
            message: "PDF uploaded successfully",
            file
        });

    }
);

// Get all uploaded documents
router.get("/", async (req, res) => {
  try {
    const files = await File.find();

    const filesWithStatus = await Promise.all(
      files.map(async (file) => {
        const signature = await Signature.findOne({
          fileId: file._id,
        });

        return {
          ...file.toObject(),
          status: signature
            ? signature.status
            : "pending",
        };
      })
    );

    res.status(200).json(filesWithStatus);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;