/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  User.findOne(
        {username: '0000'}
    ).exec(function(err, found){
        if (found){
            cb();
        }
        else{
            User.create({
                username: '0000', 
                name : 'Test Admin',
                role : sails.config.userRole.admin,
                password: '$2a$10$QiVIgmtbwWi0yqPWDI.a5Oq0b7zof1H8ITqTiIhIZanhtoJGeOFce'
                }).exec(function(err, defaultUser){
                    console.log('Create default User :' + defaultUser.name)
                cb();
            });
        }
        
    });
};
