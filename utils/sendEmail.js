const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: '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',
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
    from: 'anshulmann012@gmail.com',
    to: 'anshul@mobikasa.com',
    subject: 'Reset Password Link',
    text: message('http://localhost:3000/product'),
  }

  const result = await transporter.sendMail(mailOptions)

  return result
}
sendMail()

module.exports = {
  sendMail,
}

// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey('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')
// const msg = {
//   to: 'anshul@mobikasa.com', // Change to your recipient
//   from: 'shubhamsaini@mobikasa.com', // Change to your verified sender
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
