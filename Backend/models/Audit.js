const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: true,
  },

  signer: {
    type: String,
    required: true,
  },

  ipAddress: {
    type: String,
    required: true,
  },

  signedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Audit", auditSchema);