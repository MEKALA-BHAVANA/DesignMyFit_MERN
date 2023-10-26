const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');

const sendEmail = async ({ to, subject, html }) =>
 {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: 'parthu1279@gmail.com',
    to:to,
    subject:  subject,
    html:html,
    
  });
};
// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log('Error occurred:', error.message);
//   } else {
//     console.log('Email sent successfully!');
//   }
// });
  // try {
  //    sendEmail()
  // } catch (error) {
  //    console.log(error);
  // }
module.exports = sendEmail;
