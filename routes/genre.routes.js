const express = require('express');
const router = express.Router();
const {getAllGenres, addGenre, deleteGenre, getGenre} = require('../controllers/genre.controller');

router
  .route('/')
  .get(getAllGenres)
  .post(addGenre)

router
  .route('/:id')
  .get(getGenre)
  .delete(deleteGenre)

module.exports = router;