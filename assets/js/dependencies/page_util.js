function displayPage(page){
    
    // start with hide all module
    $('#welcome-component').hide();
    $('#vstg-component').hide();
    $('#vstg-varinfo-table').hide();
    $('#vstg-varinfo-casetable').hide();
    $('#vstg-varinfo-vartable').hide();
    $('#vstg-varadd-table').hide();
    $('#vstg-varadd2-table').hide();
    $('#kbs-home-component').hide(); 
    $('#vstg-varedit-table').hide();  
    $('#vstg-varedit2-table').hide(); 
    $('#vstg-vardelete-table').hide(); 
    $('#change-avatar-component').hide(); 
    $('#change-pass-component').hide(); 
    $('#welcome-footer-component').hide();
    $('#vstg-approve-vartable').hide();
    $('#vstg-varapprove-component').hide();
    $('#vstg-main-component').hide();
    $('#admin-component').hide();
    $('#admin-member-component').hide();
    
    if(page.substring(0,4) == 'user')
    {
        $('#welcome-component').show();
        $('#welcome-footer-component').show();
        if (page == 'user-change-avatar')
        {
            $('#change-avatar-component').show(); 
        }
        else if (page == 'user-change-pass')
        {
            $('#change-pass-component').show(); 
        }
    }
    else if (page == 'home')
    {
        $('#kbs-home-component').show(); 
    }
    else if (page.substring(0,5) == 'admin')
    {
        $('#admin-component').show();
        if (page == 'admin-member'){
             $('#admin-member-component').show();
        }
    }
    else if(page.substring(0,4) == 'vstg')
    {
        $('#vstg-component').show();
        if (page == 'vstg-add' || page =='vstg-add-case')
        {
            if(page == 'vstg-add-case'){
                $('#vstg-varadd-table-varname').prop('readonly', true);
                $('#vstg-varadd-table-back').show();
                $('#vstg-varadd-add-type').val($('#local-type-add-case').html());
            }
            else{
                $('#vstg-varadd-table-back').hide();
                $('#vstg-varadd-table-varname').prop('readonly', false);
                $('#vstg-varadd-add-type').val($('#local-type-new').html());
            }
            $('#vstg-varadd-table').show();
        }
         else if (page == 'vstg-add2')
        {
            $('#vstg-varadd2-table').show();
        }
        else if (page == 'vstg-info')
        {
            $('#vstg-varinfo-table').show();
            $('#vstg-varinfo-casetable').show();
        }
        else if (page == 'vstg-info2')
        {
            $('#vstg-varinfo-table').show();
            $('#vstg-varinfo-vartable').show();
        }
        else if (page == 'vstg-edit'){
            $('#vstg-varedit-table').show();  

        }
        else if (page == 'vstg-edit2'){
            $('#vstg-varedit2-table').show();  

        }
        else if (page == 'vstg-delete'){
            $('#vstg-vardelete-table').show();  
        }
        else if (page == 'vstg-approve'){
            $('#vstg-approve-vartable').show();  
        }
        else if (page == 'vstg-varapprove'){
            $('#vstg-varapprove-component').show();
        }
        else if (page == 'vstg-main'){
            initTable();
            $('#vstg-main-component').show();
        }
    }
    
};
function reportDialog(type, title, msg){
    
    var dialogType = BootstrapDialog.TYPE_SUCCESS;
    if (type == 'warn'){
        dialogType = BootstrapDialog.TYPE_WARNING;
    }
    else if (type == 'error'){
        dialogType = BootstrapDialog.TYPE_DANGER;
    }

    BootstrapDialog.show({
          type: dialogType,
          title: title,
          message: msg,
          buttons: [{
              label: 'OK',
              action: function(dialogItself){
              dialogItself.close();
              }
          }]
        }); 
};
function showRoleBasedComponent(){
    var adminComponent_ids = [
        'vstg-delete-button',
        'vstg-approve-button',
        'nav-tab-admin'
    ];
    var isAdmin = false;
    ajaxGet('user/role',{},function(data){
        if (data.status && data.role == $('#local-role-admin').html())
        {
           isAdmin = true
        }
        $.each( adminComponent_ids, function( index, value ){
            if (isAdmin){
                $('#'+value).show();
            }
            else{
                $('#'+value).hide();
            }
        });
    }); 
};


