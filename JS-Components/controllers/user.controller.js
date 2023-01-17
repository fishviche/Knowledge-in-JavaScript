const userCtr = {};
const User = require('../models/User')

userCtr.createNewUser = async (req, res) => {
	// const { name, email, password } = req.body;
	const data = {
		name: 'Erick',
		email: 'fishviche2@yopmail.com',
		password: 'abc12',
		confirm_password: 'abc12'
	}
	const { name, email, password, confirm_password } = data
	const errors = [];
	password === confirm_password ? '': errors.push({text: 'Passwords do not match'});
	password.length < 4 ? errors.push({text: 'Passwords must be at least 4 characters.'}): '';
	const existUser = await User.findOne({email: email});
	existUser ? errors.push({text: 'The email is already in use.'}): '';
	if (errors.length > 0) {
		return errors;
	}
	const newUser = new User({ name, email, password });
	console.log(newUser);
  newUser.password = await newUser.encryptPassword(password);
	await newUser.save();
	return 'Success';
}
userCtr.getUsers = async (req, res) => {
	return await User.find();
}
userCtr.deleteUser = async (req, res) => {
	// id = req.body.id
	id = '63c081aea8f03d328e3df93f'
	return await User.findByIdAndDelete(id);
}
userCtr.getOneUser = async (req, res) => {
	id = '63c08651d859339e59b3e2b3'
	return await User.findById(id)
}
userCtr.updateUser = async (req, res) => {
	id = '63c08651d859339e59b3e2b3'
	const data = {
		name: 'Erick 2',
		email: 'fishviche@yopmail.com',
		password: '123abc'
	}
	return await User.findByIdAndUpdate(id, data)
}

module.exports = userCtr;