const mongoose = require('mongoose');
require('dotenv').config();
const MONGODB_URI = process.env.DB_MONGO_URI;
const { createNewUser, getUsers, deleteUser, getOneUser, updateUser } = require('./controllers/user.controller');
mongoose.connect(MONGODB_URI, {

})
  .then(() => console.log('Connected!'))
  .catch(err => console.log(err));



async function asyncCall() {
    console.log('calling');
    // const getUsers1 = await getUsers();
    // console.log(getUsers1);
    // const user_deleted = await deleteUser();
    // console.log('user_deleted is: ');
    // console.log(user_deleted)
    // const getUsers2 = await getUsers();
    // console.log(getUsers2);
    // const getOneUser1 = await getOneUser();
    // console.log(getOneUser1)
    // const updateUser1 = await updateUser();
    // const getOneUser2 = await getOneUser();
    // console.log(getOneUser2)
    const response = await createNewUser();
    console.log(response);
}
asyncCall()