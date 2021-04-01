const mongoose = require("mongoose");

// usado como relacionamento de um para muitos
const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Role;