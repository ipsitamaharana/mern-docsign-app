const nodemailer = require("nodemailer");

const sendEmail = async (to, signingLink) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Document Signature Request",
    html: `
      <h2>Please Sign the Document</h2>
      <p>Click the link below to sign:</p>
      <a href="${signingLink}">
        ${signingLink}
      </a>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;