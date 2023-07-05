const { model, Schema, Types } = require("mongoose");

const carSchema = new Schema({
    user_id: {
    type: String,
    // required: true,
  },
  type: {
    type: String,
    // required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  model: {
    type: String,
    // required: true,
  },
  car_info: {
      type: String,
    //   required : true
    },
    // car_id varchar [primary key, note: 'randomly generated']
    // type varchar
    // name varchar
    // model varchar
    // car_info json [note: 'store additional fields']
});

const Cars = model("car", carSchema);
module.exports = Cars;
