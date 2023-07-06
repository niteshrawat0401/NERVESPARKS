const { model, Schema, Types } = require("mongoose");

const soldVehiclesSchema = new Schema({
    vehicle_id: {
    type: String,
    // required: true,
  },
  car_id: [{
    type: Types.ObjectId,
    ref : 'car'
  }],
  vehicle_info: {
    type: String,
    // required: true,
  },
//   vehicle_id varchar [primary key, note: 'randomly generated']
//   car_id varchar
//   vehicle_info json [note: 'store additional fields']
});

const SoldVehicle = model("soldVehicle", soldVehiclesSchema);
module.exports = SoldVehicle;
