const { JSONResponse } = require('../helpers/jsonResponse');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
var salt = 10;


exports.getAllUsers = async(req,res) => {
  try{
    const users = await User.find().populate("favourites");
    if(users.length == 0){
     return JSONResponse.success(res,"No users found", usera, 404);
    }
    return JSONResponse.success(res,null,users, 200);
  }catch(err){
    console.log(err);
    return JSONResponse.error(res, err.mesage, err , 500);
  }
 
}
exports.getUser = async (req,res) => {
try{
  const {id} = req.params;
  const user = await User.findById(id).populate("favourites");
  
  if(user == null){
    return JSONResponse.success(res,"user is not found", user, 404);
  }

  return JSONResponse.success(res, "Successfully retrieved user", user , 200);
}catch(err){
  return JSONResponse.error(res, err.mesage, err , 500);
}
}
exports.deleteUser = async (req,res) => {
try{
  const {id} = req.params;

  const delUser =  await User.findByIdAndRemove(id);

  if(!delUser){
    return JSONResponse.success(res, "User not found, cannot be deleted", delUser, 404);
  }

  return JSONResponse.success(res,"Success User deleted", delUser , 200);

}catch(err){
  return JSONResponse.error(res, err.message , err , 500);
}
}
exports.changePassword = async (req,res) => {
 try {
  const { id } = req.params;
 const currentUser = await User.findById(id);
 const oldPasswordHashed = currentUser.password;
 const newPassword = req.body.password;
 const isSamePassword = await bcrypt.compare(newPassword, oldPasswordHashed);

 if(isSamePassword){
  return JSONResponse.error(res, "Bad request , Passwords cannot be the same", null , 400);
 }

 const changePassword = {
  password : await bcrypt.hash(newPassword,salt)
 };

 const newUserPassword = await User.findByIdAndUpdate(id , changePassword);

 return JSONResponse.success(res, "Successfully changed user password" , changePassword , 200);

}catch(err){
  return JSONResponse.error(res, err.message , err , 500);
}

}
exports.addFavourites = async (req,res) => {
  try{
    const {id} = req.params;
  const currentUser = await User.findById(id);

  if(!currentUser){
    return JSONResponse.success(res,"User is not found", currentUser, 404);
  }

  const movieIsPresent = currentUser.favourites.find((movieId) => {
    return movieId == req.body.favourite;
  })

  if(movieIsPresent){
    return JSONResponse.error(res,"Movie is already added to favourites", currentUser, 400);
  }

  await currentUser.favourites.push(req.body.favourite);
  await currentUser.save();
  return JSONResponse.success(res,"Successfully added movie to favourites", movieIsPresent,200);
}catch(err){
  return JSONResponse.error(res, err.message , err , 500);
}

}
exports.removeFavourites = async (req,res) => {
  try{
    const {id} = req.params;
    const currentUser = await User.findById(id);

  if(!currentUser){
    return JSONResponse.success(res,"User is not found", currentUser, 404);
  }

  const movieIndex = currentUser.favourites.findIndex((movieId) => {
    return movieId == req.body.favourite;
  });

  if(movieIndex == -1){
    return JSONResponse.error(res, "Nothing to be removed" , movieIndex , 400);
  }

  let selectedMovie = currentUser.favourites[movieIndex];
  let lastMovie = currentUser.favourites[currentUser.favourites.length - 1];
  
  currentUser.favourites[currentUser.favourites.length - 1] = selectedMovie;
  currentUser.favourites[movieIndex] = lastMovie;
  await currentUser.favourites.pop();
  await currentUser.save();
  return JSONResponse.success(res,"Successfully removed movie from favourites", movieIndex,200);
}catch(err){
  return JSONResponse.error(res, err.message , err , 500);
}

}