const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const fs = require("fs");
const path = require("path");
const { PDFDocument, rgb } = require("pdf-lib");

const Signature = require("../models/Signature");
const File = require("../models/File");

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

router.post("/generate/:fileId", async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);

    if (!file) {
      return res.status(404).json({
        message: "File not found",
      });
    }

    const signature = await Signature.findOne({
      fileId: req.params.fileId,
    });

    if (!signature) {
      return res.status(404).json({
        message: "Signature not found",
      });
    }

    const pdfBytes = fs.readFileSync(file.path);

    const pdfDoc = await PDFDocument.load(pdfBytes);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    firstPage.drawText(`Signed By: ${signature.signer}`, {
      x: signature.coordinates.x,
      y: signature.coordinates.y,
      size: 18,
      color: rgb(0, 0, 0),
    });

    const signedPdfBytes = await pdfDoc.save();

    const signedDir = "uploads/signed";

    if (!fs.existsSync(signedDir)) {
      fs.mkdirSync(signedDir, { recursive: true });
    }

    const signedFileName = `signed-${file.filename}`;

    const signedPath = path.join(
      signedDir,
      signedFileName
    );

    fs.writeFileSync(
      signedPath,
      signedPdfBytes
    );

    res.status(200).json({
      message: "Signed PDF generated successfully",
      file: signedPath,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.post("/share/:fileId", async (req, res) => {
  try {
    const { signerEmail } = req.body;

    const token = crypto.randomBytes(16).toString("hex");

    const signature = await Signature.findOneAndUpdate(
      { fileId: req.params.fileId },
      {
        signerEmail,
        token,
      },
      { new: true }
    );

    if (!signature) {
      return res.status(404).json({
        message: "Signature not found",
      });
    }

   const signingLink = `http://localhost:5173/sign/${token}`;

await sendEmail(
  signerEmail,
  signingLink
);

res.status(200).json({
  message: "Email sent successfully",
  signingLink,
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;