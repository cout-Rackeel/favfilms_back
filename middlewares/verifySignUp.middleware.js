
const { JSONResponse } = require('../helpers/jsonResponse');
const User = require('../models/user.model');

exports.checkDuplicateUsernameOrEmail = async (req, res , next) => {
  try{
    const username = await User.findOne({username:req.body.username})
    const email = await User.findOne({email:req.body.email});
    const {_id} = req.body;

    if(!_id){
      if(username){
        return JSONResponse.error(res,"Failed! Username is already in use!",null,400); 
      }
      if(email){
        return JSONResponse.error(res,"Failed! Email is already in use!",null,400); ;
      }
    }else{
      if(username && _id != username._id){
       return JSONResponse.error(res,"Failed! Username is already in use!",null,400); ;
      }
      if(email && _id != email._id){
        return JSONResponse.error(res,"Failed! Email is already in use!",null,400); ;
      }
    }
    next();

  }catch(err){
    return JSONResponse.error(res, err.mesage, err , 500);
  }
};