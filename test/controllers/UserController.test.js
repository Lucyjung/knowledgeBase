var request = require('supertest');
var authenticated;
var user_id;
var user_role;
var user_name = 'Test User, will be deleted soon';
var user_login_id = '9999';
var default_password = '1234';
var new_password = '12345';

describe('UserController', function() {
    beforeEach(function(done) {
        // use supertest.agent for store cookies ...
        // logged in agent

        // after authenticated requests 
        //login and save one agent with your session cookies. Ex:
        
        authenticated = request.agent(sails.hooks.http.app);
        authenticated.post('/login')
        .send({ username: '0000', password: default_password })
        .end(function(err,res) {
          done(err);
        });
        
        
      });
    describe('#login()', function() {
        
        it('should return json with test user data', function (done) {
            var agent = request.agent(sails.hooks.http.app);
            agent
                .post('/login')
                .send({ username: '0000', password: default_password })
                .expect(200)
                .expect({
                    "status" : true,
                    "admin" : true,
                    "img": "a0ea216a-c201-420e-8e21-0905c5401d4f.jpg",
                    "message": "Login successfully !!",
                    "username": "0000",
                    "name" : "Test Admin"
                }, done);
        });
    });
    describe('#logout()', function() {
        
        it('should return json with success status', function (done) {

            authenticated
                .post('/logout')
                .send()
                .expect(200)
                .expect({
                    "status" : true,
                    "message": "Logged out successfully!"
                }, done);
        });
    });
    describe('#signup()', function() {
        
        it('should sign up a user', function (done) {

            authenticated
                .post('/signup')
                .send({ username: user_login_id, name: user_name })
                .expect(200)
                .expect({
                    "status" : true,
                    "message": "Sign up successfully"
                }, done);
        });
    });
    describe('#signup() with existing user', function() {
        
        it('should return an error', function (done) {

            authenticated
                .post('/signup')
                .send({ username: user_login_id, name: 'Test User, will be deleted soon' })
                .expect(200)
                .expect({
                    "status" : false,
                    "message": 'User already exist'
                }, done);
        });
    });
    describe('#signup() with not parameter', function() {
        
        it('should return an error', function (done) {

            authenticated
                .post('/signup')
                .send()
                .expect(200)
                .expect({
                    "status" : false,
                    "message": 'Username and name are required'
                }, done);
        });
    });
    describe('#Find user', function() {
        
        it('should delete an user', function (done) {

            authenticated
                .get('/user')
                .send()
                .expect(200)
                .end(function(err,res) {
                    for (var index in res.body.users_list){
                        if (user_login_id == res.body.users_list[index].username){
                            user_id =  res.body.users_list[index].id;
                        } 
                    }
                    done(err);
                  });
        });
    });
    describe('#changeRole', function() {
        
        it('should change an user role', function (done) {

            authenticated
                .post('/user/role')
                .send({id: user_id, role:'ROLE-USER'})
                .expect(200)
                .expect({
                    "status" : true,
                    "message": 'Test User, will be deleted soon' + ' Role has been completely updated'
                }, done);
        });
    });
    describe('#Role', function() {
        
        it('should query an user role', function (done) {

            authenticated
                .get('/user/role')
                .send()
                .expect(200)
                .expect({
                    "status" : true,
                    "role": 'ROLE-ADMIN'
                }, done);
        });
    });
    describe('#changePass', function() {
        
        it('should change password of an user', function (done) {

            var agent = request.agent(sails.hooks.http.app);
            agent
                .post('/login')
                .send({ username: user_login_id, password: default_password })
                .expect(200)
                .end(function(err,res) {
                     agent
                    .post('/changePass')
                    .send({ old_password: default_password, new_password: new_password })
                    .expect(200)
                    .expect({
                        "status" : true,
                        "message": 'Password has been successfully updated'
                    }, done);
                  });
        });
    });
    describe('#login with invalid password', function() {
        
        it('should change password of an user', function (done) {

            var agent = request.agent(sails.hooks.http.app);
            agent
                .post('/login')
                .send({ username: user_login_id, password: default_password })
                .expect(200)
                .expect({
                    "status" : false,
                    "message": 'incorrect Username/password'
                }, done);
        });
    });
    describe('#Reset Password', function() {
        
        it('should reset password of an user', function (done) {

            authenticated
                .post('/user/resetPass')
                .send({ id: user_id})
                .expect(200)
                .expect({
                    "status" : true,
                    "message": user_name+' Role has been completely updated'
                }, done);
        });
    });
    describe('#Delete User', function() {
        
        it('should delete an user', function (done) {


        authenticated
            .delete('/user')
            .send({id : user_id})
            .expect(200)
            .expect({
                "status" : true,
                "message": 'User has been completely deleted'
            }, done);
        });
    });
    describe('#Upload Avatar', function() {
        
        xit('This test has been skipped due to unable to upload file, this TEST will be handle in CT');
    });
    describe('#data', function() {
        
        xit('This test has been skipped due to unable to set cookie, this TEST will be handle in CT');
    });
 
});
