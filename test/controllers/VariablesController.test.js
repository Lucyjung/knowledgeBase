var request = require('supertest');
var authenticated;
var test_login_id = '0000';
var test_default_password = '1234';
var varName = 'testVar';
var testCase = {
    "name" : varName,
    "eLevel" : "2X",
    "softVersion" : "T300",
    "ddVersion" : "DD-TypeA-withoutQ-MainCPU-ACG1",
    "minValue" : "0",
    "maxValue" : "10000",
    "type" : "NEW",
    "description" : "Case 1 : Init",
    "param" : {
        "eng_rpm" : {
            "before" : "1",
            "after" : "1",
            "type" : "RxM"
        },
    },
    "setupFileName" : "440e1aec-2181-44a1-abb4-2451e023fdac.csv"
};
var unApproveCaseCnt = 0 ;
var unApproveID;
var updatedTestCase = {
    "name" : varName,
    "eLevel" : "2X",
    "softVersion" : "T300",
    "ddVersion" : "DD-TypeA-withoutQ-MainCPU-ACG1",
    "minValue" : "0",
    "maxValue" : "10000",
    "type" : "NEW",
    "description" : "Case 1 : Init",
    "param" : {
        "eng_rpm" : {
            "before" : "2",
            "after" : "2",
            "type" : "RxM"
        },
    },
    "setupFileName" : "440e1aec-2181-44a1-abb4-2451e023fdac.csv"
};
describe('VariablesController', function() {
    beforeEach(function(done) {
        // use supertest.agent for store cookies ...
        // logged in agent

        // after authenticated requests 
        //login and save one agent with your session cookies. Ex:
        
        authenticated = request.agent(sails.hooks.http.app);
        authenticated.post('/login')
        .send({ username: test_login_id, password: test_default_password })
        .end(function(err,res) {
          done(err);
        });
        
        
      });

    describe('#create()', function() {
        
        it('should create new variable', function (done) {

            authenticated
                .post('/variables')
                .send({
                    name : varName,
                    case : testCase ,
                    type : sails.config.createType.new
                })
                .expect(200)
                .expect({
                    "status" : true,
                    "message": 'Variable ' + varName + ' has been successfuly created'
                }, done);
        });
    });
    describe('#find()', function() {
        
        it('should query a variable', function (done) {

            authenticated
                .get('/variables/?name='+varName)
                .send()
                .expect(200)
                .end(function(err,res) {
                    if ('variable' in res.body){
                        done();
                    }
                    else{
                       done('variable field is expected');
                    }

                  });
        });
    });
    describe('#findUnapprove()', function() {
        
        it('should query an unapprove case', function (done) {

            authenticated
                .get('/variables/unApprove')
                .send()
                .expect(200)
                .end(function(err,res) {
                    if ('case' in res.body && res.body.case.length > 0){
                        for (var index in res.body.case){
                            if (varName == res.body.case[index].name){
                                unApproveID =  res.body.case[index].id;
                            } 
                        }
                        done();
                    }
                    else{
                       done('should have unapprove case');
                    }

                  });
        });
    });
    describe('#approve()', function() {
        
        it('should approve a case', function (done) {

            authenticated
                .post('/variables/approve')
                .send({id:unApproveID })
                .expect(200)
                .expect({
                    "status" : true,
                    "message": 'Variable has been completely approved'
                }, done);
        });
    });
    
   
 
});
