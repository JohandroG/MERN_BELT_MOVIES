const express = require( 'express' );
const UserRouter = express.Router();
const {UsersController} = require( './../controllers/usersController' );

//!------------------------------------------------------------------------------------------------------

UserRouter.route('/register').post(UsersController.register);

UserRouter.route('/login').post(UsersController.login);
//!------------------------------------------------------------------------------------------------------

module.exports = {UserRouter}