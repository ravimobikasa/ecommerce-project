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
const sendResetPasswordMail = async (to, link) => {
  const message = `Dear User, 
       Link to reset password is : <a href="${link}">reset password</a>.
       Please do not reply to this email.
       <br><br><br>
       <b>Regards Ecommerce-Project Team.</b>`

  const mailOptions = {
    from: process.env.FROM_MAIL,
    to: to,
    subject: 'Reset Password Link',
    html: message,
  }
  return await transporter.sendMail(mailOptions)
}

module.exports = {
  sendResetPasswordMail,
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
