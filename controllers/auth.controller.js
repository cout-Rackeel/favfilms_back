require("dotenv").config();
const { JSONResponse } = require('../helpers/jsonResponse');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
var salt = 10;

exports.signup = async (req, res) => {
  try{
    const createUser = await User.create({
    first_nm: req.body.first_nm,
    last_nm: req.body.last_nm,
    username : req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
    favourites : req.body.favourites 
  });

  return JSONResponse.success(res, "Successfully created user", createUser, 201);
}catch(err){
  return JSONResponse.error(res, err.stack , err , 500);
}

}

exports.login = async (req, res) => {
  try {
    const currentUser = await User.findOne({username: req.body.username});

  if(!currentUser){
    return JSONResponse.error(res, 'Invalid Credentials, User not found', null , 404);
  };

    const hash = currentUser.password;
    const isPasswordValid = await bcrypt.compare(req.body.password, hash);

  if(!isPasswordValid){
    return JSONResponse.error(res, 'Invalid Credentials, Incorrect Password', null , 400);
  };

  const token = jwt.sign({id:currentUser._id}, JWT_SECRET_KEY, {expiresIn: 3600});
  const loginResp = {user : currentUser , token: token};
  req.session.token = token ?? null;

  return JSONResponse.success(res, `Successfully logged in`, loginResp, 200);
}catch(err){
  console.log(err);
  return JSONResponse.error(res, err.message , err , 500);
}

}

exports.logout = async (req,res) => {
  try{
    req.session = null;
    return JSONResponse.success(res, "Successfully logged out", null , 200);
  }catch(err){
    return JSONResponse.error(res, err.message , err , 500);
  }
}