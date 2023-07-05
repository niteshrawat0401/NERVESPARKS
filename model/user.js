const { model, Schema, Types } = require("mongoose");


const userSchema = new Schema({
  user_email: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  user_location: {
    type: String,
    required: true,
  },
  user_info: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  vehicle_info: {
    type: Types.ObjectId,
    ref: "soldVehicle"
  },
  //   userType: {
  //     type: String,
  //     required : true
  //   },
  //   user_id varchar [note: 'randomly generated']
  //   user_info json [note: 'store additional fields']
  //   vehicle_info list_of_id
});

const Users = model("user", userSchema);
module.exports = Users;
