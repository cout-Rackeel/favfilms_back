const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title : {
    type:String,
    required:[true, 'A movie title is required']
  },
  description : {
    type: String,
    required:[true, 'A movie title is required']  
  },
  image : {
    type : String,
  },
  video : {
    type : String
  },
  releaseYear : {
    type : String
  },
  categories : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Genre',
    sparse:true,
  }]
}, {collection:'movies'});


const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;