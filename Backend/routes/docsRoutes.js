const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const File = require("../models/File");

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

    const files = await File.find();

    res.status(200).json(files);

});

module.exports = router;