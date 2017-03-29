/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * `UserController.login()`
   */
  login: function (req, res) {
    if (req.param('username') == undefined || req.param('password') == undefined )  {
        return res.json({
            status : false,
            message: 'Username and password are required !!',
        });
    }
    // See `api/responses/login.js`
    return res.login({
      username: req.param('username'),
      password: req.param('password')
    });
  },


  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {

    // "Forget" the user from the session.
    // Subsequent requests from this user agent will NOT have `req.session.me`.
    req.session.me = null;

    return res.json({
                status : true,
		message: 'Logged out successfully!',
	  });
  },


  /**
   * `UserController.signup()`
   */
  signup: function (req, res) {
    if (req.body.name == undefined || req.body.username == undefined)  {
        return res.json({
              status : false,
              message: 'Username and name are required'
        });
    }
    User.findOne({
        username: req.body.username
    }).exec(function (err, foundUser){
        if (err || foundUser){
            return res.json({
                status : false,
                message: 'User already exist'
            });
        }
        req.body.password = sails.config.defaultPassword;
        // Attempt to signup a user using the provided parameters
    
        User.signup(req.body, function (err, user) {
            // res.negotiate() will determine if this is a validation error
            // or some kind of unexpected server error, then call `res.badRequest()`
            // or `res.serverError()` accordingly.
            if (err) {
                return res.json({
                    status : false,
                    message: err
                  });
            }


            // Go ahead and log this user in as well.
            // We do this by "remembering" the user in the session.
            // Subsequent requests from this user agent will have `req.session.me` set.
            req.session.me = user.id;

            return res.json({
                  status : true,
                  message: 'Sign up successfully',
                });
        });
    });
    
  },
  changePass: function (req, res) {

    // Attempt to signup a user using the provided parameters
    User.changePass({
      id: req.session.me,
      old_pass: req.param('old_password'),
      password: req.param('new_password')
    }, function (err, msg) {
      // res.negotiate() will determine if this is a validation error
      // or some kind of unexpected server error, then call `res.badRequest()`
      // or `res.serverError()` accordingly.
      if (err) 
        return res.json({
              status : false,
              message: msg
        });

      return res.json({
            status : true,
            message: 'Password has been successfully updated'
	  });
    });
  },
  changeRole: function (req, res) {

    var query_data = {
            id : req.param('id')
        };
    var to_update_data = {
        role : req.param('role')
    };
    User.update(query_data,to_update_data).exec(function (err, record){
        if (err){
            return res.json({
              status : false,
              message: 'Database connection error'
            });
        }
        else 
        {
            return res.json({
                status : true,
                message: record[0].name + ' Role has been completely updated'
              });
        }
    });
  },
  role: function (req, res) {

    var query_data = {
            id : req.session.me
        };

    User.findOne(query_data).exec(function (err, record){
        if (err){
            return res.json({
              status : false,
              message: 'Database connection error'
            });
        }
        else 
        {
            return res.json({
                status : true,
                role: record.role
              });
        }
    });
  },
  resetPassword: function (req, res) {

    var data = {
        id : req.param('id'),
        password : sails.config.defaultPassword
    };
    User.reset(data,function (err, record){
        if (err){
            return res.json({
              status : false,
              message: 'Unable to reset password'
            });
        }
        else 
        {
            return res.json({
                status : true,
                message: record[0].name + ' Role has been completely updated'
              });
        }
    });
  },
  find: function (req, res) {
    var query_data = {
        select: ['id','name','username','role','avatarFd']
    }
    User.find(query_data).exec(function (err, record){
        if (err){
            return res.json({
              status : false,
              message: 'Database connection error'
            });
        }
        else 
        {
            return res.json({
                status : true,
                users_list: record
              });
        }
    });
  },
  destroy: function (req, res) {
    var query_data = {
        id :  req.param('id')
    };
    User.destroy(query_data).exec(function (err, record){
        if (err){
            return res.json({
              status : false,
              message: 'Database connection error'
            });
        }
        else 
        {
            return res.json({
                status : true,
                message: 'User has been completely deleted'
              });
        }
    });
  },
  uploadAvatar: function (req, res) {

    req.file('avatar').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000,
      dirname: require('path').resolve(sails.config.appPath, 'assets/users')
    },function whenDone(err, uploadedFiles) {
      if (err || uploadedFiles.length === 0) {
        return res.json({
            status : false,
            message: 'Avatar upload failed',
	  });
      }

      var fileName = uploadedFiles[0].fd.replace(/.*[\/\\]/, ''); // clean up file name  
      // Save the "fd" and the url where the avatar for a user can be accessed
      User.update(req.session.me, {
        // Grab the first file and use it's `fd` (file descriptor)
        avatarFd: fileName
      })
      .exec(function (err){
        if (err) return res.json({
            status : false,
            message: 'Update user failed',
	  });
          
        return res.json({
            status : true,
            message: 'Avatar upload Successful'
	  });
      });
    });
  }
};