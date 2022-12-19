const {JSONResponse} = require('../helpers/jsonResponse');
const Movie = require('../models/movie.model');


exports.getAllMovies = async(req, res) => {
  try{
    const movies = await Movie.find().populate("categories");

    if(movies.length == 0){
      return JSONResponse.success(res,"No movies found",movies, 404);
    };
    return JSONResponse.success(res,"Successfully retrieved movies", movies , 200);
  }catch(err){

  }
}

exports.getMovie = async(req, res) => {
  try{
    const {id} = req.params;
    const movie = await Movie.findById(id).populate("categories");
    
    if(!movie){
      return JSONResponse.success(res,"movie is not found", movie, 404);
    }

    return JSONResponse.success(res, "Successfully retrieved movie", movie , 200);
  }catch(err){
    return JSONResponse.error(res, err.mesage, err , 500);
  }
}

exports.addMovie = async(req, res) => {
  try{
    const movieToAdd = await Movie.create({
      title: req.body.title,
      description: req.body.description,
      image : req.body.image,
      video: req.body.video,
      releaseYear: req.body.releaseYear,
      categories : req.body.categories
    });

    return JSONResponse.success(res, "Movie successfully created", movieToAdd, 201);

  }catch(err){
    return JSONResponse.error(res , err.message, err , 500);
  }
}

exports.deleteMovie = async(req, res) => {
  try{
    const {id} = req.params;

    const delMovie =  await Movie.findByIdAndRemove(id);

    if(!delMovie){
      return JSONResponse.success(res, "Movie not found, cannot be deleted", delMovie, 404);
    }

    return JSONResponse.success(res,"Success Movie deleted", delMovie , 200);

  }catch(err){
    return JSONResponse.error(res, err.message , err , 500);
  }
}

exports.editMovie = async(req, res) => {
  try{
    const {id} = req.params;
    const movieToEdit = await Movie.findById(id);
    const {
      title,
      description,
      image,
      video,
      releaseYear,
      categories
    } = req.body

    const editDetails = {
      title: title,
      description: description,
      image: image,
      video: video,
      releaseYear: releaseYear,
      categories : categories
    }

    if(!movieToEdit){
      return JSONResponse.success(res,"Cannot retrieve movie to be edited , invalid id", id ,404);
    };

    const movieEditted = await Movie.findByIdAndUpdate(id, editDetails);

    return JSONResponse.success(res,"Movie successfully edited", movieEditted , 200);

  }catch(err){
    return JSONResponse.error(res, err.message, err , 500);
  }
}