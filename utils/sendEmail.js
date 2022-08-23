const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
)

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
    from: process.env.FROM_MAIL,
    to: to,
    subject: 'Reset Password Link',
    text: message(link),
  }

  const result = await transporter.sendMail(mailOptions)

  return result
}
sendMail()

module.exports = {
  sendMail,
}

// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey('')
// const msg = {
//   to: '', // Change to your recipient
//   from: '=', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })
