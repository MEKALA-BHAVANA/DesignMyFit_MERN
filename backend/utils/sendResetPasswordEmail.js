const sendEmail = require('./sendEmail');

const sendResetPassswordEmail = async ({ name, gmail, token, origin }) => {
  //console.log('hi')
  const resetURL = `${origin}/reset-password?token=${token}&email=${gmail}`;
  const message = `<p>Please reset password by clicking on the following link : 
  <a href="${resetURL}">Reset Password</a></p>`;

  return sendEmail({
    to: gmail,
    subject: 'Reset Password',
    html: `<h4>Hello, ${name}</h4>
   ${message}
   `,
  });
};

module.exports = sendResetPassswordEmail;
