const express = require('express');
const { signup, login, logout } = require('../controllers/auth.controller');
const { checkDuplicateUsernameOrEmail } = require('../middlewares/verifySignUp.middleware');
const router = express.Router();

router
  .route('/signup')
  .post(checkDuplicateUsernameOrEmail, signup)

  router
  .route('/login')
  .post(login)

  router
  .route('/logout')
  .post(logout)


module.exports = router;