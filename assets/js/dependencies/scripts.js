var vstgTbl = '';
function login(){
    var loginData = {};
    getFormData('login-form',loginData);
    ajaxPost('login',loginData, function(data){
        if (data.status)
        {
            $('#user-avatar').attr('src', "users/"+data.img);
            $('#user-span').html(data.name);
            $('#nav-tab-vstg').show();
            showRoleBasedComponent();
            displayPage('user');
        }
        else
        {
            reportDialog('error','Login error',data.message);  
        }
    });
}
function logout(){
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
}

function addVariable(){

    checkRequiredField('#vstg-varadd2-table-value',function(status,msg){
        if (status)
        {
            var dataToAdd = {};
    
            getVariableData('varadd',dataToAdd, function(){
                if (dataToAdd.name != ""){
                    ajaxPost('variables',dataToAdd, function(data){
                        if (data.status){
                            reportDialog('success','Variable creation',data.message); 
                            displayPage('vstg-main');
                        }
                        else{
                            reportDialog('error','Variable creation',data.message); 
                        }
                    });
                }
                else
                {
                    reportDialog('warn','Variable not found','Variable name is required'); 
                }
            });
        }
        else
        {
            reportDialog('warn','Field is required',msg);
        }
    });
}
function editVariable(){

    checkRequiredField('#vstg-varedit2-table-value',function(status,msg){
        if (status)
        {
            var dataToAdd = {};
    
            getVariableData('varedit',dataToAdd, function(){
                dataToAdd['targetedCase'] = $('#vstg-varedit-casetable').find('input[name="optradio"]:checked').val();
		dataToAdd['case']['description'] = $('#vstg-varedit2-table-comment').val();
                dataToAdd['case']['ecmVar'] = document.getElementById('vstg-varedit2-ecm-var').checked;
                if (dataToAdd.name != ""){
                    ajaxPost('variables',dataToAdd, function(data){
                        if (data.status){
                            reportDialog('success','Variable modification',data.message); 
                            displayPage('vstg-main');
                        }
                        else{
                            reportDialog('error','Variable modification',data.message); 
                        }
                    });
                }
                else
                {
                    reportDialog('warn','Variable not found','Variable name is required'); 
                }
            });
        }
        else
        {
            reportDialog('warn','Field is required',msg);
        }
    });
}

function backFromAdd2(){
    displayPage('vstg-add');
};

function backFromEdit2(){
    displayPage('vstg-edit');
};

function backFromInfo2(){
    displayPage('vstg-info');
};

function clickToInfo2(){
    var case_info = $(this).data("info");
    var param = case_info.param;
    $('.tr-varinfo-detail').show();
    populateDataInfo('varinfo',case_info);
    $('#vstg-varinfo-vartable > tbody').children().each(function(){
        this.remove();
    });
    for (var param_name in param){
        var toAppend = '';
        var isKeyCheckedHtml = '';
        if (param[param_name].isKey == "true"){
            isKeyCheckedHtml = 'checked';
        }
        var isKeyHtml = '<td><input type="checkbox" name="isKey" disabled ' + isKeyCheckedHtml +  '></td>';
        if (param[param_name].type == 'RxM')
        {
            toAppend = '' +
            '<tr>' +
            '<td>' + param_name + '</td>' +
            isKeyHtml + 
            '<td>' + param[param_name].before + '</td>'+
            '<td>' + param[param_name].after + '</td>'+
            '</tr>';
            $('#vstg-varinfo-vartable > tbody:last-child').append(toAppend );
        }
        else{ // MAP
            if (param[param_name].begin !== undefined && param[param_name].end !== undefined){
                toAppend = '' +
                '<tr>' +
                '<td>' + param_name + '</td>' +
                isKeyHtml +
                '<td>' + param[param_name].begin + '</td>'+
                '<td>' + param[param_name].end + '</td>'+
                '</tr>';
                $('#vstg-varinfo-vartable > tbody:last-child').append(toAppend );
            }
            else
            {
                toAppend = '' +
                '<tr>' +
                '<td>' + param_name + '</td>' +
                isKeyHtml + 
                '<td>' + '</td>'+
                '<td>' + 
                '<a href="'+ 'csv/' +param[param_name].fileName+'" download="' +param_name +'.csv"' +'>' + 
                '<button type="submit" class="btn btn-default" >Export</button>' + '</td>'+
                '</a>' + 
                '</tr>';
                $('#vstg-varinfo-vartable > tbody:last-child').append(toAppend );
            }
            
        }
        
    }
    var backButtonId = "vstg-varinfo2-button-back";
        var toAddButton  = '<tr>' +
            '<td><button type="button" class="btn btn-default" id="' + backButtonId + '">Back</button></td>' + 
            '</tr>';
        $('#vstg-varinfo-vartable > tbody:last-child').append(toAddButton);

        document.getElementById(backButtonId).onclick = backFromInfo2;
    displayPage('vstg-info2');
}

