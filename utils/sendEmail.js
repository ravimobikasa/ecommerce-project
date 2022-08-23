const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,

  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

const message = (link) => {
  return (
    `Dear User, \n\n` +
    'Link to change your password is : \n\n' +
    `${link}\n\n` +
    'This is a auto-generated email. Please do not reply to this email.\n\n' +
    'Regards\n' +
    'Anshul Mann\n\n'
  )
}
const sendMail = async (to, link) => {
  const mailOptions = {
    from: `"Anshul "<anshul@mobikasa.com>`,
    to: to,
    subject: 'Reset Password Link',
    text: message(link),
  }

  const result = await transporter.sendMail(mailOptions)
  return result
}

module.exports = {
  sendMail,
}
