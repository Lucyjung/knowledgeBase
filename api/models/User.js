/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');
module.exports = {

  attributes: {
    username: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    role : {
      type: 'string',
      defaultsTo: sails.config.userRole.user
    },
    avatarFd : {
      type: 'string',
      defaultsTo: sails.config.defaultAvatar
    }
  },


  /**
   * Create a new user using the provided inputs,
   * but encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • name     {String}
   *                     • email    {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  signup: function (inputs, cb) {
    bcrypt.hash(inputs.password, sails.config.saltSetting, function(err, hash) {
        inputs.password = hash;
        User.create(inputs).exec(cb);
    });
    
  },
  changePass: function (inputs, cb) {
    User.findOne({
        id: inputs.id
        })
        .exec(function (err, user){
            if (err) return cb(err);
            var isMatch = bcrypt.compareSync(inputs.old_pass, user.password);
            if(isMatch)
            {
                bcrypt.hash(inputs.password, sails.config.saltSetting, function(err, hash) {
                    // Store hash in your password DB. 
                    // Create a user
                    User.update(inputs.id,{
                      password: hash
                    })
                    .exec(cb);
                });
            }
            else
            {
                return cb(true,'Password is incorrect');
            }
    });
    
    
  },
  reset: function (inputs, cb) {
    
    bcrypt.hash(inputs.password, sails.config.saltSetting, function(err, hash) {
        // Store hash in your password DB. 
        // Create a user
        User.update(inputs.id,{
          password: hash
        })
        .exec(cb);
    });

  },


  /**
   * Check validness of a login using the provided inputs.
   * But encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • email    {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  attemptLogin: function (inputs, cb) {

    User.findOne({
        username: inputs.username
    })
    .exec(function (err, user){
      if (err) return cb(err);
      var isMatch = bcrypt.compareSync(inputs.password, user.password);
      if(isMatch)
      {
          return cb(null,user);
      }
      else
      {
          return cb(err,null);
      }
    });
  }
};

