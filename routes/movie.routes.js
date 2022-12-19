const express = require('express');
const router = express.Router();
const {getAllMovies, addMovie, deleteMovie, getMovie, editMovie} = require('../controllers/movie.controller');

router
  .route('/')
  .get(getAllMovies)
  .post(addMovie)

router
  .route('/:id')
  .get(getMovie)
  .patch(editMovie)
  .delete(deleteMovie)

module.exports = router;