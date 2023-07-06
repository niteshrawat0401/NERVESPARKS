const SoldVehicle =  require('../model/sold_vehicles');
const { Router } = require("express");

const soldVehicleRouter = Router();

soldVehicleRouter.post("/create", async(req, res)=>{
    let { vehicle_id, car_id, vehicle_info } = req.body;
    let soldCars = await SoldVehicle.create({
        vehicle_id,
         car_id,
         vehicle_info
    },)
    // soldCars.save()
    try {
      if(soldCars){
        return res.status(201).json({ msg: "SoldVehicle succssfully created", soldCars})
      }
    } catch (error) {
      return res.status(500).json({ msg: "Try again latter", error})
    }
  })

  module.exports = soldVehicleRouter
