$('#login-button').on("click",function(){
    login();
});

$('#vstg-tab').on("click",function(){
    updateApproveBadge();
    displayPage('vstg');
});

$('#admin-tab').on("click",function(){
    showMemberPage();
});

$('#home-tab').on("click",function(){
    if ($('#user-span').html() != undefined && $('#user-span').html() != ''){
        displayPage('user');
    }
    else{
        displayPage('home');
    }
    
});

$('#vstg-add-button').on("click",function(){
    displayPage('vstg-add');
});

$('#vstg-edit-button').on("click",function(){
    if (checkSearchValue()){
        populateDataForEditDelete('varedit');
    }
});

$('#vstg-delete-button').on("click",function(){
    if (checkSearchValue()){
        populateDataForEditDelete('vardelete'); 
    }
    
});

$('#vstg-varadd-table-add').on("click",function(){
    if (checkMinMaxField() == false){
        reportDialog('error','Value is invalid','Min value greater than Max value');
        return false;
    }
    checkRequiredField('#vstg-varadd-table',function(status,msg){
        if(status == false){
            reportDialog('warn','Field is required',msg);
        }
        else{
            displayPage('vstg-add2');
        }
    });
});

$('#vstg-varadd-table-varname').on("input",function(){
    $('#vstg-varadd2-table-varname').val(this.value);
});

$('#vstg-varadd-table-import').on("change",function(){

    var formData = new FormData();
    var fileName = this.value;
    var varName = $('#vstg-varadd-table-varname').val();
    if(varName == "")
    {
        this.value = "";
        reportDialog('warn','Variable name is empty',
        'Please input variable name properly');
    }
    else{
        fileName = fileName.replace(/.*[\/\\]/, ''); // clean up file name  
        fileName = fileName.replace(/\.[^/.]+$/, ""); // no extension
        formData.append("name", varName);
        formData.append("xls", this.files[0]);
        
        ajaxUpload('xls',formData,true, function(data){
            if (data.status)
            {
                $('#vstg-varadd-table-maxval').val(data.message.maxValue);
                $('#vstg-varadd-table-minval').val(data.message.minValue);
                $('#vstg-varadd-table-elevel').val(data.message.eLevelValue);
                $('#vstg-varadd-table-ddver').val(fileName);
            }
            else
            {
                $('#vstg-varadd-table-import').value = "";
                reportDialog('warn','Variable not found',data.message); 
            }
            
        });
        this.value = "";
    }
    
});

$('#vstg-varadd2-import-file').on("change",function(){
    decodeAndPopulateSetupFile(this,'varadd');
});

$('#vstg-varedit2-import-file').on("change",function(){
    decodeAndPopulateSetupFile(this,'varedit');
});
$('#vstg-search-button').on("click",function(){
    if (checkSearchValue()){
        populateVariableInfo();
    }
});
$("#vstg-search-box").on('keyup', function (e) {
    if (e.keyCode == 13) {
        if (checkSearchValue()){
            populateVariableInfo();
        }
    }
});

$('#vstg-varedit-addcase-button').on("click",function(){
    var name = $('#vstg-varedit-table-varname').val();
    $('#vstg-varadd-table-varname').val(name);
    $('#vstg-varadd2-table-varname').val(name);
    displayPage('vstg-add-case');
});

$('#vstg-varedit-editvalue-button').on("click",function(){
    var name = $('#vstg-varedit-table-varname').val();
    $('#vstg-varedit2-table-varname').val(name);
    $('#vstg-varedit-casetable').find('input[name="optradio"]:checked').each(function(){
        $('#vstg-varedit2-import-fileName').val($(this).data("info").setupFileName);
        $('#vstg-varedit2-table-value > tbody').children().each(function(){
            this.remove();
        });
        var param = $(this).data("info").param;
        for (var param_name in param){
            var toAppend = '';
            if (param[param_name].type == 'RxM')
            {
                toAppend = populateHtmlForParamTable(true,param_name,param[param_name]);
            }
            else{ // MAP
                toAppend = populateHtmlForParamTable(false,param_name,param[param_name]);
            }
            $('#vstg-varedit2-table-value > tbody:last-child').append(toAppend );
        }
        var addButtonId = "vstg-varedit2-table-add";
        var toAddButton  = '<tr><td>' +
            '<button type="button" class="btn btn-default" id="' + addButtonId + '">Submit</button>' + 
            '</td></tr>';
        $('#vstg-varedit2-table-value > tbody:last-child').append(toAddButton);

        document.getElementById(addButtonId).onclick = editVariable;
    });
    displayPage('vstg-edit2');
});

