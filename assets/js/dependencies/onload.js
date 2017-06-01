function initialization(){
    if (getCookie('user') != ''){
        ajaxGet('user/data',{},function(data){
            if (data.status)
            {
                $('#user-avatar').attr('src', "users/"+data.img);
                $('#user-span').html(data.name);
                $('#nav-tab-vstg').show();
                showRoleBasedComponent();
                displayPage('user');
            }
            else{
                displayPage('home');
            }
        });
    }
    else{
        displayPage('home');
    }
}
window.onload = initialization;

