const { model, Schema } = require("mongoose");

const adminSchema = new Schema({
  admin_email: {
    type: String,
    // required: true,
  },
  admin_id: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
});

const Admin = model("admin", adminSchema);
module.exports = Admin;