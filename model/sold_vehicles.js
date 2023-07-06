const { model, Schema, default: mongoose } = require("mongoose");

const soldVehiclesSchema = new Schema({
    vehicle_id: {
    type: String,
    // required: true,
  },
  car_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'car'
  },
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
