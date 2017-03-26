var request = require('supertest');

describe('UserController', function() {

    describe('#login()', function() {
        it('should return json with status true', function (done) {
            request(sails.hooks.http.app)
                .post('/login')
                .send({ username: '0204', password: '1234' })
                .expect(200)
                .expect({
                    "status" : true,
                    "admin" : true,
                    "img": "default.png",
                    "message": "Login successfully !!",
                    "username": "0204",
                    "name" : "Narut"
                }, done);
        });
    });

});
