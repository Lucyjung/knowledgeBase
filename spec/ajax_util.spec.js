describe("AJAX Test Suite", function() {
    beforeEach(function() {
      jasmine.Ajax.install();
      jasmine.Ajax.stubRequest('ajaxGet').andReturn({
            responseText:  JSON.stringify(test_ajax.get)
         });
      jasmine.Ajax.stubRequest('ajaxPost').andReturn({
            responseText:  JSON.stringify(test_ajax.post)
         });
      jasmine.Ajax.stubRequest('ajaxDelete').andReturn({
            responseText:  JSON.stringify(test_ajax.delete)
         });
      jasmine.Ajax.stubRequest('ajaxUpload').andReturn({
            responseText:  JSON.stringify(test_ajax.upload)
         });
    });
    afterEach(function() {
        jasmine.Ajax.uninstall();
    });
    it("Should AJAX GET and get proper data", function() {
        ajaxGet('ajaxGet',{},function(data){
            expect(data).toEqual(test_ajax.get);
        });
    });
    it("Should AJAX POST and get proper data", function() {
        ajaxPost('ajaxPost',{},function(data){
            expect(data).toEqual(test_ajax.post);
        });
    });
    it("Should AJAX DELETE and get proper data", function() {
        ajaxDelete('ajaxDelete',{},function(data){
            expect(data).toEqual(test_ajax.delete);
        });
    });
    it("Should get AJAX UPLOAD and get proper data", function() {
        ajaxUpload('ajaxUpload',{},false,function(data){
            expect(data).toEqual(test_ajax.upload);
        });
    });
});