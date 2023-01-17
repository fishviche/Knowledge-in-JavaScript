// Settings
const nodemailer = require('nodemailer');
require('dotenv').config();
const user = process.env.USER_MAILTRAP;
const pass = process.env.PASSWORD_MAILTRAP;

const createTrans = () => {
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: { user,pass}
  });
  return transport;

}

const sendMail = async (data) => {
  const transporter = createTrans();
  const { from, to, subject, html } = data
  const res = { message: 'Incomplete data', error: true}
  if ( from && to && subject && html ){
    const { messageId } = await transporter.sendMail({from, to, subject, html});
    res.message = 'Message send succesfully'
    res.error = false
    res.messageId = messageId
  } 
  return res
}

async function main() {
  const response = await sendMail({
    from: 'fromuser@yopmail.com',
    to: 'touser@yopmail.com',
    subject: 'Testing',
    html: '<h1> Hola a todos </h1>'
  })
  console.log(response);
}

main()