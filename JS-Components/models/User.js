const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true}
}, {
  timestamps: true
});
// Encrypt Password
UserSchema.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
// Check Password
UserSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}
module.exports = model('User', UserSchema);
