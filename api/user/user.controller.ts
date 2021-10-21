const jwt = require("jsonwebtoken");
import User from "../user/user.model"
//import {User} from "./user.model"
const config = require("./../../config/environment/index")
const bcrypt = require("bcrypt");

async function authenticate (email, password){
  let user = await User.findOne({ email });
  if (user) {
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      return user;
    }
    throw new Error("Invalid password");
  } 
  else {
    throw new Error("User does not exist");
  }
};


async function login(req, res){
    const { email, password } = req.body;
    let user = await authenticate(email, password);
    if (user) {
        const token = jwt.sign({ userId: user._id }, config.jwtKey);
        const { _id, name, role} = user;
        res.json({
          token,
          _id,
          name,
          role,
        });
      } 
    else
      res.status(401).json({ error: "Invalid credentials" });
}

async function register(req, res, next){
  try{
    const { email, password, name, role } = req.body;
    console.log(email + " " + password +" " + name + " " + role)
    let user = await User.findOne({email: email})
    console.log("HERE2")
    if (user){
      res.status(422).json("Email is already taken, please use another one")
    }
    else{
      await User.create({
        email: email,
        password: password,
        name: name,
        role: role,
      })
      res.status(200).json("User successfully created")
    }
  }
  catch (e){
    console.error(e)
    next(e)
  }

}

export {login, register};