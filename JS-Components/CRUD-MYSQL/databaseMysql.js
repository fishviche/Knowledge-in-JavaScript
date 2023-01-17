const mysql = require('mysql2');
require('dotenv').config();
const { createNewUser, getUsers, deleteUser, getOneUser, updateUser } = require('./controllers/user.controller')
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT
});
connection.connect( (err) => {
  if (err) throw err;
  console.log('Connected to database');
});

async function main(){
  const data = {
		name: 'name',
		email: 'email@yopmail.com',
		password: '11abc1',
		confirm_password: '11abc1'
	}
  const response = await createNewUser(connection, data);
  console.log(response);
  const response2 = await getOneUser(connection, 2);
  console.log(response2);
  const response3 = await updateUser(connection, data, 2);
  console.log(response3);
  const response4 = await getOneUser(connection, 2);
  console.log(response4);
  connection.end();
}
main()