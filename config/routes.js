/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */
var locals = require('./local');
module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage',
    locals : {
        createType : locals.createType,
        userRole : locals.userRole
    },

  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  // User Endpoints
  'post /login': 'UserController.login',
  'post /signup': 'UserController.signup',
  'post /avatar': 'UserController.uploadAvatar',
  'post /changePass': 'UserController.changePass',
  'post /user/resetPass': 'UserController.resetPassword',
  'post /user/role': 'UserController.changeRole',
  'get /user/role': 'UserController.role',
  'delete /user' : 'UserController.destroy',
  '/logout': 'UserController.logout',
  
  // xls Endpoints
  'post /xls': 'XlsController.parse',
  
  //variable endpoint
  'post /variables': 'VariablesController.create',
  'get /variables': 'VariablesController.find',
  'get /variables/findAll': 'VariablesController.findAll',
  'get /variables/unApprove': 'VariablesController.findUnapprove',
  'post /variables/approve': 'VariablesController.approve',
  'post /variables/reject': 'VariablesController.reject',
  'delete /variables': 'VariablesController.destroy'
};
