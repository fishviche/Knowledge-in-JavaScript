const userCtr = {};
const mysql = require('mysql2');
const returnData = (err, result) => {
  if (err) throw err;
  return result;
}
userCtr.createNewUser = async (connection, data) => {
  const { name, email, password, confirm_password } = data
	const errors = [];
	password === confirm_password ? '': errors.push({text: 'Passwords do not match'});
	password.length < 4 ? errors.push({text: 'Passwords must be at least 4 characters.'}): '';
  const results = await connection.promise().query('SELECT * FROM users WHERE email = ?', [email])
  results[0].length > 0 ? errors.push({text: 'The email is already in use.'}): '';
  if (errors.length > 0) {
		return errors;
	}
  let insertUser = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  let query = mysql.format(insertUser, [name, email, password]);
  response =  connection.query(query, returnData);
  return response.sql;
}

userCtr.getUsers = async (connection) => {
	const results = await connection.promise().query('SELECT * FROM users')
  return results[0];
}

userCtr.deleteUser = async (connection, user_id) => {
  const results = await connection.promise().query('DELETE FROM users WHERE user_id = ?', [user_id])
	return results[0];
}
userCtr.getOneUser = async (connection, user_id) => {
	const results = await connection.promise().query('SELECT * FROM users WHERE user_id = ?', [user_id])
  return results[0];
}
userCtr.updateUser = async (connection, data, user_id) => {
  const { name, email, password } = data
  const results = await connection.promise().query(`UPDATE users 
  SET name = ?,
  email = ?,
  password = ?
  WHERE user_id = ?`, [ name, email, password, user_id ])
	return results[0];
}

module.exports = userCtr;