/**
 * VariablesController
 *
 * @description :: Server-side logic for managing variables
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create : function(req, res) {
        var query_data = {
            name : req.body.name,
            status : true,
            sort: 'revision DESC'
        };
        var caseToAdd = req.body.case;
        caseToAdd.owner = req.session.user;
        caseToAdd.owner_id = req.session.me;
        req.body['case'] = [];
        Variables.findOne(query_data).exec(function (err, record){
            if (err){
                return res.json({
                  status : false,
                  message: 'Database connection error'
                });
            }
            else{
                if (record){

                    req.body.revision = record.revision;
                    req.body['case'] = record.case;
                    if(req.body.type == sails.config.createType.update_param){
                        caseToAdd['basedCase'] = req.body.targetedCase;
                    }
                    else if (req.body.type == sails.config.createType.delete){
                        if (req.body.targetedCase == undefined){
                            return res.json({
                                status : false,
                                message: 'Delete with no targeted case'
                            });
                        }
                        var index = req.body['case'].indexOf(req.body.targetedCase);
                        if (index > -1) {
                            req.body['case'].splice(index, 1);
                        }
                    }
                }
                else{
                    if(req.body.type == sails.config.createType.add_case || 
                            req.body.type == sails.config.createType.update_param){
                        return res.json({
                            status : false,
                            message: 'Add case with no existing data'
                        });
                    }
                }  
                if (req.body.type == sails.config.createType.new || 
                    req.body.type == sails.config.createType.add_case  || 
                    req.body.type == sails.config.createType.update_param){
                    if (caseToAdd.name == undefined)caseToAdd.name = req.body.name;
                    Case.create(caseToAdd).exec(function (err, createdCase){
                        if(err){
                            return res.json({
                                  status : false,
                                  message: 'Unable to create case'
                                });
                        }
                        req.body['case'].push(createdCase.id); 
                        Variables.create(req.body).exec(function createCB(err, created){
                            if (err){
                                return res.json({
                                  status : false,
                                  message: 'Database connection error'
                                });
                            }
                            else 
                            {
                                var actionMsg = (req.body.type == sails.config.createType.new)?'created':'updated';
                                return res.json({
                                  status : true,
                                  message: 'Variable ' + created.name + ' has been successfuly ' + actionMsg
                                });
                            }
                        });
                    });
                }else if (req.body.type == sails.config.createType.delete){
                    Case.update(
                        {id:req.body.targetedCase},
                        {status : false}
                    ).exec(function (err, deletedCase){
                        if(err){
                            return res.json({
                                  status : false,
                                  message: 'Unable to delete case'
                                });
                        }
                         return res.json({
                                  status : true,
                                  message: 'Case has been deleted'
                                });
                    });
                }
                
            }
        });
        
    },
    find : function(req, res) {
        var query_data = {
            name : req.param('name'),
            status : true,
            sort: 'revision DESC'
        };
        Variables.findOne(query_data).exec(function (err, foundVariable){
            if (err){
                return res.json({
                  status : false,
                  message: 'Database connection error'
                });
            }
            else 
            {
                if (foundVariable)
                {
                    query_data = [{
                        id : foundVariable.case,
                        status : true,
                        approve_status : true
                    },
                    {
                        id : foundVariable.case,
                        owner_id : req.session.me,
                        status : true,
                        approve_status : false,
                    }
                    ];
                    Case.find(query_data).exec(function (err, foundCase){
                        if (foundCase.length > 0){
                            var len = foundCase.length;
                            var completedCnt = 0;
                            var results = [];
                            foundCase.forEach(function(value){

                                User.findOne({id: value.owner_id}).exec(function (error, foundUser) {
                                    if (foundUser){
                                        value.owner_name = foundUser.name;
                                    }
                                    else{
                                        value.owner_name =  value.username;
                                    }
                                    results.push(value);
                                    completedCnt++;
                                    if (len == completedCnt){
                                        foundVariable.case = results;
                                        return res.json({
                                            status : true,
                                            message: 'Variable query successful',
                                            variable : foundVariable
                                          });
                                    }
                                });
                            });
                        }
                        else{
                            return res.json({
                                status : false,
                                message: 'Variable not found'
                             });
                        }
                        
                    });
                    
                }
                else{
                    return res.json({
                        status : false,
                        message: 'Variable not found'
                      });
                }
                
            }
        });
    },
    findUnapprove : function(req, res) {
        var query_data = {
            approve_status : false,
            status : true
        };
        Case.find(query_data).exec(function (err, record){
            if (err){
                return res.json({
                  status : false,
                  message: 'Database connection error'
                });
            }
            else 
            {
                if (record)
                {
                    len = record.length;
                    completedCnt = 0;
                    results = [];
                    record.forEach(function(value){
                        User.findOne({id: value.owner_id}).exec(function (error, foundUser) {
                        if (foundUser){
                            value.owner_name = foundUser.name;
                        }
                        else{
                            value.owner_name =  value.username;
                        }
                        results.push(value);
                        completedCnt++;
                        if (len == completedCnt){
                            record.case = results;
                            return res.json({
                                status : true,
                                message: 'Variable query successful',
                                case : record
                              });
                        }
                        });
                        
                    });
                    
                }
                else{
                    return res.json({
                        status : false,
                        message: 'Variable not found'
                      });
                }
                
            }
        });
    },
    destroy : function(req, res) {
        var query_data = {
            name : req.param('name')
        };
        var to_update_data = {
            status : false,
            owner : req.session.user,
            owner_id : req.session.me
        };
        Variables.update(query_data,to_update_data).exec(function (err, record){
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
                    message: 'Variable has been completely deleted'
                  });
            }
        });
    },
    approve : function(req, res) {
        var query_data = {
            id : req.body.case_id
        };
        var to_update_data = {
            approve_status : true,
        };
        Case.update(query_data,to_update_data).exec(function (err, record){
            if (err){
                return res.json({
                  status : false,
                  message: 'Database connection error'
                });
            }
            else 
            {
                query_data = {
                    id : record[0].basedCase
                };
                to_update_data = {
                    status : false
                };
                Case.update(query_data,to_update_data).exec(function (err, deletedData){
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
                            message: 'Variable has been completely approved'
                          });
                    }
                });
            }
        });
    },
    reject : function(req, res) {
        var query_data = {
            id : req.body.case_id
        };
        var to_update_data = {
            approve_status : false,
            status : false
        };
        Case.update(query_data,to_update_data).exec(function (err, record){
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
                    message: 'Variable has been completely rejected'
                  });
            }
        });
    },
    findAll : function(req, res) {
        var query_data = {
            where : {status : true},
            select: ['name','revision','case','updatedAt'],
            sort: 'revision DESC'
        };
        Variables.find(query_data).exec(function (err, records){
            if (err){
                return res.json({
                  status : false,
                  message: 'Database connection error'
                });
            }
            else 
            {
                var unique_record = [];
                var name_list = [];
                var results = [];
                var completedCnt = 0;
                records.forEach(function( value) {
                    if (name_list.indexOf(value.name)==-1) {
                        name_list.push(value.name);
                        unique_record.push(value);
                    }
                });
                var len = unique_record.length;
                unique_record.forEach(function( value) {
                    query_data = [{
                        id : value.case,
                        status : true,
                        approve_status : true
                    },
                    {
                        id : value.case,
                        owner_id : req.session.me,
                        status : true,
                        approve_status : false,
                    }
                    ];
                    Case.find(query_data).exec(function countCB(error, found) {
                        var result = [value.name , 
                                    value.revision , 
                                    found.length , 
                                    value.updatedAt
                        ];
                        if (found.length  > 0){
                            results.push(result);
                        }

                        completedCnt++;
                        if (len == completedCnt){
                            return res.json({
                                status : true,
                                data: results
                              });
                        }
                      });
                });

            }
        });
    },
    convert :  function(req, res) {
        const fs = require('fs');
        var lineReader = require('line-reader');
        var query_data = {
            status : true
        };
        Case.find(query_data).exec(function (err, record){
            if (err){
                return res.json({
                  status : false,
                  message: 'Database connection error'
                });
            }
            else 
            {
                results = [];
                idList = [];
                paramList = [];
                paramNameList =[];
                fileList = [];
                for (var i in record){
                    var varCase = record[i];
                    for (var paramName in varCase.param){
                        if (varCase.param[paramName].fileName !== undefined){

                            idList.push(record[i].id);
                            paramList.push(varCase.param);
                            paramNameList.push(paramName);
                            fileList.push(varCase.param[paramName].fileName);
                        }
                    }
                };
                async.eachSeries(fileList,function(fileName,callback){
                    var dirname =  require('path').resolve(sails.config.appPath, 'assets/csv');
                    var fullFileName = dirname + '\\' + fileName;
                    var state = 'Search';
                    var prev_line = '';
                    var data;
                    var beginVal;
                    var endVal;
                    lineReader.eachLine(fullFileName, function(line) {
                        if ((line === '') && (state === 'Search')){
                            state = 'Started';
                        }
                        else if(state === 'Started'){

                            data = line.split(",");
                            var firstVal = parseFloat(data[0]);
                            var secondVal = parseFloat(data[1]);
                            if (firstVal == secondVal){
                                beginVal = firstVal;
                                endVal = secondVal;
                                state = 'Done';

                            }
                            else{
                                beginVal = firstVal;
                                state = 'FindEnd';
                            }
                        }
                        else if (state == 'FindEnd'){
                            
                            if (line == ''){
                                data = prev_line.split(",");
                                endVal = parseFloat(data[data.length -2]);
                                state = 'Done';
                            }
                            prev_line = line;
                        }
                        else if (state == 'Done'){
                            var ret_val = {
                                begin : beginVal,
                                end : endVal
                            }
                            results.push(ret_val);
                            state = 'Idle';
                            callback();
                        }

                    });
                }, function done(){
                    var updateList = [];
                    for(var index in idList){
                        paramList[index][paramNameList[index]].begin = results[index].begin;
                        paramList[index][paramNameList[index]].end = results[index].end;
                        update = {
                            query : idList[index],
                            update : paramList[index]
                        };
                        updateList.push(update);
                    }

                    async.eachSeries(updateList,function(updateInfo,cb){
                        Case.update({id :updateInfo.query},{param : updateInfo.update}).exec(function(err, updated){
                            cb();
                        });
                    },function done(){
                        return res.json({
                            status : true
                        })
                    })
                    
                    
                });
                
            }
        });
    }
};

