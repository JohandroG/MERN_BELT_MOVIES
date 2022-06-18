const express = require( 'express' );
const MovieRouter = express.Router();
const {MovieController} = require( './../controllers/moviesController' );

//!------------------------------------------------------------------------------------------------------

MovieRouter.route('/create').post(MovieController.createMovies);
MovieRouter.route('/addreview').post(MovieController.addReview);

MovieRouter.route('/getall').get(MovieController.getAllMovies);
MovieRouter.route('/get/movie/:_id').get(MovieController.getMovie);
// ProyectsRouter.route('/find/completed').get(ProyectController.findCompletedPro);
// ProyectsRouter.route('/find/progress').get(ProyectController.findProgressPro);


MovieRouter.route('/delete/:_id').delete(MovieController.deleteMovie);
MovieRouter.route('/delete/rev/:_id').delete(MovieController.deleteReview);

// ProyectsRouter.route('/start/:_id').put(ProyectController.startProyect);
// ProyectsRouter.route('/complete/:_id').put(ProyectController.completeProyect);

//!------------------------------------------------------------------------------------------------------

module.exports = {MovieRouter}