function clickToVarApprove(){
    var case_info = $(this).data("info");
    var param = case_info.param;
    $('#vstg-varapprove-table-varname').val(case_info.name);
    $('#vstg-varapprove-table-comment').val(case_info.description);
    $('#vstg-varapprove-csv-button').attr('href', 'csv/' +case_info.setupFileName);
    $('#vstg-varapprove-csv-button').attr('download', 'csv/' +case_info.name+'.csv');
    populateDataInfo('varapprove',case_info);
    $('#vstg-varapprove-table-request').val(case_info.owner_name);
    
    $('#vstg-varapprove-vartable > tbody').children().each(function(){
        this.remove();
    });
    for (var param_name in param){
        var toAppend = '';
        var isKeyCheckedHtml = '';
        if (param[param_name].isKey == "true"){
            isKeyCheckedHtml = 'checked';
        }
        var isKeyHtml = '<td><input type="checkbox" name="isKey" disabled ' +isKeyCheckedHtml+ '></td>';
        if (param[param_name].type == 'RxM')
        {
            toAppend = '' +
            '<tr>' +
            '<td>' + param_name + '</td>' +
            isKeyHtml + 
            '<td>' + param[param_name].before + '</td>'+
            '<td>' + param[param_name].after + '</td>'+
            '</tr>';
            $('#vstg-varapprove-vartable > tbody:last-child').append(toAppend );
        }
        else{ // MAP
            if (param[param_name].begin !== undefined && param[param_name].end !== undefined){
                toAppend = '' +
                '<tr>' +
                '<td>' + param_name + '</td>' +
                isKeyHtml + 
                '<td>' + param[param_name].begin + '</td>'+
                '<td>' + param[param_name].end + '</td>'+
                '</tr>';
            }
            else{
                toAppend = '' +
                '<tr>' +
                '<td>' + param_name + '</td>' +
                isKeyHtml + 
                '<td>' + '</td>'+
                '<td>' + 
                '<a href="'+ 'csv/' +param[param_name].fileName+'" download="' +param_name +'.csv"' +'>' + 
                '<button type="submit" class="btn btn-default" >Export</button>' + '</td>'+
                '</a>' + 
                '</tr>';
            }
            
            
            $('#vstg-varapprove-vartable > tbody:last-child').append(toAppend );
        }
        
    }
    var approveButtonId = 'vstg-varapprove-table-approve';
    var rejectButtonId = 'vstg-varapprove-table-reject';
    var toAddButton  = '<tr>' +
              '<td><button type="button" class="btn btn-default" id="' + approveButtonId + '">Approve </button>' + 
              '<button type="button" class="btn btn-default" style="margin-left:10px;" id="' + rejectButtonId + '">Reject </button></td>' +
              '</tr>';
    $('#vstg-varapprove-vartable > tbody:last-child').append(toAddButton );
    $('#'+approveButtonId).data("case_id",case_info.id);
    $('#'+rejectButtonId).data("case_id",case_info.id);
    document.getElementById(approveButtonId).onclick = approveAction;
    document.getElementById(rejectButtonId).onclick = rejectAction;
    
    displayPage('vstg-varapprove');
}




