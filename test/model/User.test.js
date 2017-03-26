describe('UserModel', function() {

    describe('#attemptLogin()', function() {
        it('should check login function', function (done) {
            User.attemptLogin({
                username : "0204",
                password : "1234"
            },function(err,user){
                if (err) {
                    done(err);
                }
                else {
                    done();
                }
            })
        });
    });

});
