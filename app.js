require("dotenv").config();
const port = process.env.PORT || 8080;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const genreRouter = require('./routes/genre.routes');
const movieRouter = require('./routes/movie.routes');
const userRouter = require('./routes/user.routes');
const authRouter = require('./routes/auth.routes');
const cookieSession = require('cookie-session');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
  cookieSession({
    name:"user-session",
    secret:process.env.COOKIE_SECRET,
    httpOnly:true,
    code:'ball'
  })
);


// MIDDLEWARES
app.use((req, res, next) =>{
  switch (req.method){
    case 'DELETE':
        console.log(`\x1b[43m\x1b[1m[ANGULAR-APP3.1]\x1b[0m - \x1b[31m${req.method}\x1b[0m - ${req.path}`);
      break;
    case 'PUT':
        console.log(`\x1b[44m\x1b[4m[ANGULAR-APP3.1]\x1b[0m - \x1b[32m${req.method}\x1b[0m - ${req.path}`);
      break;
    case 'PATCH':
      console.log(`\x1b[43m\x1b[1m[ANGULAR-APP3.1]\x1b[0m - \x1b[34m${req.method}\x1b[0m - ${req.path}`);
      break;
    case 'POST':
      console.log(`\x1b[43m\x1b[1m[ANGULAR-APP3.1]\x1b[0m - \x1b[33m${req.method}\x1b[0m - ${req.path}`);
      break;
    case 'GET':
      console.log(`\x1b[43m\x1b[1m[ANGULAR-APP3.1]\x1b[0m - \x1b[35m${req.method}\x1b[0m - ${req.path}`);
      break;
    default:
      console.log(`\x1b[43m\x1b[1m[ANGULAR-APP3.1]\x1b[0m - \x1b[35m${req.method}\x1b[0m - ${req.path}`);
  }
  next();
});

// ROUTE MIDDLEWARES
app.get('/api/v1', (req,res) => {
  res.send(" Welcome to the FavFilms api endpoints - genres , movies , users , auth");
});
app.use('/api/v1/genres', genreRouter);
app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);


 const DB = process.env.ATLAS_DB_URL

 mongoose.connect(DB).then(conn => {
  console.log(`Successfully connected to MongoDB ... ${DB}`);
})
.catch( err => {
  console.error("Connection error", err);
  process.exit();
});


app.listen(port, () => {console.log(`Listening to port ${port} ... ${process.env.JWT_SECRET_KEY}`)});
module.exports = app;
