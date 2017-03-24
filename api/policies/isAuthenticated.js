/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // If `req.session.me` exists, that means the user is logged in.
  if (req.session.me) return next();


  // Otherwise if this is an HTML-wanting browser, do a redirect.
    return res.json({
                status : false,
		message: 'Login is required',
	  });
};


