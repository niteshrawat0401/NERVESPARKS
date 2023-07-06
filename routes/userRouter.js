const { Router } = require("express");
const Users = require("../model/user");
const Cars = require('../model/cars')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require('../model/token');
const Dealership = require("../model/dealership");
const Deal = require("../model/deal");
require("dotenv").config();

const userRouter = Router();


userRouter.post("/create", async (req, res) => {
    const { user_email, user_id, user_location, user_info, password, vehicle_info } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newuser = await new Users({
        user_email,
        user_id,
        user_location,
        user_info,
        password : hashPassword,
        vehicle_info
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


  userRouter.post("/log", async (req, res) => {
    const { user_email, user_id, user_location, user_info, password, vehicle_info } = req.body;
    const user = await Users.findOne({  user_email: user_email });
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
            user_email: user.user_email,
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

// To view all cars
  userRouter.get("/get", async(req, res)=>{
    let geteCars = await Cars.find({})
    try {
      if(geteCars){
        return res.status(201).json({ msg: "geteAllCars succssfully get", geteCars})
      }
    } catch (error) {
      return res.status(500).json({ msg: "Try again latter", error})
    }
  })

  // To view all cars in a dealership
  userRouter.get("/getAlldealership", async(req, res)=>{
    let getdealership = await Dealership.find({}).populate({path: 'cars deals sold_vehicles'})
    // .populate("cars")
    try {
      if(getdealership){
        return res.status(201).json({ msg: "Alldealership succssfully get", getdealership})
      }
    } catch (error) {
      return res.status(500).json({ msg: "Try again latter", error})
    }
  })

  // To view all vehicles owned by user
  userRouter.get("/ownedVehicle", async(req, res)=>{
    let ownedVehicle = await Users.find({}).populate("vehicle_info")
    try {
      if(ownedVehicle){
        return res.status(201).json({ msg: "getAlldealership succssfully", ownedVehicle})
      }
    } catch (error) {
      return res.status(500).json({ msg: "Try again latter", error})
    }
  })


  // To view all deals on a certain car
  userRouter.get("/allDeals", async(req, res)=>{
    let getAlldeals = await Deal.find({}).populate("car_id")
    try {
      if(getAlldeals){
        return res.status(201).json({ msg: "getAlldeals succssfully", getAlldeals})
      }
    } catch (error) {
      return res.status(500).json({ msg: "Try again latter", error})
    }
  })

  // To allow user to buy a car after a deal is made
  userRouter.get("/buycar", async(req, res)=>{
    let buyDeals = await Users.find({}).populate("vehicle_info")
    try {
      if(buyDeals){
        return res.status(201).json({ msg: "buyDeals succssfully", buyDeals})
      }
    } catch (error) {
      return res.status(500).json({ msg: "Try again latter", error})
    }
  })
  module.exports = userRouter