const { Router } = require("express");
const Users = require("../model/user");
const Cars = require('../model/cars')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require('../model/token');
const Dealership = require("../model/dealership");
require("dotenv").config();

const userRouter = Router();


userRouter.post("/signup", async (req, res) => {
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


  userRouter.post("/login", async (req, res) => {
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

// Get all car
  userRouter.get("/get", async(req, res)=>{
    let geteCars = await Cars.find({})
    try {
      if(geteCars){
        return res.status(201).json({ msg: "Cars succssfully created", geteCars})
      }
    } catch (error) {
      return res.status(500).json({ msg: "Try again latter", error})
    }
  })

  // Gell All dealership
  userRouter.get("/getAlldealership", async(req, res)=>{
    let geteCars = await Dealership.find({})
    try {
      if(geteCars){
        return res.status(201).json({ msg: "Cars succssfully created", geteCars})
      }
    } catch (error) {
      return res.status(500).json({ msg: "Try again latter", error})
    }
  })

  module.exports = userRouter