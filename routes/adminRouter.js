const { Router } = require("express");
const Admin = require("../model/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require('../model/token')
require("dotenv").config();


const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
    const { admin_name, admin_id, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newuser = await new Admin({
        admin_name,
        admin_id,
        password: hashPassword
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


  adminRouter.post("/login", async (req, res) => {
    const { admin_name } = req.body;
    const user = await Admin.findOne({  admin_name: admin_name });
    if (!user) {
        return res.status(400).json({ msg: "User not found" });
    }
    try {
        const matchUser = await bcrypt.compare(password, user.password);
        console.log(matchUser);
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
            admin_name: user.admin_name,
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

  module.exports = adminRouter