const twilio = require('twilio');
require('dotenv').config();
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

const client = new twilio(accountSid, authToken);


const createSMS = async (params) => {
    const {message, to_cell, from_cell} = params
    const { sid } = await client.messages.create({
        body: message,
        to: to_cell,
        from: from_cell
    });
    console.log(sid);
}

