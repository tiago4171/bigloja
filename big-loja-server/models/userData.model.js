const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {type: String},
  description: {type: String},
  screenshots: {type: Array}
});


schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    return ret;
  },
});

const UserData = mongoose.model('UserData', schema);

module.exports = UserData;
