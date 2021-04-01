const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {type: String},
  email: {type: String, required: true, unique: true},
  // password hash
  hash: {type: String, required: true },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    }
  ]
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.hash;
  },
});

const User = mongoose.model(
  'User',
  schema
);

module.exports = User;