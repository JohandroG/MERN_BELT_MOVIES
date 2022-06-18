//* REQUIRES
const mongoose = require('mongoose');
const {ReviewSchema,ReviewsModel} = require("./reviewsModel")

//*----------------CONSTRUCTOR-------------------------------------------------------------------------------------
const MovieSchema = new mongoose.Schema({

    title :{
        type : String,
        required : true
    },

    creator : {
        type : String,
        required : true
    },

    reviews: [ReviewSchema]
});
//*----------------CONSTRUCTOR END----------------------------------------------------------------------------------

//*CONNECT COLLECTION
const Movies = mongoose.model( 'movies', MovieSchema );


//*----------------QUERYS------------------------------------------------------------------------------------------

//?----------------(QUERYS FOR MOVIES)----------------------------
const MoviesModel = {

    createMovie : function(newMovie,newReview) {
        return Movies.create(newMovie)
        .then(result=>{
            let nwreview = {
                review : newReview.review,
                rating : newReview.rating,
                creator : result.creator,
                movie: result._id
            }
            ReviewsModel.addReview(nwreview)
            .then(data=>{
                return Movies.findByIdAndUpdate({_id: result._id}, {$push: {reviews: data}});
            })
        })
    },
    addReview : function( _id, newReview){
        return Movies.findOne({ _id })
        .then(result=>{
            let nwreview = {
                review : newReview.review,
                rating : newReview.rating,
                creator : newReview.creator,
                movie: result._id
            }
            ReviewsModel.addReview(nwreview)
            .then(data=>{
                return Movies.findByIdAndUpdate({_id: result._id}, {$push: {reviews: data}});
            })
        })
    },
    getMovieByID : function( _id ){
        return Movies.findOne({ _id });
    },
    getMovieByTitle : function( title ){
        return Movies.findOne({ title });
    },
    updateMovie: function(_id, movieupdated){
        return Movies.findOneAndUpdate({_id}, {$set : movieupdated}, {new:true})
    },
    deleteMovieByID : function( _id ){
        return Movies.findOneAndDelete({ _id  });
    },
    findallMovies: function () {
        return Movies.find()
    },
    deleteSomeReview: function (movie_id,rev_id) {
        return Movies.updateMany({movie_id},{ $pull: { reviews: {_id: rev_id} } })
    },

    //TODO INSERT MORE QUERYS

}

//*----------------QUERYS END--------------------------------------------------------------------------------------

//* EXPORT MODEL (QUERY OBJECTS)
module.exports = {MoviesModel};