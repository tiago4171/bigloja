const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.User = require('./user.model');
db.Role = require('./role.model');
db.UserData = require('./userData.model');

db.ROLES = ['user', 'admin'];

module.exports = db;