function getVariableData(pageName, formData, callback){
    formData['name'] = $('#vstg-' + pageName + '-table-varname').val();
    formData['type'] = (pageName == 'varadd')?$('#vstg-varadd-add-type').val():'UPDATE-PARAM';
    formData['case'] = {};
    getFormData('vstg-' + pageName + '-table',formData['case']);
    if (pageName == 'varadd')
    {
        getTextAreaData('#vstg-' + pageName + '-table',formData['case']);
    }
    
    formData['case']['param'] = {};
    getParamSetupFileName(pageName,formData['case'],function(){
        
        var $set =   $('#vstg-' + pageName + '2-table-value > tbody  > tr');
        var $set_file = $set.find("input[type='file']");
        var len = $set_file.length;
        var completedCnt = 0;

        $set.each(function() {
            var paramName = $(this).data('value');

            formData['case']['param'][paramName] = {};
            getFormDataByObj(this,formData['case']['param'][paramName] );

        });
        if (len >= 1)
        {
            $set_file.each(function (index) {
                if (this.value == ''){
                    if($(this).data('fileName') == '')
                    {
                       reportDialog('error','File upload', 'File not found');  
                    }
                    else{
                        completedCnt++;
                        if (completedCnt == len){
                            callback();
                        }
                    }
                }
                else{
                    var formFile = new FormData();
                    formFile.append("csv", this.files[0]);
                    var name = $(this).attr('name');
                    ajaxUpload('file/upload',formFile,false, function(data){
                        if (data.status)
                        {
                            formData['case']['param'][name]['fileName'] = data.fileName;
                        }
                        else
                        {
                            callback(true);
                            reportDialog('error','File upload', data.message);    
                        }

                        completedCnt++;
                        if (completedCnt == len){
                            callback();
                        }
                    });
                }
            });
        }
        else{
            callback();
        }
        
    });
    
};
function getParamSetupFileName (pageName, caseData, callback)
{
    $('#vstg-' + pageName + '2-import-file').each(function(){
        if (this.value)
        {
            var formFile = new FormData();
            formFile.append("csv", this.files[0]);
            ajaxUpload('file/upload',formFile,false,function(data){
                if (data.status)
                {
                    caseData['setupFileName'] = data.fileName;
                    callback();
                }
                else
                {
                    callback(true);
                    reportDialog('error','File upload', data.message);    
                }
            });
        }
        else{
            callback();
        }
    });
}
function checkRequiredField (obj, callback)
{
    var isThereEmptyField = false;
    $(obj).find('input,textarea,select').filter('[required]').each(function () {
        if (this.value == '')
        {
            isThereEmptyField = true;
            callback(false, this.name + ' Field is required');
            
            return false;
        }
    }).promise()
    .done(function(){	
        if (isThereEmptyField == false){
            callback(true);
        }
        
    }); 
}
function checkMinMaxField ()
{
    var minVal = $('#vstg-varadd-table-minval').val();
    var maxVal = $('#vstg-varadd-table-maxval').val();
    if(Number(maxVal) < Number(minVal)){
        return false;
    }
    else{
        return true;
    }
}
function radioClickEvent ()
{
    var data = $(this).data("info");
    var pageName = $(this).data("pageName");
    populateDataInfo(pageName,data);
}
function populateHtmlForParamTable(isRxM,name,variable ){
    var populatedHtmlCode = '';
    var isKeyCheckedHtml = '';
    if (variable.isKey == "true"){
        isKeyCheckedHtml = 'checked';
    }
    var isKeyHtml = '<td><input type="checkbox" name="isKey" ' +isKeyCheckedHtml+ '></td>';
    if (isRxM==false)
    {
        if (variable.begin !== undefined && variable.end !== undefined){
            populatedHtmlCode = '' +
            '<tr class="clickable-row" data-value="' + name + '">' +
            '<td>' + name + 
            '<input type="hidden" class="form-control" name="type" value="MAP"' +
            '</td>' +
            isKeyHtml +
            '<td><input type="text" class="form-control" placeholder="Before" name="begin" value="'+variable.begin+'"  required>' + '</td>' +
            '<td><input type="text" class="form-control" placeholder="After" name="end" value="'+variable.end+'" required>' + '</td>' +
            '</tr>';
        }
        else{
            var htmlExportButton = '';
            if (variable.fileName){
                htmlExportButton = '<td><a href="'+ 'csv/' +variable.fileName+'" download="' +name +'.csv"' +'>' + 
                '<button type="submit" class="btn btn-default" >Export</button>' + '</td>'+
                '</a>'; 
            }
            populatedHtmlCode = '' +
              '<tr class="clickable-row" data-value="' + name + '">' +
              '<td>' + name + 
              '<input type="hidden" class="form-control" name="type" value="MAP"></td>' +
              isKeyHtml +
              htmlExportButton + 
              '<td><input type="file" name="' + name +'" data-fileName="'+variable.fileName +'">' + 
              '<input type="hidden" class="form-control" name="fileName" value="'+ variable.fileName +'"></td>' +
              '</td>' +
              '</tr>';
        }
    }    
    else
    {
        populatedHtmlCode = '' +
          '<tr class="clickable-row" data-value="' + name + '">' +
          '<td>' + name + 
          '<input type="hidden" class="form-control" name="type" value="RxM"' +
          '</td>' +
          isKeyHtml +
          '<td><input type="text" class="form-control" placeholder="Before" name="before" value="'+variable.before+'"  required>' + '</td>' +
          '<td><input type="text" class="form-control" placeholder="After" name="after" value="'+variable.after+'" required>' + '</td>' +
          '</tr>';
    }
    return populatedHtmlCode;
}
function decodeAndPopulateSetupFile(obj, pageName){
    var file = obj.files[0];
    var reader = new FileReader();
    reader.onload = function(progressEvent){
    // clear table
    $('#vstg-'+pageName+'2-table-value > tbody').children().each(function(){
      this.remove();
    });
    // Read file line by line
    var lines = this.result.split('\n');

    

    
    for(var line = 0; line < lines.length; line++){
        var variable_name = lines[line].trim();
        var toAppend = '';
        if(variable_name == "<CMD List>" || variable_name == ''){
            continue;
        }

        // validate input file 
        if (isVarName(variable_name) === false){
            reportDialog('error','Setup File','Invalid File'); 
            return;
        }
        var isKeyHtml = '<td><input type="checkbox" name="isKey"></td>';
        if (variable_name.substring(0,2) == 'K2' || variable_name.substring(0,2) == 'K3')
        {
            toAppend = '' +
              '<tr class="clickable-row" data-value="' + variable_name + '">' +
              '<td>' + variable_name + 
              '<input type="hidden" class="form-control" name="type" value="MAP"></td>' +
              isKeyHtml + 
              '<td><input type="text" class="form-control" placeholder="Begin value" name="begin" required>' + '</td>' +
              '<td><input type="text" class="form-control" placeholder="End value" name="end" required>' + '</td>' +
              '</tr>';
        }
        else
        {
          toAppend = '' +
              '<tr class="clickable-row" data-value="' + variable_name + '">' +
              '<td>' + variable_name + 
              '<input type="hidden" class="form-control" name="type" value="RxM"' +
              '</td>' +
              isKeyHtml + 
              '<td><input type="text" class="form-control" placeholder="Before" name="before" required>' + '</td>' +
              '<td><input type="text" class="form-control" placeholder="After" name="after" required>' + '</td>' +
              '</tr>';
        }
        if(toAppend != '')
        {
          $('#vstg-'+pageName+'2-table-value > tbody:last-child').append(toAppend );
        }
    }
    var addButtonId = 'vstg-'+pageName+'2-table-add';
    var backButtonId = (pageName=='varadd')?'vstg-'+pageName+'2-table-back':'';
    var htmlBackButton = (pageName=='varadd')?'<button type="button" class="btn btn-default" id="' + backButtonId + '">Back</button>':'';
    var toAddButton  = '<tr><td>' +
              '<button type="button" class="btn btn-default" id="' + addButtonId + '">Submit</button>' + 
               htmlBackButton + 
              '</td></tr>';
    $('#vstg-'+pageName+'2-table-value > tbody:last-child').append(toAddButton);

    if (pageName=='varadd'){
        document.getElementById(addButtonId).onclick = addVariable;
        document.getElementById(backButtonId).onclick = backFromAdd2;
    }
    else{
        document.getElementById(addButtonId).onclick = editVariable;
    }
      
    };
    reader.readAsText(file);
}
function populateDataForEditDelete(pageName){
    var query_data = {
        name : $('#vstg-search-box').val()
    };
    ajaxGet('variables',query_data,function(data){
        if (data.status)
        {
            $('#vstg-'+pageName+'-table-varname').val(data.variable.name);
            populateDataInfo(pageName,data.variable.case[0]);
            $('#vstg-'+pageName+'-casetable > tbody').children().each(function(){
                this.remove();
            });
            for (var case_index in data.variable.case)
            {
                var case_no = Number(case_index) + 1;
                var checkedHtml =  case_index==0?' checked="checked"':'';
                var toAppend = '' +
                '<tr>' +
                '<td>' + case_no + '</td>' +
                '<td colspan="5" class="td_whitespace">' + data.variable.case[case_index].description + '</td>'+
                '<td colspan="1">' + data.variable.case[case_index].softVersion + '</td>'+
                '<td colspan="1">' + data.variable.case[case_index].owner_name + '</td>'+
                '<td colspan="1"><div class="radio">' + 
                '<label><input type="radio" name="optradio" value="' +data.variable.case[case_index].id + '"' +checkedHtml +
                ' id=vstg-'+pageName+'-casetable-radio'+case_index + '>' + 
                '</label>' + '</div></td>'+
                '</tr>';
                $('#vstg-'+pageName+'-casetable > tbody:last-child').append(toAppend);
                $('#vstg-'+pageName+'-casetable-radio'+case_index).data("info",data.variable.case[case_index]);
                $('#vstg-'+pageName+'-casetable-radio'+case_index).data("pageName",pageName);
                document.getElementById('vstg-'+pageName+'-casetable-radio'+case_index).onclick = radioClickEvent;
            }
            if (pageName == 'varedit')
            {
                displayPage('vstg-edit');
            }
            else if (pageName == 'vardelete'){
                displayPage('vstg-delete');
            }
        }
        else{
            reportDialog('error','Variable search',data.message); 
        }
    });
}

