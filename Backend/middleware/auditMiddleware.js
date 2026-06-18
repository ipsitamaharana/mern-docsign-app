const Audit = require("../models/Audit");

const auditMiddleware = async (
  req,
  res,
  next
) => {
  try {
    const { fileId, signer } = req.body;

    if (fileId && signer) {
      await Audit.create({
        fileId,
        signer,
        ipAddress: req.ip,
      });
    }

    next();
  } catch (error) {
    console.log(
      "Audit Error:",
      error.message
    );

    next();
  }
};

module.exports = auditMiddleware;