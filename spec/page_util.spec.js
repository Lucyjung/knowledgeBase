describe("Page Utility Testing Suite", function() {
    
    it("should not display any page", function() {
        displayPage('');
        expect($('#welcome-component').css("display")).toEqual('none');
        expect($('#vstg-component').css("display")).toEqual('none');
        expect($('#vstg-varinfo-table').css("display")).toEqual('none');
        expect($('#vstg-varinfo-casetable').css("display")).toEqual('none');
        expect($('#vstg-varinfo-vartable').css("display")).toEqual('none');
        expect($('#vstg-varadd-table').css("display")).toEqual('none');
        expect($('#vstg-varadd2-table').css("display")).toEqual('none');
        expect($('#kbs-home-component').css("display")).toEqual('none'); 
        expect($('#vstg-varedit-table').css("display")).toEqual('none');  
        expect($('#vstg-varedit2-table').css("display")).toEqual('none'); 
        expect($('#vstg-vardelete-table').css("display")).toEqual('none'); 
        expect($('#change-avatar-component').css("display")).toEqual('none'); 
        expect($('#change-pass-component').css("display")).toEqual('none'); 
        expect($('#welcome-footer-component').css("display")).toEqual('none');
        expect($('#vstg-approve-vartable').css("display")).toEqual('none');
        expect($('#vstg-varapprove-component').css("display")).toEqual('none');
        expect($('#vstg-main-component').css("display")).toEqual('none');
        expect($('#admin-component').css("display")).toEqual('none');
        expect($('#admin-member-component').css("display")).toEqual('none');
    });
    it("should display user page", function() {
        displayPage('user');
        expect($('#welcome-component').css("display")).not.toEqual('none');
        expect($('#welcome-footer-component').css("display")).not.toEqual('none');

        expect($('#change-avatar-component').css("display")).toEqual('none');
        expect($('#change-pass-component').css("display")).toEqual('none');
    });
    it("should display change avatar component", function() {
        displayPage('user-change-avatar');
        expect($('#welcome-component').css("display")).not.toEqual('none');
        expect($('#welcome-footer-component').css("display")).not.toEqual('none');

        expect($('#change-avatar-component').css("display")).not.toEqual('none');
        expect($('#change-pass-component').css("display")).toEqual('none');
    });
    it("should display change pass component", function() {
        displayPage('user-change-pass');
        expect($('#welcome-component').css("display")).not.toEqual('none');
        expect($('#welcome-footer-component').css("display")).not.toEqual('none');

        expect($('#change-avatar-component').css("display")).toEqual('none');
        expect($('#change-pass-component').css("display")).not.toEqual('none');
    });
    it("should display home component", function() {
        displayPage('home');
        expect($('#kbs-home-component').css("display")).not.toEqual('none');
    });
    it("should display admin component", function() {
        displayPage('admin');
        expect($('#admin-component').css("display")).not.toEqual('none');
        expect($('#admin-member-component').css("display")).toEqual('none');
    });
    it("should display admin member component", function() {
        displayPage('admin-member');
        expect($('#admin-component').css("display")).not.toEqual('none');
        expect($('#admin-member-component').css("display")).not.toEqual('none');
    });
    it("should display vstg component", function() {
        displayPage('vstg');
        expect($('#vstg-component').css("display")).not.toEqual('none');
        expect($('#vstg-varadd-table').css("display")).toEqual('none');
    });
    it("should display vstg add component", function() {
        displayPage('vstg-add');
        expect($('#vstg-component').css("display")).not.toEqual('none');
        expect($('#vstg-varadd-table').css("display")).not.toEqual('none');
        expect($('#vstg-varadd-table-varname').prop('readonly')).toBe(false);
        expect($('#vstg-varadd-add-type')).toHaveValue($('#local-type-new').html());

    });
    it("should display vstg add case component", function() {
        displayPage('vstg-add-case');
        expect($('#vstg-component').css("display")).not.toEqual('none');
        expect($('#vstg-varadd-table-varname').prop('readonly')).toBe(true);
        expect($('#vstg-varadd-add-type')).toHaveValue($('#local-type-add-case').html());
    });
    it("should display vstg edit value page", function() {
        displayPage('vstg-add2');
        expect($('#vstg-varadd2-table').css("display")).not.toEqual('none');

    });
    it("should display vstg search result page", function() {
        displayPage('vstg-info');
        expect($('#vstg-varinfo-table').css("display")).not.toEqual('none');
        expect($('#vstg-varinfo-casetable').css("display")).not.toEqual('none');
    });
    it("should display vstg detailed search result page", function() {
        displayPage('vstg-info2');
        expect($('#vstg-varinfo-table').css("display")).not.toEqual('none');
        expect($('#vstg-varinfo-vartable').css("display")).not.toEqual('none');
    });
    it("should display vstg edit page", function() {
        displayPage('vstg-edit');
        expect($('#vstg-varedit-table').css("display")).not.toEqual('none');
    });
    it("should display vstg detailed edit page", function() {
        displayPage('vstg-edit2');
        expect($('#vstg-varedit2-table').css("display")).not.toEqual('none');
    });
    it("should display vstg delete page", function() {
        displayPage('vstg-delete');
        expect($('#vstg-vardelete-table').css("display")).not.toEqual('none');
    });
    it("should display vstg approve page", function() {
        displayPage('vstg-approve');
        expect($('#vstg-approve-vartable').css("display")).not.toEqual('none');
    });

    it("should display vstg variable approve page", function() {
       displayPage('vstg-varapprove');
        expect($('#vstg-varapprove-component').css("display")).not.toEqual('none');
    });
    it("should display vstg main page", function() {
        spyOn(window, 'initTable').and.callFake(function() { });
        displayPage('vstg-main');
        expect($('#vstg-main-component').css("display")).not.toEqual('none');
    });

});
describe("Test Admin based Component", function() {
    beforeEach(function() {
      jasmine.Ajax.install();
      jasmine.Ajax.stubRequest('user/role').andReturn({
            responseText: JSON.stringify(user_role.admin)
         });
    });
    afterEach(function() {
        jasmine.Ajax.uninstall();
    });
    it("should show admin role based component", function() {
        showRoleBasedComponent();
        expect($('#vstg-delete-button').css("display")).not.toEqual('none');
        expect($('#vstg-approve-button').css("display")).not.toEqual('none');
        expect($('#nav-tab-admin').css("display")).not.toEqual('none');
    });
});
describe("Test User based Component", function() {
    beforeEach(function() {
      jasmine.Ajax.install();
      jasmine.Ajax.stubRequest('user/role').andReturn({
            responseText:  JSON.stringify(user_role.user)
         });
    });
    afterEach(function() {
        jasmine.Ajax.uninstall();
    });
    it("should show user role based component", function() {
        showRoleBasedComponent();
        expect($('#vstg-delete-button').css("display")).toEqual('none');
        expect($('#vstg-approve-button').css("display")).toEqual('none');
        expect($('#nav-tab-admin').css("display")).toEqual('none');
    });
});
