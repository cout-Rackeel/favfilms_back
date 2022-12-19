const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  genre_nm:{
    type:String,
    required : [true , 'A genre name is required'],
    unique : [true , 'This genre name already exists']
  }
}, {collection: 'genres'});


const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;