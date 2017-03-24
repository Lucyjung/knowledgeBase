// General function

function getTextAreaData(obj, formData){
    $(obj).find('textarea').each(function () {
        var name = $(this).attr('name');
        if (name != undefined){
          formData[name] = $(this).val();
        }
    });
};
function getFormData(idName, formData){
    var obj = '#' + idName;
    getFormDataByObj(obj,formData);
};
function getFormDataByObj(obj, formData){
  $(obj).find("input[type='text']").each(function () {
    var name = $(this).attr('name');
    if (name != undefined){
      formData[name] = $(this).val();
    }
  });
  
  $(obj).find("input[type='number']").each(function () {
    var name = $(this).attr('name');
    if (name != undefined){
      formData[name] = $(this).val();
    }
  });

  $(obj).find("input[type='hidden']").each(function () {
    var name = $(this).attr('name');
    if (name != undefined){
      formData[name] = $(this).val();
    }
  });
  
  $(obj).find("input[type='password']").each(function () {
    var name = $(this).attr('name');
    if (name != undefined){
      formData[name] = $(this).val();
    }
  });
  
  $(obj).find(":selected").each(function () {
    var name = $(this).attr('name');
    if (name != undefined){
      formData[name] = $(this).val();
    }
  });
  
};
