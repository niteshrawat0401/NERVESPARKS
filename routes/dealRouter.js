const Deal =  require('../model/deal');
const { Router } = require("express");

const dealRouter = Router();

// To add deals to dealership
dealRouter.post("/create", async(req, res)=>{
    let { deal_id, car_id, deal_info } = req.body;
    let dealCars = await Deal.create({
        deal_id,
         car_id,
         deal_info
    },)
    // soldCars.save()
    try {
      if(dealCars){
        return res.status(201).json({ msg: "dealCars succssfully created", dealCars})
      }
    } catch (error) {
      return res.status(500).json({ msg: "Try again latter", error})
    }
  })

  module.exports = dealRouter