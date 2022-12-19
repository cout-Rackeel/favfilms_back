const express = require('express');
const router = express.Router();
const {getAllUsers, deleteUser, getUser, editUser, addFavourites, removeFavourites} = require('../controllers/user.controller');
const { changePassword } = require('../controllers/user.controller');

router
  .route('/')
  .get(getAllUsers)

router
  .route('/:id')
  .get(getUser)
  .delete(deleteUser)

router
  .route('/:id/password')
  .patch(changePassword)

router
  .route('/:id/favourites/add')
  .post(addFavourites)

router
  .route('/:id/favourites/remove')
  .post(removeFavourites)


module.exports = router;