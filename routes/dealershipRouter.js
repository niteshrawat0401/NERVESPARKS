const { Router } = require("express");
const Dealership = require("../model/dealership");
const Cars = require("../model/cars");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require('../model/token');
const SoldVehicle = require("../model/sold_vehicles");
require("dotenv").config();


const dealerRouter = Router();

dealerRouter.post("/signup", async (req, res) => {
    const { dealership_email, dealership_id, dealership_name, dealership_location, password, dealership_info, cars, deals, sold_vehicles } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newuser = await new Dealership({
        dealership_email,
        dealership_id,
        dealership_name,
        dealership_location,
        password : hashPassword,
        dealership_info,
        cars,
        deals,
        sold_vehicles
    });
    newuser.save()
    try {
      if (newuser) {
        return res.status(201).json({ msg: "User created", newuser });
      }
    } catch (error) {
      return res.status(500).json({ msg: "Server error", error });
    }
  });


  dealerRouter.post("/login", async (req, res) => {
    const { dealership_email } = req.body;
    const user = await Dealership.findOne({  dealership_email: dealership_email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    try {
      const matchUser = await bcrypt.compare(password, user.password);
      if (matchUser) {
        const accessToken = jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
          expiresIn: "20m",
        });
        const refreshToken = jwt.sign(
          user.toJSON(),
          process.env.REFRESH_SECRET_KEY
        );
  
        const newToken = new Token({ token: refreshToken });
        await newToken.save();
  
        return res.status(200).json({
            msg: "Login successfully",
            accessToken: accessToken,
            refreshToken: refreshToken,
            dealership_email: user.dealership_email,
            userID : user._id
          });
      }
      else{
          return res.status(400).json({msg: "password does not match"})
      }
    } catch (error) {
      return res.status(500).json({msg: "Server error"})
    }
  });

  dealerRouter.get("/get", async(req, res)=>{
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

  dealerRouter.get("/getAllSoldCar", async(req, res)=>{
    let { vehicle_id, car_id, vehicle_info } = req.body;
    let getSoldCars = await SoldVehicle.find({}).populate("car_id")
    try {
      if(getSoldCars){
        return res.status(201).json({ msg: "getSoldCars succssfully", getSoldCars})
      }
    } catch (error) {
      return res.status(500).json({ msg: "Try again latter", error})
    }
  })


  module.exports = dealerRouter