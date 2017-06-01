describe("Global Method Test Suite", function() {
    beforeEach(function() {
        jasmine.Ajax.install();
    });
    afterEach(function() {
        jasmine.Ajax.uninstall();
    });
    it("Login Method - call getFormData + AJAX POST login endpoint (success) -> show component + display user page", function() {
        var postRetValue = {
            status : true,
            name : 'test name',
            img : 'test.png',      
            message : 'test msg'
        };
        spyOn(window, 'ajaxPost').and.callFake(function(url, query, cb) {
            cb(postRetValue);
        });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'showRoleBasedComponent').and.callFake(function() { });
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'getFormData').and.callFake(function() { });
        login();

        expect(getFormData).toHaveBeenCalledWith('login-form',jasmine.any(Object));   
        expect(ajaxPost).toHaveBeenCalledWith('login',jasmine.any(Object),jasmine.any(Function));     
        expect(showRoleBasedComponent).toHaveBeenCalled(); 
        expect(displayPage).toHaveBeenCalledWith('user'); 
        expect(reportDialog).not.toHaveBeenCalledWith('error','Login error',postRetValue.message); 
    });
    it("Login Method - call getFormData + AJAX POST login endpoint (fail) -> report error", function() {
        var postRetValue = {
            status : false,
            name : 'test name',
            img : 'test.png',      
            message : 'test msg'
        };
        spyOn(window, 'ajaxPost').and.callFake(function(url, query, cb) {
            cb(postRetValue);
        });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'showRoleBasedComponent').and.callFake(function() { });
        spyOn(window, 'getFormData').and.callFake(function() { });
        spyOn(window, 'displayPage').and.callFake(function() { });
        
        login();

        expect(getFormData).toHaveBeenCalledWith('login-form',jasmine.any(Object));   
        expect(ajaxPost).toHaveBeenCalledWith('login',jasmine.any(Object),jasmine.any(Function));     
        expect(showRoleBasedComponent).not.toHaveBeenCalled(); 
        expect(displayPage).not.toHaveBeenCalledWith('user'); 
        expect(reportDialog).toHaveBeenCalledWith('error','Login error',postRetValue.message); 
    });
    it("Logout Method - call getFormData + AJAX POST logout endpoint (success) -> show HOME PAGE + report success", function() {
        var postRetValue = {
            status : true,    
            message : 'test msg'
        };
        spyOn(window, 'ajaxPost').and.callFake(function(url, query, cb) {
            cb(postRetValue);
        });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'displayPage').and.callFake(function() { });
        
        logout();

        expect(ajaxPost).toHaveBeenCalledWith('logout',jasmine.any(Object),jasmine.any(Function));     
        expect(displayPage).toHaveBeenCalledWith('home'); 
        expect(reportDialog).toHaveBeenCalledWith('success','Logout',postRetValue.message); 
    });
    it("Logout Method - call getFormData + AJAX POST logout endpoint (fail) -> report error", function() {
        var postRetValue = {
            status : false,    
            message : 'test msg'
        };
        spyOn(window, 'ajaxPost').and.callFake(function(url, query, cb) {
            cb(postRetValue);
        });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'displayPage').and.callFake(function() { });
        
        logout();

        expect(ajaxPost).toHaveBeenCalledWith('logout',jasmine.any(Object),jasmine.any(Function));     
        expect(displayPage).not.toHaveBeenCalledWith('home'); 
        expect(reportDialog).toHaveBeenCalledWith('error','Logout',postRetValue.message); 
    });
    it("Add Variable Method - call check required field function (success) -> call getVariableData -> AJAX POST (success) -> report success and display VSTG Page", function() {
        var postRetValue = {
            status : true,    
            message : 'test msg'
        };
        var warningMsg = 'warning msg';
        var testVarName = 'testVar';
        
        spyOn(window, 'ajaxPost').and.callFake(function(url, query, cb) {
            cb(postRetValue);
        });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'checkRequiredField').and.callFake(function(id, cb) {
            cb(true, warningMsg);
        });
        spyOn(window, 'getVariableData').and.callFake(function(page, data,cb) {
            data.name = testVarName;
            cb();
        });
        addVariable();

        expect(checkRequiredField).toHaveBeenCalledWith('#vstg-varadd2-table-value',jasmine.any(Function));  
        expect(ajaxPost).toHaveBeenCalledWith('variables',jasmine.any(Object),jasmine.any(Function));     
        expect(displayPage).toHaveBeenCalledWith('vstg-main'); 
        expect(reportDialog).toHaveBeenCalledWith('success','Variable creation',postRetValue.message); 
    });
    it("Add Variable Method - call check required field function (success) -> call getVariableData -> AJAX POST (fail) -> report error", function() {
        var postRetValue = {
            status : false,    
            message : 'test msg'
        };
        var warningMsg = 'warning msg';
        var testVarName = 'testVar';
        
        spyOn(window, 'ajaxPost').and.callFake(function(url, query, cb) {
            cb(postRetValue);
        });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'checkRequiredField').and.callFake(function(id, cb) {
            cb(true, warningMsg);
        });
        spyOn(window, 'getVariableData').and.callFake(function(page, data,cb) {
            data.name = testVarName;
            cb();
        });
        addVariable();
        expect(checkRequiredField).toHaveBeenCalledWith('#vstg-varadd2-table-value',jasmine.any(Function));  
        expect(ajaxPost).toHaveBeenCalledWith('variables',jasmine.any(Object),jasmine.any(Function));     
        expect(displayPage).not.toHaveBeenCalledWith('vstg'); 
        expect(reportDialog).toHaveBeenCalledWith('error','Variable creation',postRetValue.message); 
    });
    it("Add Variable Method - call check required field function (success) -> call getVariableData (empty name) -> report warning", function() {
        var postRetValue = {
            status : false,    
            message : 'test msg'
        };
        var warningMsg = 'warning msg';
        
        spyOn(window, 'ajaxPost').and.callFake(function(url, query, cb) {
            cb(postRetValue);
        });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'checkRequiredField').and.callFake(function(id, cb) {
            cb(true, warningMsg);
        });
        spyOn(window, 'getVariableData').and.callFake(function(page, data,cb) {
            data.name = '';
            cb();
        });
        addVariable();

        expect(checkRequiredField).toHaveBeenCalledWith('#vstg-varadd2-table-value',jasmine.any(Function));  
        expect(ajaxPost).not.toHaveBeenCalledWith('variables',jasmine.any(Object),jasmine.any(Function));     
        expect(displayPage).not.toHaveBeenCalledWith('vstg'); 
        expect(reportDialog).toHaveBeenCalledWith('warn','Variable not found','Variable name is required'); 
    });
    it("Add Variable Method - call check required field function (fail) ->  report warning", function() {
        var postRetValue = {
            status : false,    
            message : 'test msg'
        };
        var warningMsg = 'warning msg';
        
        spyOn(window, 'ajaxPost').and.callFake(function(url, query, cb) {
            cb(postRetValue);
        });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'checkRequiredField').and.callFake(function(id, cb) {
            cb(false, warningMsg);
        });
        spyOn(window, 'getVariableData').and.callFake(function(page, data,cb) {
            data.name = '';
            cb();
        });
        addVariable();

        expect(checkRequiredField).toHaveBeenCalledWith('#vstg-varadd2-table-value',jasmine.any(Function));  
        expect(ajaxPost).not.toHaveBeenCalledWith('variables',jasmine.any(Object),jasmine.any(Function));     
        expect(displayPage).not.toHaveBeenCalledWith('vstg'); 
        expect(reportDialog).toHaveBeenCalledWith('warn','Field is required',warningMsg); 
    });
    it("Edit Variable Method - call check required field function (success) -> call getVariableData -> AJAX POST (success) -> report success and display VSTG Page", function() {
        var postRetValue = {
            status : true,    
            message : 'test msg'
        };
        var warningMsg = 'warning msg';
        var testVarName = 'testVar';
        
        spyOn(window, 'ajaxPost').and.callFake(function(url, query, cb) {
            cb(postRetValue);
        });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'checkRequiredField').and.callFake(function(id, cb) {
            cb(true, warningMsg);
        });
        spyOn(window, 'getVariableData').and.callFake(function(page, data,cb) {
            data.name = testVarName;
            data['case'] = {};
            data['case']['description'] = '';
            cb();
        });
        $('#vstg-varedit-casetable > tbody:last-child').append('<tr><td><input type="radio" name="optradio" id="test-radio" data-info="" checked><td></tr>');
        $('#test-radio').data("info",{description : ''});
        editVariable();

        expect(checkRequiredField).toHaveBeenCalledWith('#vstg-varedit2-table-value',jasmine.any(Function));  
        expect(ajaxPost).toHaveBeenCalledWith('variables',jasmine.any(Object),jasmine.any(Function));     
        expect(displayPage).toHaveBeenCalledWith('vstg-main'); 
        expect(reportDialog).toHaveBeenCalledWith('success','Variable modification',postRetValue.message); 
    });
    it("Edit Variable Method - call check required field function (success) -> call getVariableData -> AJAX POST (fail) -> report error", function() {
        var postRetValue = {
            status : false,    
            message : 'test msg'
        };
        var warningMsg = 'warning msg';
        var testVarName = 'testVar';
        
        spyOn(window, 'ajaxPost').and.callFake(function(url, query, cb) {
            cb(postRetValue);
        });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'checkRequiredField').and.callFake(function(id, cb) {
            cb(true, warningMsg);
        });
        spyOn(window, 'getVariableData').and.callFake(function(page, data,cb) {
            data.name = testVarName;
            data['case'] = {};
            data['case']['description'] = '';
            cb();
        });
        $('#vstg-varedit-casetable > tbody:last-child').append('<tr><td><input type="radio" name="optradio" id="test-radio" data-info="" checked><td></tr>');
        $('#test-radio').data("info",{description : ''});
        
        editVariable();
        
        expect(checkRequiredField).toHaveBeenCalledWith('#vstg-varedit2-table-value',jasmine.any(Function));  
        expect(ajaxPost).toHaveBeenCalledWith('variables',jasmine.any(Object),jasmine.any(Function));     
        expect(displayPage).not.toHaveBeenCalledWith('vstg'); 
        expect(reportDialog).toHaveBeenCalledWith('error','Variable modification',postRetValue.message); 
    });
    it("Edit Variable Method - call check required field function (success) -> call getVariableData (empty name) -> report warning", function() {
        var postRetValue = {
            status : false,    
            message : 'test msg'
        };
        var warningMsg = 'warning msg';
        
        spyOn(window, 'ajaxPost').and.callFake(function(url, query, cb) {
            cb(postRetValue);
        });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'checkRequiredField').and.callFake(function(id, cb) {
            cb(true, warningMsg);
        });
        spyOn(window, 'getVariableData').and.callFake(function(page, data,cb) {
            data.name = '';
            data['case'] = {};
            data['case']['description'] = '';
            cb();
        });
        $('#vstg-varedit-casetable > tbody:last-child').append('<tr><td><input type="radio" name="optradio" id="test-radio" data-info="" checked><td></tr>');
        $('#test-radio').data("info",{description : ''});
        
        editVariable();

        expect(checkRequiredField).toHaveBeenCalledWith('#vstg-varedit2-table-value',jasmine.any(Function));  
        expect(ajaxPost).not.toHaveBeenCalledWith('variables',jasmine.any(Object),jasmine.any(Function));     
        expect(displayPage).not.toHaveBeenCalledWith('vstg'); 
        expect(reportDialog).toHaveBeenCalledWith('warn','Variable not found','Variable name is required'); 
    });
    it("Edit Variable Method - call check required field function (fail) ->  report warning", function() {
        var postRetValue = {
            status : false,    
            message : 'test msg'
        };
        var warningMsg = 'warning msg';
        
        spyOn(window, 'ajaxPost').and.callFake(function(url, query, cb) {
            cb(postRetValue);
        });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'checkRequiredField').and.callFake(function(id, cb) {
            cb(false, warningMsg);
        });
        spyOn(window, 'getVariableData').and.callFake(function(page, data,cb) {
            data.name = '';
            cb();
        });
        editVariable();

        expect(checkRequiredField).toHaveBeenCalledWith('#vstg-varedit2-table-value',jasmine.any(Function));  
        expect(ajaxPost).not.toHaveBeenCalledWith('variables',jasmine.any(Object),jasmine.any(Function));     
        expect(displayPage).not.toHaveBeenCalledWith('vstg'); 
        expect(reportDialog).toHaveBeenCalledWith('warn','Field is required',warningMsg); 
    });
    it("backFromAdd2 Method - call function to display ADD PAGE", function() {

        spyOn(window, 'displayPage').and.callFake(function() { });

        backFromAdd2();

        expect(displayPage).toHaveBeenCalledWith('vstg-add'); 

    });
    xit('clickToInfo2 Method - call function to populate Data information + populate Table children', function() {
        // Move test to CT
    }).pend('Because this function is to populate table children and need data from actual cases');
    xit('clickToVarApprove Method - call function to populate Data information + populate Table children', function() {
        // Move test to CT
    }).pend('Because this function is to populate table children and need data from actual cases');
    
    xit("getVariableData Method - call utility function to get data + get param setup file name -> call AJAX UPLOAD", function() {
        // Move test to CT

    }).pend('Because this function is to get uploaded file from user and CALL AJAX UPLOAD');
    xit("getParamSetupFileName Method - get param setup file name -> call AJAX UPLOAD", function() {
        // Move test to CT

    }).pend('Because this function is to get uploaded file from user and CALL AJAX UPLOAD');
    it("checkRequiredField Method - check if required is empty -> return false", function() {
        $('#text_required').val('');
        var checkResult;
        checkRequiredField('#test-form',function(result){
            checkResult = result;
        });

        expect(checkResult).toBe(false); 

    });
    it("checkRequiredField Method - check if required is not empty -> return true", function() {
        $('#text_required').val('test');
        var checkResult;
        checkRequiredField('#test-form',function(result){
            checkResult = result;
        });

        expect(checkResult).toBe(true); 

    });
    it("checkMinMaxField Method - if Mix < Max -> return true", function() {
        $('#vstg-varadd-table-minval').val(0);
        $('#vstg-varadd-table-maxval').val(100);

        var checkResult = checkMinMaxField();
        
        expect(checkResult).toBe(true); 

    });
    it("checkMinMaxField Method - if Mix > Max -> return false", function() {
        $('#vstg-varadd-table-minval').val(100);
        $('#vstg-varadd-table-maxval').val(0);

        var checkResult = checkMinMaxField();
        
        expect(checkResult).toBe(false); 

    });
    xit("radioClickEvent Method - call function to populate data info", function() {

    }).pend('Because this function is to get information from radio component');
    it("populateHtmlForParamTable Method - RAM/ROM case", function() {
        var name = 'test';
        var variable = {
            fileName : 'testFileName',
            before : 1,
            after : 2,
            isKey : "true"
        };
        var expectedResult = '' +
          '<tr class="clickable-row" data-value="' + name + '">' +
          '<td>' + name + 
          '<input type="hidden" class="form-control" name="type" value="RxM"' +
          '</td>' +
          '<td><input type="checkbox" name="isKey" checked></td>' + 
          '<td><input type="text" class="form-control" placeholder="Before" name="before" value="'+variable.before+'"  required>' + '</td>' +
          '<td><input type="text" class="form-control" placeholder="After" name="after" value="'+variable.after+'" required>' + '</td>' +
          '</tr>';
        var htmlResult = populateHtmlForParamTable(true,name,variable);
        
        expect(htmlResult).toEqual(expectedResult); 

    });
    it("populateHtmlForParamTable Method - MAP case", function() {
        var name = 'test';
        var variable = {
            fileName : 'testFileName',
            before : 1,
            after : 2,
            isKey : "false"
        };
        var htmlExportButton = '<td><a href="'+ 'csv/' +variable.fileName+'" download="' +name +'.csv"' +'>' + 
            '<button type="submit" class="btn btn-default" >Export</button>' + '</td>'+
            '</a>'; 
        var expectedResult = '' +
          '<tr class="clickable-row" data-value="' + name + '">' +
          '<td>' + name + 
          '<input type="hidden" class="form-control" name="type" value="MAP"></td>' +
          '<td><input type="checkbox" name="isKey" ></td>' + 
          htmlExportButton + 
          '<td><input type="file" name="' + name +'" data-fileName="'+variable.fileName +'">' + 
          '<input type="hidden" class="form-control" name="fileName" value="'+ variable.fileName +'"></td>' +
          '</td>' +
          '</tr>';
        var htmlResult = populateHtmlForParamTable(false,name,variable);
        
        expect(htmlResult).toEqual(expectedResult); 

    });
    xit("decodeAndPopulateSetupFile Method - read setup file and popupate Table", function() {

    }).pend('Because this function is to get uploaded file from User');
    it("populateDataForEditDelete Method (EDIT PAGE)- Get variable info from Database and display page", function() {
        var getRetValue = {
            status : true,
            variable : {
                name : 'testName', 
                case : [] 
            },
            message : 'test'
        } 
        spyOn(window, 'ajaxGet').and.callFake(function(url, query, cb) {
            cb(getRetValue);
        });
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'populateDataInfo').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        
        populateDataForEditDelete('varedit');
        
        expect(ajaxGet).toHaveBeenCalledWith('variables',jasmine.any(Object),jasmine.any(Function)); 
        expect(displayPage).toHaveBeenCalledWith('vstg-edit'); 
        expect(populateDataInfo).toHaveBeenCalled(); 
        expect(reportDialog).not.toHaveBeenCalledWith('error','Variable search',getRetValue.message); 
    });
    it("populateDataForEditDelete Method (EDIT PAGE)- Get variable info (Error)", function() {
        var getRetValue = {
            status : false,
            variable : {
                name : 'testName', 
                case : [] 
            },
            message : 'test'
        } 
        spyOn(window, 'ajaxGet').and.callFake(function(url, query, cb) {
            cb(getRetValue);
        });
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'populateDataInfo').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        
        populateDataForEditDelete('varedit');
        
        expect(ajaxGet).toHaveBeenCalledWith('variables',jasmine.any(Object),jasmine.any(Function)); 
        expect(displayPage).not.toHaveBeenCalledWith('vstg-edit'); 
        expect(populateDataInfo).not.toHaveBeenCalled(); 
        expect(reportDialog).toHaveBeenCalledWith('error','Variable search',getRetValue.message); 
    });
    it("populateDataForEditDelete Method (DELETE PAGE)- Get variable info from Database and display page", function() {
        var getRetValue = {
            status : true,
            variable : {
                name : 'testName', 
                case : [] 
            },
            message : 'test'
        } 
        spyOn(window, 'ajaxGet').and.callFake(function(url, query, cb) {
            cb(getRetValue);
        });
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'populateDataInfo').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        
        populateDataForEditDelete('vardelete');
        
        expect(ajaxGet).toHaveBeenCalledWith('variables',jasmine.any(Object),jasmine.any(Function)); 
        expect(displayPage).toHaveBeenCalledWith('vstg-delete'); 
        expect(populateDataInfo).toHaveBeenCalled(); 
        expect(reportDialog).not.toHaveBeenCalledWith('error','Variable search',getRetValue.message); 
    });
    it("populateDataForEditDelete Method (DELETE PAGE)- Get variable info (Error)", function() {
        var getRetValue = {
            status : false,
            variable : {
                name : 'testName', 
                case : [] 
            },
            message : 'test'
        } 
        spyOn(window, 'ajaxGet').and.callFake(function(url, query, cb) {
            cb(getRetValue);
        });
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'populateDataInfo').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        
        populateDataForEditDelete('vardelete');
        
        expect(ajaxGet).toHaveBeenCalledWith('variables',jasmine.any(Object),jasmine.any(Function)); 
        expect(displayPage).not.toHaveBeenCalledWith('vstg-delete'); 
        expect(populateDataInfo).not.toHaveBeenCalled(); 
        expect(reportDialog).toHaveBeenCalledWith('error','Variable search',getRetValue.message); 
    });
    it("populateVariableInfo Method - Get variable info from Database and display page", function() {
        var getRetValue = {
            status : true,
            variable : {
                name : 'testName', 
                case : ['testcase'] 
            },
            message : 'test'
        } 
        spyOn(window, 'ajaxGet').and.callFake(function(url, query, cb) {
            cb(getRetValue);
        });
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'populateDataInfo').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        
        populateVariableInfo();
        
        expect(ajaxGet).toHaveBeenCalledWith('variables',jasmine.any(Object),jasmine.any(Function)); 
        expect(displayPage).toHaveBeenCalledWith('vstg-info'); 
        expect(populateDataInfo).toHaveBeenCalled(); 
        expect(reportDialog).not.toHaveBeenCalledWith('error','Variable search',getRetValue.message); 
    });
    it("populateVariableInfo Method - Get variable info from Database but no approved case available", function() {
        var getRetValue = {
            status : true,
            variable : {
                name : 'testName', 
                case : [] 
            },
            message : 'test'
        } 
        spyOn(window, 'ajaxGet').and.callFake(function(url, query, cb) {
            cb(getRetValue);
        });
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'populateDataInfo').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        
        populateVariableInfo();
        
        expect(ajaxGet).toHaveBeenCalledWith('variables',jasmine.any(Object),jasmine.any(Function)); 
        expect(displayPage).not.toHaveBeenCalledWith('vstg-info'); 
        expect(populateDataInfo).not.toHaveBeenCalled(); 
        expect(reportDialog).toHaveBeenCalledWith('error','Variable search','There is no case for this variable. You may need to check with Admin'); 
    });
    it("populateVariableInfo Method - Get variable info from Database (Error)", function() {
        var getRetValue = {
            status : false,
            variable : {
                name : 'testName', 
                case : ['testcase'] 
            },
            message : 'test'
        } 
        spyOn(window, 'ajaxGet').and.callFake(function(url, query, cb) {
            cb(getRetValue);
        });
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'populateDataInfo').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        
        populateVariableInfo();
        
        expect(ajaxGet).toHaveBeenCalledWith('variables',jasmine.any(Object),jasmine.any(Function)); 
        expect(displayPage).not.toHaveBeenCalledWith('vstg-info'); 
        expect(populateDataInfo).not.toHaveBeenCalled(); 
        expect(reportDialog).toHaveBeenCalledWith('error','Variable search',getRetValue.message); 
    });
    
    it("populateDataInfo Method - populate Data to certain box according to parameter pageName", function() {
        var data = {
            maxValue : '10',
            minValue : '0',
            eLevel : 'REF',
            softVersion : 'T200',
            ddVersion : 'testDD'
        } ;
        var pageName = 'varedit';

        
        populateDataInfo(pageName,data);
        
        expect($('#vstg-'+pageName+'-table-maxval').val()).toEqual(data.maxValue); 
        expect($('#vstg-'+pageName+'-table-minval').val()).toEqual(data.minValue); 
        expect($('#vstg-'+pageName+'-table-elevel').val()).toEqual(data.eLevel); 
        expect($('#vstg-'+pageName+'-table-softver').val()).toEqual(data.softVersion); 
        expect($('#vstg-'+pageName+'-table-ddver').val()).toEqual(data.ddVersion); 

    });
    it("approveAction Method - call AJAX POST (success) -> display VSTG PAGE + report success ", function() {
        var postRetValue = {
            status : true,
            message : 'test msg'
        }
        spyOn(window, 'ajaxPost').and.callFake(function(url, query, cb) {
            cb(postRetValue);
        });
        spyOn(window, 'updateApproveBadge').and.callFake(function() {});
        spyOn(window, 'reportDialog').and.callFake(function() {});
        spyOn(window, 'displayPage').and.callFake(function() {});
        
        approveAction();
        
        expect(ajaxPost).toHaveBeenCalledWith('variables/approve',jasmine.any(Object),jasmine.any(Function)); 
        expect(displayPage).toHaveBeenCalledWith('vstg-main'); 
        expect(updateApproveBadge).toHaveBeenCalled(); 
        expect(reportDialog).toHaveBeenCalledWith('success','Variable approval',postRetValue.message); 

    });
    it("approveAction Method - call AJAX POST (fail) ->  report error", function() {
        var postRetValue = {
            status : false,
            message : 'test msg'
        }
        spyOn(window, 'ajaxPost').and.callFake(function(url, query, cb) {
            cb(postRetValue);
        });
        spyOn(window, 'updateApproveBadge').and.callFake(function() {});
        spyOn(window, 'reportDialog').and.callFake(function() {});
        spyOn(window, 'displayPage').and.callFake(function() {});
        
        approveAction();
        
        expect(ajaxPost).toHaveBeenCalledWith('variables/approve',jasmine.any(Object),jasmine.any(Function)); 
        expect(displayPage).not.toHaveBeenCalledWith('vstg'); 
        expect(updateApproveBadge).toHaveBeenCalled(); 
        expect(reportDialog).toHaveBeenCalledWith('error','Variable approval',postRetValue.message); 

    });
    it("updateApproveBadge Method - call AJAX GET (Unapproved case > 0) -> show badge", function() {
        var getRetValue = {
            case : ['1','2'],
            message : 'test msg'
        }
        spyOn(window, 'ajaxGet').and.callFake(function(url, query, cb) {
            cb(getRetValue);
        });

        
        updateApproveBadge();
        
        expect(ajaxGet).toHaveBeenCalledWith('variables/unApprove',jasmine.any(Object),jasmine.any(Function)); 
        expect($('#vstg-approve-badge').css("display")).not.toEqual('none'); 
        expect(Number($('#vstg-approve-badge').html())).toEqual(getRetValue.case.length); 

    });
    it("updateApproveBadge Method - call AJAX GET (no unapproved case) -> hide badge", function() {
        var getRetValue = {
            case : [],
            message : 'test msg'
        }
        spyOn(window, 'ajaxGet').and.callFake(function(url, query, cb) {
            cb(getRetValue);
        });

        
        updateApproveBadge();
        
        expect(ajaxGet).toHaveBeenCalledWith('variables/unApprove',jasmine.any(Object),jasmine.any(Function)); 
        expect($('#vstg-approve-badge').css("display")).toEqual('none'); 

    });
    it("showMemberPage Method - call AJAX GET (success) -> display member page", function() {
        var getRetValue = {
            status : true,
            users_list : ['1'],
        }
        spyOn(window, 'ajaxGet').and.callFake(function(url, query, cb) {
            cb(getRetValue);
        });
        spyOn(window, 'displayPage').and.callFake(function() {});
        spyOn(window, 'reportDialog').and.callFake(function() {});

        
        showMemberPage();
        
        expect(ajaxGet).toHaveBeenCalledWith('user',jasmine.any(Object),jasmine.any(Function)); 
        expect(displayPage).toHaveBeenCalledWith('admin-member'); 
        expect(reportDialog).not.toHaveBeenCalledWith('error','Member List',getRetValue.message); 
    });
    it("showMemberPage Method - call AJAX GET (fail) -> report error", function() {
        var getRetValue = {
            status : false,
            users_list : ['1']
        }
        spyOn(window, 'ajaxGet').and.callFake(function(url, query, cb) {
            cb(getRetValue);
        });
        spyOn(window, 'displayPage').and.callFake(function() {});
        spyOn(window, 'reportDialog').and.callFake(function() {});

        showMemberPage();
        
        expect(ajaxGet).toHaveBeenCalledWith('user',jasmine.any(Object),jasmine.any(Function)); 
        expect(displayPage).not.toHaveBeenCalledWith('admin-member'); 
        expect(reportDialog).toHaveBeenCalledWith('error','Member List',getRetValue.message); 
    });
    xit("clickToDeleteUser Method - pass user ID to modal", function() {

    }).pend('Because user id and button shall be generate by real user data');
    xit("clickToResetPass Method - pass user ID to modal", function() {

    }).pend('Because user id and button shall be generate by real user data');
    it("memberRoleChange Method - Should enable apply button", function() {

        memberRoleChange();

        expect($('#admin-member-apply-button').prop("disabled")).toBe(false); 
    });
    it("checkSearchValue Method - in case of empty -> should report error and return false", function() {
        $('#vstg-search-box').val('');
        spyOn(window, 'reportDialog').and.callFake(function() {});
        
        var result = checkSearchValue();

        expect(result).toBe(false); 
        expect(reportDialog).toHaveBeenCalledWith('error','Search box','Search Value is empty'); 
    });
    it("checkSearchValue Method - in case of not empty -> should return true", function() {
        $('#vstg-search-box').val('test');
        spyOn(window, 'reportDialog').and.callFake(function() {});
        
        var result = checkSearchValue();

        expect(result).toBe(true); 
        expect(reportDialog).not.toHaveBeenCalledWith('error','Search box','Search Value is empty'); 
    });
});

