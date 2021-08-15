const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENGRID_KEY } = process.env;

sgMail.setApiKey(SENGRID_KEY);

const sendMail = async ({ to, subject, text, html }) => {
  const mail = {
    to,
    from: "tania999kulibaba@gmail.com",
    subject,
    text,
    html
  };
  try {
    const answer = await sgMail.send(mail);
    return answer;
  } catch (error) {
    console.log(error)
    throw error;
  };
};

module.exports = sendMail;
