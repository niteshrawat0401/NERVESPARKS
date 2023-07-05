const { model, Schema, Types } = require("mongoose");

const dealershipSchema = new Schema({
dealership_email: {
    type: String,
    // required: true,
  },
  dealership_id: {
    type: String,
    // required: true,
  },
  dealership_name: {
    type: String,
    // required: true,
  },
  dealership_location: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  dealership_info: {
    type: String,
    // required: true,
  },
  cars: {
    type: Types.ObjectId,
    ref: "car",
  },
  deals: {
    type: Types.ObjectId,
    ref: "deal",
  },
  sold_vehicles: {
    type: Types.ObjectId,
    ref: "soldVehicle",
  },
// dealership_email varchar [primary key]
// dealership_id varchar [ note: 'randomly generated']
// dealership_name varchar
// dealership_location varchar
// password password_hash
// dealership_info json [note: 'store additional fields']
// cars list_of_id
// deals list_of_id
// sold_vehicles list_of_id
});

const Dealership = model("dealership", dealershipSchema);
module.exports = Dealership;
