describe("Form Utility Test Suite", function() {
    var testFormID = 'test-form';
    var testFormSelector = '#' + testFormID;
    var testNumVal = '1234';
    beforeEach(function() {
       
        $(testFormSelector).find("input[type='text']").each(function () {
            $(this).val($(this).attr('name'));
        });
        $(testFormSelector).find("input[type='number']").each(function () {
            $(this).val(testNumVal);
        });
        $(testFormSelector).find("input[type='hidden']").each(function () {
            $(this).val($(this).attr('name'));
        });
        $(testFormSelector).find("input[type='password']").each(function () {
            $(this).val($(this).attr('name'));
        });
        $(testFormSelector).find(":selected").each(function () {
            $(this).val($(this).attr('name'));
        });
        $(testFormSelector).find('textarea').each(function () {
            $(this).val($(this).attr('name'));
        });
    });
    afterEach(function() {
        $(testFormSelector).find("input[type='text']").each(function () {
            $(this).val('');
        });
        $(testFormSelector).find("input[type='number']").each(function () {
            $(this).val('');
        });
        $(testFormSelector).find("input[type='hidden']").each(function () {
            $(this).val('');
        });
        $(testFormSelector).find("input[type='password']").each(function () {
            $(this).val('');
        });
        $(testFormSelector).find(":selected").each(function () {
            $(this).val('');
        });
        $(testFormSelector).find('textarea').each(function () {
            $(this).val('');
        });
    });
    it("Should call function to get form data by Object", function() {
        spyOn(window, 'getFormDataByObj').and.callThrough();
        var formData = {};
        getFormData(testFormID,formData);
        expect(getFormDataByObj).toHaveBeenCalled();
    });
    it("Should correctly get form data from input form", function() {
        var formData = {};
        getFormDataByObj(testFormSelector,formData);
        getTextAreaData(testFormSelector,formData);
        expect(formData.form_text).toEqual('form_text');
        expect(formData.form_number).toEqual(testNumVal);
        expect(formData.form_hidden).toEqual('form_hidden');
        expect(formData.form_pass).toEqual('form_pass');
        expect(formData.form_option1).toEqual('form_option1');
        expect(formData.form_textarea).toEqual('form_textarea');
    });
});