function populateVariableInfo(){
    var query_data = {
        name : $('#vstg-search-box').val()
    };
    ajaxGet('variables',query_data,function(data){
        if (data.status)
        {
            if (data.variable.case.length > 0){
                $('#vstg-varinfo-table-varname').val(data.variable.name);
                $('.tr-varinfo-detail').hide();
                populateDataInfo('varinfo',data.variable.case[0]);
                $('#vstg-varinfo-casetable > tbody').children().each(function(){
                    this.remove();
                });
                for (var case_index in data.variable.case)
                {
                    var case_no = Number(case_index) + 1;
                    var csvDetialBtnHtml = '<td>No CSV file</td>';
                    if (data.variable.case[case_index].ecmVar === undefined || data.variable.case[case_index].ecmVar === false )
                    {
                        csvDetialBtnHtml = '<td>' + 
                        '<a href="'+ 'csv/' +data.variable.case[case_index].setupFileName+'" download="' +data.variable.name + '_case' + case_no + '.csv">' + 
                        '<button type="submit" class="btn btn-default" id="' + 'vstg-varinfo-casetable-csv-button' + case_index +'">CSV</button>' + '</a>'+
                        '</td>' + 
                        '<td>' + '<button type="button" class="btn btn-default" id="' + 'vstg-varinfo-casetable-var-button' + case_index +'">Value Setup</button>' + '</td>'; 
                        
                    }
                    
            
                    var toAppend = '' +
                    '<tr>' +
                    '<td>' + case_no + '</td>' +
                    '<td colspan="4" class="td_whitespace">' + data.variable.case[case_index].description + '</td>'+
                    '<td>' + data.variable.case[case_index].softVersion + '</td>'+
                    '<td>' + data.variable.case[case_index].owner_name + '</td>'+
                    csvDetialBtnHtml +
                    
                    '</tr>';
                    $('#vstg-varinfo-casetable > tbody:last-child').append(toAppend );
                    $('#vstg-varinfo-casetable-var-button'+case_index).data("info",data.variable.case[case_index]);
                    if (data.variable.case[case_index].ecmVar === undefined || data.variable.case[case_index].ecmVar === false )
                    {
                        document.getElementById('vstg-varinfo-casetable-var-button'+case_index).onclick = clickToInfo2;
                    }
                }
                displayPage('vstg-info');
            }else{
                reportDialog('error','Variable search','There is no case for this variable. You may need to check with Admin'); 
            }
            
        }
        else{
            reportDialog('error','Variable search',data.message); 
        }
    });
}
function populateDataInfo(pageName, data){
    $('#vstg-'+pageName+'-table-maxval').val(data.maxValue);
    $('#vstg-'+pageName+'-table-minval').val(data.minValue);
    $('#vstg-'+pageName+'-table-elevel').val(data.eLevel);
    $('#vstg-'+pageName+'-table-softver').val(data.softVersion);
    $('#vstg-'+pageName+'-table-ddver').val(data.ddVersion);    
}
function approveAction(){
    var postData = {
        case_id : $(this).data("case_id")
    }
    ajaxPost('variables/approve',postData, function(data){
        if (data.status){
            reportDialog('success','Variable approval',data.message); 
            displayPage('vstg-main'); 
        }
        else{
            reportDialog('error','Variable approval',data.message); 
        }
        updateApproveBadge();
    });
}
function rejectAction(){
    var postData = {
        case_id : $(this).data("case_id")
    }
    ajaxPost('variables/reject',postData, function(data){
        if (data.status){
            reportDialog('success','Variable creation',data.message); 
            displayPage('vstg-main');
        }
        else{
            reportDialog('error','Variable creation',data.message); 
        }
        updateApproveBadge();
    });  
}
function updateApproveBadge(){
    ajaxGet('variables/unApprove',{},function(data){
        if (data.case.length > 0 )
        {
            $('#vstg-approve-badge').show();
            $('#vstg-approve-badge').html(data.case.length);
        }
        else{
            $('#vstg-approve-badge').hide();
        }
        
    });
}
function showMemberPage ()
{
    ajaxGet('user',{},function(data){
        if (data.status){
            $('#admin-member-list > tbody').children().each(function(){
                this.remove();
            });
            for (var index in data.users_list)
            {
                var user_no = Number(index) + 1;
                var userRoleHtml = data.users_list[index].role == $('#local-role-user').html()?'selected':'';
                var adminRoleHtml =data.users_list[index].role == $('#local-role-admin').html()?'selected':'';
                var toAppend = '' +
                '<tr data-id="' + data.users_list[index].id + '">' +
                '<td>' + user_no + '</td>' +
                '<td>' + data.users_list[index].username + '</td>'+
                '<td>' + data.users_list[index].name + '</td>'+
                '<td><select onchange="memberRoleChange()">' + 
                '<option name=role value="'+ $('#local-role-user').html() + '" '+ userRoleHtml + '>User</option>' +
                '<option name=role  value="'+ $('#local-role-admin').html() + '" '+ adminRoleHtml + '>Administrator</option>' +
                '</select></td>' + 
                '<td>' + 
                '<a id="user-delete-button' + index + '" href="#DeleteUser_Modal" role="button" class="btn_TTT" data-toggle="modal">Delete</a>' +
                '</td>'+
                '<td>' + 
                '<a id="user-reset-button' + index + '" href="#ResetPass_Modal" role="button" class="btn_TTT" data-toggle="modal">Reset</a>' +
                '</td>'+
                '</tr>';
                $('#admin-member-list > tbody:last-child').append(toAppend );
                
                $('#user-delete-button'+index).data("user_id",data.users_list[index].id);
                $('#user-reset-button'+index).data("user_id",data.users_list[index].id);
                
                document.getElementById('user-delete-button'+index).onclick = clickToDeleteUser;
                document.getElementById('user-reset-button'+index).onclick = clickToResetPass;
                displayPage('admin-member');
            }
        }
        else{
            reportDialog('error','Member List',data.message);
        }
        
    });
}
function clickToDeleteUser(){
    $('#admin-member-confirm-delete').data("user_id",$(this).data("user_id"));
}
function clickToResetPass(){
    $('#admin-member-confirm-reset').data("user_id",$(this).data("user_id"));
}
function memberRoleChange(){
    $('#admin-member-apply-button').prop("disabled", false);
}
function checkSearchValue(){
    if ($('#vstg-search-box').val() == ''){
        reportDialog('error','Search box','Search Value is empty');
        return false;
    }
    return true;
}
function clickFromTable(elmnt){
    $('#vstg-search-box').val($(elmnt).text());
    populateVariableInfo();
}
function initTable(){
	if (vstgTbl == ''){
        vstgTbl = $('#vstg-main-table').DataTable({
            ajax: {
                url : "/variables/findAll"
            },
            "aoColumnDefs": [ {
                "aTargets": [0],
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                        $(nTd).html('<a href="javascript:void(0);"\><p onclick="clickFromTable(this)">'+sData+ '</p> </a>'); 
                }
              } ],
            dom: 'Alfrtip',
            alphabetSearch: {
               column: 0 
            },
            "destroy": true,
            language: {
                "search": "Filter:"
            }
	   });
	}
        else{
            vstgTbl.ajax.reload();
        }
	
}
function isVarName(str) {

  if (typeof str !== 'string') {
    return false;
  }
  var patt = new RegExp(",");
  if(patt.test(str)){
      return false;
  }
  try {
    new Function('var ' + str)();
  } catch (e) {
    return false;
  }
  return true;
};
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function clearSetupFile(obj, pageName){
    obj.value = ''
    $('#vstg-'+pageName+'2-table-value > tbody').children().each(function(){
      this.remove();
    });
}
function clearVstgAddField(){
    $('#vstg-varadd-table-varname').val('');
    $('#vstg-varadd-table-minval').val('');
    $('#vstg-varadd-table-maxval').val('');
    $('#vstg-varadd-table-elevel').val('');
    $('#vstg-varadd-table-softver').val('');
    $('#vstg-varadd-table-ddver').val('');
    $('#vstg-varadd-table-comment').val('');
    $('#vstg-varadd2-table-varname').val('');
    $('#vstg-varadd2-import-file').val('');
    $('#vstg-varadd-table-comment').val('');
    $('#vstg-varadd2-table-value > tbody').children().each(function(){
      this.remove();
    });
    $('#vstg-varadd-ecm-var').attr('checked', false); // Unchecks it
    
}
function toogleHighlightTbl(obj){
    $(obj).addClass('info').siblings().removeClass('info');
}