$('#vstg-varedit-submit-button').on("click",function(){
    var formData = {};
    formData['case'] = {};
    formData['name'] = $('#vstg-varedit-table-varname').val();
    formData['type'] = $('#local-type-update-param').html();
    getFormData('vstg-varedit-table',formData['case']);
    var $selectedRadio = $('#vstg-varedit-casetable').find('input[name="optradio"]:checked');
    formData['case'] = $selectedRadio.data("info");
    formData['basedCase'] =  $selectedRadio.val();
    ajaxPost('variables',formData, function(data){
        if (data.status){
            reportDialog('success','Variable creation',data.message); 
            // TODO: clean up
            displayPage('vstg');
        }
        else{
            reportDialog('error','Variable creation',data.message); 
        }
    });    
});

$('#vstg-vardelete-case-button').on("click",function(){
    var formData = {};
    formData['name'] = $('#vstg-vardelete-table-varname').val();
    formData['type'] = $('#local-type-delete').html();
    var $selectedRadio = $('#vstg-vardelete-casetable').find('input[name="optradio"]:checked');
    formData['targetedCase'] =  $selectedRadio.val();
    formData['case'] =  $selectedRadio.data("info");
    ajaxPost('variables',formData, function(data){
        if (data.status){
            reportDialog('success','Variable Deletion',data.message); 
            // TODO: clean up
            displayPage('vstg');
        }
        else{
            reportDialog('error','Variable Deletion',data.message); 
        }
    });    
});

$('#vstg-vardelete-all-button').on("click",function(){
    var formData = {};
    formData['name'] = $('#vstg-vardelete-table-varname').val();
    ajaxDelete('variables',formData, function(data){
        if (data.status){
            reportDialog('success','Variable Deletion',data.message); 
            // TODO: clean up
            displayPage('vstg');
        }
        else{
            reportDialog('error','Variable Deletion',data.message); 
        }
    });    
});

$('#user-change-avatar-button').on("click",function(){
    displayPage('user-change-avatar');   
});

$('#user-change-avatar-confirm-button').on("click",function(){
    $("#imgInp").each(function(){
        var formFile = new FormData();
        formFile.append("avatar", this.files[0]);
        ajaxUpload('avatar',formFile,false, function(data){
            if (data.status)
            {
                reportDialog('success','Avatar upload', data.message); 
                displayPage('user'); 
            }
            else
            {
                reportDialog('error','Avatar upload', data.message);    
            }
        }); 
    });
    
});

$('#user-change-pass-button').on("click",function(){
    displayPage('user-change-pass');   
});

$('#user-change-pass-confirm').on("click",function(){
    var passData = {};
    getFormData('change-pass-component',passData);
    var newPass = $('#user-new-pass').val();
    var confirmNewPass = $('#user-confirm-pass').val();
    if (newPass === confirmNewPass)
    {
        ajaxPost('changePass',passData, function(data){
            if (data.status)
            {
                reportDialog('success','Change password',data.message);  
                displayPage('user');
            }
            else
            {
                reportDialog('error','Change password',data.message);  
            }
        });
    }
    else{
        reportDialog('error','Change password','Passwords are not matched');  
    }
    
});

