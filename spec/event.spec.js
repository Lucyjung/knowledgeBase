describe("Event Trigger Test Suite", function() {
    beforeEach(function() {
        jasmine.Ajax.install();
        $('#loadingDiv').modal('hide');
    });
    afterEach(function() {
        jasmine.Ajax.uninstall();
    });
    it("After click login button - Should call login function after login button get clicked", function() {
        spyOn(window, 'login').and.callFake(function() { });
         $('#login-button').trigger('click');
        expect(login).toHaveBeenCalled();
    });
    it("After press Enter Key - Should call login function", function() {
        spyOn(window, 'login').and.callFake(function() { });
        var e = jQuery.Event("keyup");
        e.keyCode = 13;
            
        $('#inputPassword').trigger(e);
        expect(login).toHaveBeenCalled();
    });
    it("After click vstg tab - Should call update approve badge function and call function to display VSTG page", function() {
        spyOn(window, 'updateApproveBadge').and.callThrough();
        spyOn(window, 'displayPage').and.callFake(function() { });
         $('#vstg-tab').trigger('click');
        expect(updateApproveBadge).toHaveBeenCalled();
        expect(displayPage).toHaveBeenCalledWith('vstg-main');
    });
    it("After click admin tab - Should call function to display member page", function() {
        spyOn(window, 'showMemberPage').and.callThrough();
         $('#admin-tab').trigger('click');
        expect(showMemberPage).toHaveBeenCalled();
    });
    it("After click home tab (no login) - Should call function to display home page", function() {
        spyOn(window, 'displayPage').and.callThrough();
         $('#user-span').html('');
         $('#home-tab').trigger('click');
        expect(displayPage).toHaveBeenCalledWith('home');
    });
    it("After click home tab (logged in) - Should call function to display user page", function() {
        spyOn(window, 'displayPage').and.callThrough();
         $('#user-span').html('test user');
         $('#home-tab').trigger('click');
        expect(displayPage).toHaveBeenCalledWith('user');
    });
    it("After click add button in VSTG Page - Should call function to display add variable page", function() {
        spyOn(window, 'displayPage').and.callThrough();
        $('#vstg-add-button').trigger('click');
        expect(displayPage).toHaveBeenCalledWith('vstg-add');
    });
    it("After click edit button in VSTG Page - Should call function to check text field and populate edit variable page", function() {
        spyOn(window, 'populateDataForEditDelete').and.callThrough();
        spyOn(window, 'checkSearchValue').and.callThrough();
        $('#vstg-search-box').val('testVar');
        $('#vstg-edit-button').trigger('click');
        expect(checkSearchValue).toHaveBeenCalled();
        expect(populateDataForEditDelete).toHaveBeenCalledWith('varedit');
        $('#vstg-search-box').val('');
    });
    it("After click delete button in VSTG Page - Should call function to check text field and populate delete variable page", function() {
        spyOn(window, 'populateDataForEditDelete').and.callThrough();
        spyOn(window, 'checkSearchValue').and.callThrough();
        $('#vstg-search-box').val('testVar');
        $('#vstg-delete-button').trigger('click');
        expect(checkSearchValue).toHaveBeenCalled();
        expect(populateDataForEditDelete).toHaveBeenCalledWith('vardelete');
        $('#vstg-search-box').val('');
    });
    it("After click add button in VSTG ADD Page (Pass case) - Should call function to check Min/Max/required field and display add2 page", function() {
        spyOn(window, 'checkMinMaxField').and.callThrough();
        spyOn(window, 'checkRequiredField').and.callFake(function(id, cb) {
            cb(true,'test message');
        });
        spyOn(window, 'ajaxGet').and.callFake(function(url, query_data, cb) {
            var data = {
                status : false
            }
            cb(data);
        });
        spyOn(window, 'displayPage').and.callThrough();

        $('#vstg-varadd-table-minval').val(0);
        $('#vstg-varadd-table-maxval').val(100);

        $('#vstg-varadd-table-add').trigger('click');
        expect(checkMinMaxField).toHaveBeenCalled();
        expect(checkRequiredField).toHaveBeenCalled();
        expect(displayPage).toHaveBeenCalledWith('vstg-add2');    
    });
    it("After click add button in VSTG ADD Page (Min Value > Max Value) - Should call report dialog with error", function() {
        spyOn(window, 'checkMinMaxField').and.callThrough();
        spyOn(window, 'reportDialog').and.callFake(function(type, title, msg) {});
 
        $('#vstg-varadd-table-minval').val(100);
        $('#vstg-varadd-table-maxval').val(0);

        $('#vstg-varadd-table-add').trigger('click');
        expect(checkMinMaxField).toHaveBeenCalled();
        expect(reportDialog).toHaveBeenCalledWith('error','Value is invalid','Min value greater than Max value');    
    });
    it("After click add button in VSTG ADD Page (Required Field return false value) - Should call report dialog with warning", function() {
        var return_msg = 'test msg';
        spyOn(window, 'checkMinMaxField').and.callThrough();
        spyOn(window, 'checkRequiredField').and.callFake(function(selector, cb) {
            cb(false, return_msg);
        });
        spyOn(window, 'reportDialog').and.callFake(function(type, title, msg) {});
 
        $('#vstg-varadd-table-minval').val(0);
        $('#vstg-varadd-table-maxval').val(100);

        $('#vstg-varadd-table-add').trigger('click');
        expect(checkMinMaxField).toHaveBeenCalled();
        expect(checkRequiredField).toHaveBeenCalled();
        expect(reportDialog).toHaveBeenCalledWith('warn','Field is required',return_msg);    
    });
    it("After click add button in VSTG ADD Page (Duplicate variable case) - Should call report dialog with error", function() {
        spyOn(window, 'checkMinMaxField').and.callThrough();
        spyOn(window, 'checkRequiredField').and.callFake(function(id, cb) {
            cb(true,'test message');
        });
        spyOn(window, 'ajaxGet').and.callFake(function(url, query_data, cb) {
            var data = {
                status : true
            }
            cb(data);
        });
        spyOn(window, 'reportDialog').and.callFake(function(type, title, msg) {});

        $('#vstg-varadd-table-minval').val(0);
        $('#vstg-varadd-table-maxval').val(100);

        $('#vstg-varadd-table-add').trigger('click');
        expect(checkMinMaxField).toHaveBeenCalled();
        expect(checkRequiredField).toHaveBeenCalled();
        expect(reportDialog).toHaveBeenCalledWith('error','Add variable','Duplicate variables');   
    });
    it("After variable name on page ADD change -> variable name on page 2 change too", function() {
        var testVarName = 'testVar';
        $('#vstg-varadd-table-varname').val(testVarName);
        $('#vstg-varadd-table-varname').trigger('input');
        expect($('#vstg-varadd2-table-varname').val()).toEqual(testVarName);
    });
    it("After DD file has been selected -> Should fill in Min, Max and E-Level ", function() {
        var testMsg = {
            status : true,
            message : {
                maxValue : '100',
                minValue : '0',
                eLevelValue : 'REF'
            }
        };

        spyOn(window, 'ajaxUpload').and.callFake(function(url, formData, bool ,cb) {
            cb(testMsg);
        });
        $('#vstg-varadd-table-import').trigger('change');
        expect($('#vstg-varadd-table-maxval').val()).toEqual(testMsg.message.maxValue);
        expect($('#vstg-varadd-table-minval').val()).toEqual(testMsg.message.minValue);
        expect($('#vstg-varadd-table-elevel').val()).toEqual(testMsg.message.eLevelValue);
    });
    it("After DD file has been selected but variable name field is empty -> call report dialog ", function() {
        spyOn(window, 'reportDialog').and.callFake(function(type, title, msg) {});
        $('#vstg-varadd-table-varname').val('');    

        $('#vstg-varadd-table-import').trigger('change');
        expect(reportDialog).toHaveBeenCalledWith('warn','Variable name is empty',
        'Please input variable name properly');   
    });
    it("After DD file has been selected but variable is not in DD file -> call report dialog ", function() {
        var testVarName = 'testVar';
        $('#vstg-varadd-table-varname').val(testVarName);
        spyOn(window, 'reportDialog').and.callFake(function(type, title, msg) {});
        var testMsg = {
            status : false,
            message : 'test failure'
        };

        spyOn(window, 'ajaxUpload').and.callFake(function(url, formData, bool ,cb) {
            cb(testMsg);
        });
        $('#vstg-varadd-table-import').trigger('change');
        expect(reportDialog).toHaveBeenCalledWith('warn','Variable not found',testMsg.message);   
    });
    it("After setup file has been selected in ADD2 Page -> call function to decode and populate HTML", function() {
        spyOn(window, 'decodeAndPopulateSetupFile').and.callFake(function(obj, param) {});
        $('#vstg-varadd2-import-file').trigger('change');
        expect(decodeAndPopulateSetupFile).toHaveBeenCalledWith(jasmine.any(Object),'varadd');   
    });
    it("After setup file has been selected in EDIT2 Page-> call function to decode and populate HTML", function() {
        spyOn(window, 'decodeAndPopulateSetupFile').and.callFake(function(obj, param) {});
        $('#vstg-varedit2-import-file').trigger('change');
        expect(decodeAndPopulateSetupFile).toHaveBeenCalledWith(jasmine.any(Object),'varedit');   
    });
    it("After click search button -> call function to check search value and populate Variable Info", function() {
        spyOn(window, 'checkSearchValue').and.callFake(function() {
            return true;
        });
        spyOn(window, 'populateVariableInfo').and.callFake(function() { });
        $('#vstg-search-button').trigger('click');
        expect(checkSearchValue).toHaveBeenCalled();   
        expect(populateVariableInfo).toHaveBeenCalled();   
    });
    it("After click search button -> call function to check search value (return false) and not populate Variable Info", function() {
        spyOn(window, 'checkSearchValue').and.callFake(function() {
            return false;
        });
        spyOn(window, 'populateVariableInfo').and.callFake(function() { });
        $('#vstg-search-button').trigger('click');
        expect(checkSearchValue).toHaveBeenCalled();   
        expect(populateVariableInfo).not.toHaveBeenCalled();   
    });
    it("After click enter at search box -> call function to check search value populate Variable Info", function() {
        spyOn(window, 'checkSearchValue').and.callFake(function() {
            return true;
        });
        spyOn(window, 'populateVariableInfo').and.callFake(function() { });
        
        var e = jQuery.Event("keyup");
        e.keyCode = 13;
            
        $('#vstg-search-box').trigger(e);
        expect(checkSearchValue).toHaveBeenCalled();   
        expect(populateVariableInfo).toHaveBeenCalled();   
    });
    it("After click enter at search box -> call function to check search value (return false) and not populate Variable Info", function() {
        spyOn(window, 'checkSearchValue').and.callFake(function() {
            return false;
        });
        spyOn(window, 'populateVariableInfo').and.callFake(function() { });
        
        var e = jQuery.Event("keyup");
        e.keyCode = 13;
            
        $('#vstg-search-box').trigger(e);
        expect(checkSearchValue).toHaveBeenCalled();   
        expect(populateVariableInfo).not.toHaveBeenCalled();   
    });
    it("After click add case button -> populate variable name to ADD Page component and call function to display ADD CASE PAGE", function() {
        spyOn(window, 'displayPage').and.callFake(function() { });
        var testVarName = 'testVar';
        $('#vstg-varedit-table-varname').val(testVarName);
            
        $('#vstg-varedit-addcase-button').trigger('click');
        expect(displayPage).toHaveBeenCalled();   
        expect($('#vstg-varadd-table-varname').val()).toEqual(testVarName);   
        expect($('#vstg-varadd-table-varname').val()).toEqual(testVarName);   
    });
    it("After click edit value button -> display EDIT2 PAGE -> Need to check further during Combined TEST (CT)", function() {
        spyOn(window, 'displayPage').and.callFake(function() { });

        $('#vstg-varedit-editvalue-button').trigger('click');
        expect(displayPage).toHaveBeenCalledWith('vstg-edit2');   
 
    });
    it("After click submit button at EDIT PAGE -> call AJAX POST (success) -> report success and display vstg page", function() {
        var postRetValue = {
            status : true,
            message : 'test msg'
        }
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'ajaxPost').and.callFake(function(url,formData, cb) {
            cb(postRetValue);
        });
        spyOn(window, 'getFormData').and.callFake(function() { });
            
        $('#vstg-varedit-submit-button').trigger('click');
        expect(getFormData).toHaveBeenCalled();  
        expect(displayPage).toHaveBeenCalledWith('vstg-main');   
        expect(reportDialog).toHaveBeenCalledWith('success','Variable creation',postRetValue.message);     
    });
    it("After click submit button at EDIT PAGE -> call AJAX POST (fail) -> report error", function() {
        var postRetValue = {
            status : false,
            message : 'test msg'
        }
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'ajaxPost').and.callFake(function(url,formData, cb) {
            cb(postRetValue);
        });
        spyOn(window, 'getFormData').and.callFake(function() { });
            
        $('#vstg-varedit-submit-button').trigger('click');
        expect(getFormData).toHaveBeenCalled();  
        expect(reportDialog).toHaveBeenCalledWith('error','Variable creation',postRetValue.message);     
    });
    it("After click delete case button at DELETE PAGE -> call AJAX POST (success) -> report success and display vstg page", function() {
        var postRetValue = {
            status : true,
            message : 'test msg'
        }
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'ajaxPost').and.callFake(function(url,formData, cb) {
            cb(postRetValue);
        });
            
        $('#vstg-vardelete-case-button').trigger('click');
        expect(displayPage).toHaveBeenCalledWith('vstg-main');   
        expect(reportDialog).toHaveBeenCalledWith('success','Variable Deletion',postRetValue.message);     
    });
    it("After click delete case button at DELETE PAGE -> call AJAX POST (fail) -> report error", function() {
        var postRetValue = {
            status : false,
            message : 'test msg'
        }
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'ajaxPost').and.callFake(function(url,formData, cb) {
            cb(postRetValue);
        });
            
        $('#vstg-vardelete-case-button').trigger('click');
        expect(reportDialog).toHaveBeenCalledWith('error','Variable Deletion',postRetValue.message);     
    });
    it("After click delete all button at DELETE PAGE -> call AJAX DELETE (success) -> report success and display vstg page", function() {
        var postRetValue = {
            status : true,
            message : 'test msg'
        }
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'ajaxDelete').and.callFake(function(url,formData, cb) {
            cb(postRetValue);
        });
            
        $('#vstg-vardelete-all-button').trigger('click');
        expect(displayPage).toHaveBeenCalledWith('vstg-main');   
        expect(reportDialog).toHaveBeenCalledWith('success','Variable Deletion',postRetValue.message);     
    });
    it("After click delete all button at DELETE PAGE -> call AJAX DELETE (fail) -> report error", function() {
        var postRetValue = {
            status : false,
            message : 'test msg'
        }
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'ajaxDelete').and.callFake(function(url,formData, cb) {
            cb(postRetValue);
        });
            
        $('#vstg-vardelete-all-button').trigger('click');
        expect(reportDialog).toHaveBeenCalledWith('error','Variable Deletion',postRetValue.message);     
    });
    it("After click change picture at USER PAGE -> display change avatar component", function() {
        spyOn(window, 'displayPage').and.callFake(function() { });
        $('#user-change-avatar-button').trigger('click');
        expect(displayPage).toHaveBeenCalledWith('user-change-avatar');     
    });
    
    it("After click confirm change picture at USER PAGE -> call AJAX UPLOAD (success) -> report success and display user page", function() {
        var uploadRetValue = {
            status : true,
            message : 'test msg'
        }
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'ajaxUpload').and.callFake(function(url,formData,bool, cb) {
            cb(uploadRetValue);
        });
            
        $('#user-change-avatar-confirm-button').trigger('click');
        expect(reportDialog).toHaveBeenCalledWith('success','Avatar upload',uploadRetValue.message); 
        expect(ajaxUpload).toHaveBeenCalledWith('avatar',jasmine.any(Object),false,jasmine.any(Function)); 
        expect(displayPage).toHaveBeenCalledWith('user'); 
        expect(reportDialog).not.toHaveBeenCalledWith('error','Avatar upload',uploadRetValue.message); 
    });
    it("After click confirm change picture at USER PAGE -> call AJAX UPLOAD (fail) -> report error ", function() {
        var uploadRetValue = {
            status : false,
            message : 'test msg'
        }
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'ajaxUpload').and.callFake(function(url,formData,bool, cb) {
            cb(uploadRetValue);
        });
            
        $('#user-change-avatar-confirm-button').trigger('click');
        expect(reportDialog).not.toHaveBeenCalledWith('success','Avatar upload',uploadRetValue.message); 
        expect(ajaxUpload).toHaveBeenCalledWith('avatar',jasmine.any(Object),false,jasmine.any(Function)); 
        expect(displayPage).not.toHaveBeenCalledWith('user'); 
        expect(reportDialog).toHaveBeenCalledWith('error','Avatar upload',uploadRetValue.message); 
    });
    it("After click change password at USER PAGE -> display change change password component", function() {
        spyOn(window, 'displayPage').and.callFake(function() { });
        $('#user-change-pass-button').trigger('click');
        expect(displayPage).toHaveBeenCalledWith('user-change-pass');     
    });
    it("After click confirm change password at USER PAGE -> call AJAX POST (success) -> report success and display user page", function() {
        var postRetValue = {
            status : true,
            message : 'test msg'
        }
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'ajaxPost').and.callFake(function(url,formData, cb) {
            cb(postRetValue);
        });
        spyOn(window, 'checkRequiredField').and.callFake(function(obj,cb) {
            cb(true);
        });
            
        $('#user-change-pass-confirm').trigger('click');
        expect(reportDialog).toHaveBeenCalledWith('success','Change password',postRetValue.message); 
        expect(checkRequiredField).toHaveBeenCalledWith('.user-change-pass-form',jasmine.any(Function)); 
        expect(ajaxPost).toHaveBeenCalledWith('changePass',jasmine.any(Object),jasmine.any(Function)); 
        expect(displayPage).toHaveBeenCalledWith('user'); 
        expect(reportDialog).not.toHaveBeenCalledWith('error','Change password',postRetValue.message); 
    });
    it("After click confirm change password at USER PAGE -> call AJAX POST (fail) -> report error ", function() {
        var postRetValue = {
            status : false,
            message : 'test msg'
        };
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'ajaxPost').and.callFake(function(url,formData,cb) {
            cb(postRetValue);
        });
        spyOn(window, 'checkRequiredField').and.callFake(function(obj,cb) {
            cb(true);
        });
            
        $('#user-change-pass-confirm').trigger('click');
        expect(reportDialog).not.toHaveBeenCalledWith('success','Change password',postRetValue.message); 
        expect(checkRequiredField).toHaveBeenCalledWith('.user-change-pass-form',jasmine.any(Function)); 
        expect(ajaxPost).toHaveBeenCalledWith('changePass',jasmine.any(Object),jasmine.any(Function)); 
        expect(displayPage).not.toHaveBeenCalledWith('user'); 
        expect(reportDialog).toHaveBeenCalledWith('error','Change password',postRetValue.message); 
    });
    it("After click confirm change password at USER PAGE with empty value in required field -> report warning", function() {
        var testMsg = 'test msg';
        var postRetValue = {
            status : true,
            message : testMsg
        }
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'ajaxPost').and.callFake(function(url,formData, cb) {
            cb(postRetValue);
        });
        spyOn(window, 'checkRequiredField').and.callFake(function(obj,cb) {
            cb(false, testMsg);
        });
            
        $('#user-change-pass-confirm').trigger('click');
        
        expect(checkRequiredField).toHaveBeenCalledWith('.user-change-pass-form',jasmine.any(Function)); 
        expect(ajaxPost).not.toHaveBeenCalledWith('changePass',jasmine.any(Object),jasmine.any(Function)); 
        expect(displayPage).not.toHaveBeenCalledWith('user'); 
        expect(reportDialog).toHaveBeenCalledWith('warn','Field is required',testMsg); 
        expect(reportDialog).not.toHaveBeenCalledWith('error','Change password',postRetValue.message); 
    });
    it("After click logout button -> call logout function", function() {
        spyOn(window, 'logout').and.callFake(function() { });
        $('#user-logout-button').trigger('click');
        expect(logout).toHaveBeenCalled();     
    });
    it("After click approve button -> call function AJAX GET (Success) -> display APPROVE PAGE", function() {
        var getRetValue = {
            status : true,
            message : 'test msg'
        };
        spyOn(window, 'ajaxGet').and.callFake(function(url, query, cb) {
            cb(getRetValue);
        });
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        $('#vstg-approve-button').trigger('click');
        expect(ajaxGet).toHaveBeenCalledWith('variables/unApprove',jasmine.any(Object),jasmine.any(Function));     
        expect(displayPage).toHaveBeenCalledWith('vstg-approve');   
        expect(reportDialog).not.toHaveBeenCalled(); 
    });
    it("After click approve button -> call function AJAX GET (fail) -> report error ", function() {
        var getRetValue = {
            status : false,
            message : 'test msg'
        };
        spyOn(window, 'ajaxGet').and.callFake(function(url, query, cb) {
            cb(getRetValue);
        });
        spyOn(window, 'displayPage').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        $('#vstg-approve-button').trigger('click');
        expect(ajaxGet).toHaveBeenCalledWith('variables/unApprove',jasmine.any(Object),jasmine.any(Function));     
        expect(displayPage).not.toHaveBeenCalledWith('vstg-approve');  
        expect(reportDialog).toHaveBeenCalledWith('error','Variable search',getRetValue.message); 
    });
    it("After click user delete confirm button -> call AJAX DELETE (Success) -> refresh member page and report success", function() {
        var deleteRetValue = {
            status : true,
            message : 'test msg'
        };
        spyOn(window, 'ajaxDelete').and.callFake(function(url, query, cb) {
            cb(deleteRetValue);
        });
        spyOn(window, 'showMemberPage').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        $('#admin-member-confirm-delete').trigger('click');
        expect(ajaxDelete).toHaveBeenCalledWith('user',jasmine.any(Object),jasmine.any(Function));     
        expect(showMemberPage).toHaveBeenCalled();  
        expect(reportDialog).toHaveBeenCalledWith('success','User Deletion',deleteRetValue.message); 
    });
    it("After click user delete confirm button -> call AJAX DELETE (fail) -> report error", function() {
        var deleteRetValue = {
            status : false,
            message : 'test msg'
        };
        spyOn(window, 'ajaxDelete').and.callFake(function(url, query, cb) {
            cb(deleteRetValue);
        });
        spyOn(window, 'showMemberPage').and.callFake(function() { });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        $('#admin-member-confirm-delete').trigger('click');
        expect(ajaxDelete).toHaveBeenCalledWith('user',jasmine.any(Object),jasmine.any(Function));     
        expect(showMemberPage).not.toHaveBeenCalled();  
        expect(reportDialog).toHaveBeenCalledWith('error','User Deletion',deleteRetValue.message); 
    });
    it("After click user reset confirm button -> call AJAX POST (Success) -> report success", function() {
        var postRetValue = {
            status : true,
            message : 'test msg'
        };
        spyOn(window, 'ajaxPost').and.callFake(function(url, query, cb) {
            cb(postRetValue);
        });

        spyOn(window, 'reportDialog').and.callFake(function() { });
        $('#admin-member-confirm-reset').trigger('click');
        expect(ajaxPost).toHaveBeenCalledWith('user/resetPass',jasmine.any(Object),jasmine.any(Function));     
        expect(reportDialog).toHaveBeenCalledWith('success','Password reset',postRetValue.message); 
    });
    it("After click user reset confirm button -> call AJAX POST (fail) -> report error", function() {
        var postRetValue = {
            status : false,
            message : 'test msg'
        };
        spyOn(window, 'ajaxPost').and.callFake(function(url, query, cb) {
            cb(postRetValue);
        });

        spyOn(window, 'reportDialog').and.callFake(function() { });
        $('#admin-member-confirm-reset').trigger('click');
        expect(ajaxPost).toHaveBeenCalledWith('user/resetPass',jasmine.any(Object),jasmine.any(Function));     
        expect(reportDialog).toHaveBeenCalledWith('error','Password reset',postRetValue.message); 
    });
    it("After click user signup button -> call AJAX POST (Success) -> report success", function() {
        var postRetValue = {
            status : true,
            message : 'test msg'
        };
        spyOn(window, 'ajaxPost').and.callFake(function(url, query, cb) {
            cb(postRetValue);
        });

        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'getFormData').and.callFake(function() { });
        spyOn(window, 'showMemberPage').and.callFake(function() { });
        $('#admin-member-signup-button').trigger('click');
        expect(showMemberPage).toHaveBeenCalled();   
        expect(ajaxPost).toHaveBeenCalledWith('signup',jasmine.any(Object),jasmine.any(Function));     
        expect(getFormData).toHaveBeenCalledWith('admin-member-signup-form',jasmine.any(Object));  
        expect(reportDialog).toHaveBeenCalledWith('success','Signup',postRetValue.message); 
    });
    it("After click user signup button -> call AJAX POST (fail) -> report error", function() {
        var postRetValue = {
            status : false,
            message : 'test msg'
        };
        spyOn(window, 'ajaxPost').and.callFake(function(url, query, cb) {
            cb(postRetValue);
        });

        spyOn(window, 'reportDialog').and.callFake(function() { });
        spyOn(window, 'getFormData').and.callFake(function() { });
        spyOn(window, 'showMemberPage').and.callFake(function() { });
        $('#admin-member-signup-button').trigger('click');
        expect(showMemberPage).not.toHaveBeenCalled();   
        expect(ajaxPost).toHaveBeenCalledWith('signup',jasmine.any(Object),jasmine.any(Function));     
        expect(getFormData).toHaveBeenCalledWith('admin-member-signup-form',jasmine.any(Object));  
        expect(reportDialog).toHaveBeenCalledWith('error','Signup',postRetValue.message); 
    });
    it("After click apply button at ADMIN MEMBER PAGE-> call AJAX POST (Success) -> report success", function() {
        var postRetValue = {
            status : true,
            message : 'test msg'
        };
        spyOn(window, 'ajaxPost').and.callFake(function(url, query, cb) {
            cb(postRetValue);
        });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        
        $('#admin-member-list > tbody:last-child').append('<tr></tr>');
        $('#admin-member-apply-button').trigger('click');

        expect(ajaxPost).toHaveBeenCalledWith('user/role',jasmine.any(Object),jasmine.any(Function));     
        expect(reportDialog).toHaveBeenCalledWith('success','User Role','User(s) have been successfully updated'); 
    });
    it("After click apply button at ADMIN MEMBER PAGE-> call AJAX POST (fail) -> report error", function() {
        var postRetValue = {
            status : false,
            message : 'test msg'
        };
        spyOn(window, 'ajaxPost').and.callFake(function(url, query, cb) {
            cb(postRetValue);
        });
        spyOn(window, 'reportDialog').and.callFake(function() { });
        
        $('#admin-member-list > tbody:last-child').append('<tr></tr>');
        $('#admin-member-apply-button').trigger('click');

        expect(ajaxPost).toHaveBeenCalledWith('user/role',jasmine.any(Object),jasmine.any(Function));     
        expect(reportDialog).toHaveBeenCalledWith('error','User Role',postRetValue.message); 
    });
});

