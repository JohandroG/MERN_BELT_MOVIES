//* REQUIRES
const mongoose = require('mongoose');


//*----------------CONSTRUCTOR-------------------------------------------------------------------------------------
const ReviewSchema = new mongoose.Schema({

    review :{
        type : String,
        required : true
    },

    rating : {
        type : Number,
        required : true
    },

    creator : {
        type : String,
        required : true
    },

    movie : {
        type : String,
        required : true
    },

});
//*----------------CONSTRUCTOR END----------------------------------------------------------------------------------

//*CONNECT COLLECTION
const Reviews = mongoose.model( 'reviews', ReviewSchema );


//*----------------QUERYS------------------------------------------------------------------------------------------

//?----------------(QUERYS FOR MOVIES)----------------------------
const ReviewsModel = {

    addReview : function(newREV) {
        return Reviews.create(newREV) 
    },
    deleteReviews: function (_id) {
        return Reviews.deleteMany({movie: _id})
    },
    deleteReviewByID : function( _id ){
        return Reviews.findOneAndDelete({ _id  });
    },


    //TODO INSERT MORE QUERYS

}

//*----------------QUERYS END--------------------------------------------------------------------------------------

//* EXPORT MODEL (QUERY OBJECTS)
module.exports = {ReviewsModel,ReviewSchema};