const mongoose = require("mongoose");

const signatureSchema = new mongoose.Schema({
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: true,
  },

  coordinates: {
    x: {
      type: Number,
      required: true,
    },

    y: {
      type: Number,
      required: true,
    },
  },

  signer: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "signed"],
    default: "pending",
  },
});

module.exports = mongoose.model("Signature", signatureSchema);