$('#user-logout-button').on("click",function(){
    var formData = {};
    ajaxPost('logout',formData, function(data){
        if (data.status){
            reportDialog('success','Logout',data.message); 
            $('#nav-tab-vstg').hide();
            $('#nav-tab-admin').hide();
            $('#user-span').html('');
            displayPage('home'); 
        }
        else{
            reportDialog('error','Logout',data.message); 
        }
    }); 
      
});

$('#vstg-approve-button').on("click",function(){
    ajaxGet('variables/unApprove',{},function(data){
        if (data.status)
        {
            $('#vstg-approve-vartable > tbody').children().each(function(){
                this.remove();
            });
            for (var case_index in data.case)
            {
                var case_no = Number(case_index) + 1;
                var toAppend = '' +
                '<tr>' +
                '<td>' + case_no + '</td>' +
                '<td>' + data.case[case_index].name + '</td>'+
                '<td>' + data.case[case_index].description + '</td>'+
                '<td>' + 
                '<a href="'+ 'csv/' +data.case[case_index].setupFileName+'" download="' +data.case[case_index].name + '_case' + case_no + '.csv">' + 
                '<button type="submit" class="btn btn-default" id="' + 'vstg-approve-casetable-csv-button' + case_index +'">CSV</button>' + 
                '</a>' + '</td>'+
                '<td>' + '<button type="button" class="btn btn-default" id="' + 'vstg-approve-casetable-var-button' + case_index +'">Value Setup</button>' + '</td>'+
                '</tr>';
                $('#vstg-approve-vartable > tbody:last-child').append(toAppend);
                $('#vstg-approve-casetable-var-button'+case_index).data("info",data.case[case_index]);
                document.getElementById('vstg-approve-casetable-var-button'+case_index).onclick = clickToVarApprove;
            }
            displayPage('vstg-approve');
        }
        else{
            reportDialog('error','Variable search',data.message); 
        }
    });
});

$(document).ready( function() {
    $(document).on('change', '.btn-file :file', function() {
        var input = $(this),
                label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function(event, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = label;

        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }

    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#user-avatar').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function(){
        readURL(this);
    }); 	
});
     
$('#admin-member-confirm-delete').on("click",function(){
    
    var formData = {};
    formData['id'] = $(this).data("user_id");
    ajaxDelete('user',formData, function(data){
        if (data.status){
            $('#DeleteUser_Modal').modal('hide');
            showMemberPage();
            reportDialog('success','User Deletion',data.message); 
        }
        else{
            reportDialog('error','User Deletion',data.message); 
        }
    });  
});

$('#admin-member-confirm-reset').on("click",function(){
    var formData = {};
    formData['id'] = $(this).data("user_id");
    ajaxPost('user/resetPass',formData, function(data){
        if (data.status){
            $('#ResetPass_Modal').modal('hide');
            reportDialog('success','Password reset',data.message); 
        }
        else{
            reportDialog('error','Password reset',data.message); 
        }
    });    
});

$('#admin-member-signup-button').on("click",function(){
    var formData = {};
    getFormData('admin-member-signup-form',formData);
    ajaxPost('signup',formData, function(data){
        if (data.status){
            $('#AddUser_Modal').modal('hide');
            showMemberPage();
            reportDialog('success','Signup',data.message); 
        }
        else{
            reportDialog('error','Signup',data.message); 
        }
    });    
});

$('#admin-member-apply-button').on("click",function(){
    var id_list = [];
    var role_list = [];
    var $tr = $('#admin-member-list > tbody').children();
    var len = $tr.length;
    var completedCnt = 0;
    $tr.each(function(){
        var formData = {
            id : $(this).data("id"),
            role : $(this).find(":selected").val()
        };
        ajaxPost('user/role',formData, function(data){
            if (data.status){
                completedCnt++;
                if (completedCnt == len){
                    reportDialog('success','User Role','User(s) have been successfully updated'); 
                }
            }
            else{
                reportDialog('error','User Role',data.message); 
                return false;
            }
        }); 
    });  
     
});

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var target = $(e.target).attr("href"); // activated tab
});
