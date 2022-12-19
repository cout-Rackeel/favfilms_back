const { JSONResponse } = require('../helpers/jsonResponse');
const Genre = require('../models/genre.model');

exports.getAllGenres = async(req,res) => {
    try{
      const genres = await Genre.find();
      if(genres.length == 0){
       return JSONResponse.success(res,"No genres found", genres, 404);
      }
      return JSONResponse.success(res,null,genres, 200);
    }catch(err){
      console.log(err);
      return JSONResponse.error(res, err.mesage, err , 500);
    }
   
}
exports.getGenre = async (req,res) => {
  try{
    const {id} = req.params;
    const genre = await Genre.findById(id);
    
    if(genre == null){
      return JSONResponse.success(res,"Genre is not found", genre, 404);
    }

    return JSONResponse.success(res, "Successfully retrieved genre", genre , 200);
  }catch(err){
    return JSONResponse.error(res, err.mesage, err , 500);
  }
}
exports.addGenre = async (req,res) => {
  try{
    const genre = {
      genre_nm: req.body.genre_nm,
    };
    const genreAdded = await Genre.create(genre);
    return JSONResponse.success(res, "Genre successfully created" , genreAdded, 200);

    
  }catch(err){
    return JSONResponse.error(res, err.message , err , 500);
  }
}

exports.deleteGenre = async (req,res) => {
  try{
    const {id} = req.params;

    const delGenre =  await Genre.findByIdAndRemove(id);

    if(!delGenre){
      return JSONResponse.success(res, "Genre not found, cannot be deleted", delGenre, 404);
    }

    return JSONResponse.success(res,"Success genre deleted", delGenre , 200);

  }catch(err){
    return JSONResponse.error(res, err.message , err , 500);
  }
}