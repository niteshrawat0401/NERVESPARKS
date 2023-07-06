const Cars =  require('../model/cars');
const { Router } = require("express");

const carsRouter = Router();

carsRouter.post("/create", async(req, res)=>{
    let { user_id, type, name, model, car_info} = req.body;
    let isUniqueName = (await Cars.countDocuments({ name }) > 0 ? true : false)
    if(isUniqueName){
      return res.status(400).json({msg: "Name alredy present", isUniqueName})
    }
  
    let isUniqueModel = (await Cars.countDocuments( {model} ) > 0? true : false);
    if(isUniqueModel){
      return res.status(400).json({msg: "Mobile no alredy present"})
    }
    let createCars = await Cars.create({
        user_id, type, name, model, car_info
    },)
  
    try {
      if(createCars){
        return res.status(201).json({ msg: "Cars succssfully created", createCars})
      }
    } catch (error) {
      return res.status(500).json({ msg: "Try again latter", error})
    }
  })

// Get all car
  carsRouter.get("/get", async(req, res)=>{
    let { user_id, type, name, model, car_info} = req.body;
    let geteCars = await Cars.find({})
    try {
      if(geteCars){
        return res.status(201).json({ msg: "Cars succssfully created", geteCars})
      }
    } catch (error) {
      return res.status(500).json({ msg: "Try again latter", error})
    }
  })

  module.exports = carsRouter
