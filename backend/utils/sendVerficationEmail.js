const sendEmail = require('./sendEmail');

const sendVerificationEmail = async ({
  name,
  gmail,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/verify?token=${verificationToken}&gmail=${gmail}`;

  const message = `<p>Please confirm your email by clicking on the following link : 
  <a href="${verifyEmail}">Verify Email</a> </p>`;

  return sendEmail({
    to: gmail,
    subject: 'Email Confirmation',
    html: `<h4> Hello, ${name}</h4>
    ${message}
    `,
  });
};

module.exports = sendVerificationEmail;
