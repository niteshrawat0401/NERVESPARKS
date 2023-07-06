const { model, Schema, Types } = require("mongoose");

const dealSchema = new Schema({
    deal_id: {
    type: String,
    // required: true,
  },
  car_id: {
    type: Types.ObjectId,
    ref: "car",
  },
  deal_info: {
    type: String,
    // required: true,
  }
//   deal_id varchar [primary key, note: 'randomly generated']
//   car_id varchar 
//   deal_info json [note: 'store additional fields']
});

const Deal = model("deal", dealSchema);
module.exports = Deal;
