const {MoviesModel} = require( '../models/moviesModel' );
const {ReviewsModel} = require( './../models/reviewsModel' );



const MovieController = {


    createMovies : function (req,res) {

        const {title,creator,review,rating} = req.body

        let errors = {}
        let isValid = true

        if(!title || !creator || !review || !rating){
            isValid = false
            errors.empty = "📄 You leaved an empty space"
        }
        if(review.length < 10){
            isValid = false
            errors.rev = "📮 Review must be at least 10 caracters long"
        }
        
        if(isValid){

            let newMovie = {
                title,creator
            }
            let newRev = {
                review,
                rating: Number(rating),
            }

            MoviesModel.createMovie(newMovie,newRev)
            .then(data=>{
                res.status(200).json(data)
            })
            .catch(err=>{
                console.log(err);
                res.status(404).end()
            })
        }
        else{
            res.status(400).json(errors)
        }
    },

    addReview : function (req,res) {
        const {creator,review,rating,_id} = req.body

        let errors = {}
        let isValid = true

        if(!_id || !creator || !review || !rating){
            isValid = false
            errors.empty = "📄 You leaved an empty space"
        }
        if(review.length < 10){
            isValid = false
            errors.rev = "📮 Review must be at least 10 caracters long"
        }

        if(isValid){

            let newRev = {
                review,
                rating: Number(rating),
                creator
            }

            MoviesModel.addReview(_id,newRev)
            .then(data=>{
                res.status(200).json(data)
            })
            .catch(err=>{
                console.log(err);
                res.status(404).end()
            })
        }
        else{
            res.status(400).json(errors)
        }
    },

    deleteMovie : function (req,res) {
        const _id = req.params._id

        MoviesModel.deleteMovieByID(_id)
        .then(data=>{
            ReviewsModel.deleteReviews(_id)
            .then(data2=>{
                res.status(204).end()
            })
        })
        .catch(err=>{
            errormsj = {
                msj: "There was a problem deleting this"
            }
            res.json(errormsj)
        })
    },

    deleteReview : function (req,res) {
        const _id = req.params._id

        ReviewsModel.deleteReviewByID(_id)
        .then(data=>{
            MoviesModel.deleteSomeReview(data.movie,data.id)
            .then(data=>{
                res.status(204).end()
            })
        })
        .catch(err=>{
            errormsj = {
                msj: "There was a problem deleting this"
            }
            res.json(errormsj)
        })
    },

    getAllMovies: function (req,res) {
        MoviesModel.findallMovies()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            console.log(err);
            res.status(404).end()
        })
    },

    getMovie : function (req,res) {
        
        const _id = req.params._id

        MoviesModel.getMovieByID(_id)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            console.log(err);
            res.status(404).end()
        })
    }


}

module.exports = {MovieController}