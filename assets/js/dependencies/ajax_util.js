// General function

function ajaxGet(url, query_data, callback){
  var url_param = url;
  if (Object.keys(query_data).length > 0){
      url_param = url + '?';
      for (var key in query_data){
        url_param += key + '=' + query_data[key];
        url_param += '&';
    }
  }
  
  $.ajax({
    type : "GET",
    url: url_param
  }).done(function(data){
    callback(data);
  });
};

function ajaxPost(url, data, callback){
  $.ajax({
    type : "POST",
    url: url,
    data : data,
    beforeSend: function() {
        $('#loadingDiv').modal('show');
    },
    success: function(data) {
        $('#loadingDiv').modal('hide');
        callback(data);
    }
  });
};

function ajaxDelete(url, data, callback){
  $.ajax({
    type : "DELETE",
    url: url,
    data : data
  }).done(function(data){
    callback(data);
  });
};

function ajaxUpload(url, formData, showLoading , callback){
  $.ajax({
    type: "POST",
    url: url,
    data: formData,
    //use contentType, processData for sure.
    contentType: false,
    processData: false,
    beforeSend: function() {
        if (showLoading)
        {
            $('#loadingDiv').modal('show');
        }
        
    },
    success: function(data) {
        if (showLoading)
        {
            $('#loadingDiv').modal('hide');
        }
        callback(data);
    },
    error: function(data) {
        reportDialog('error','File upload', data.message);    
    }
    });
};

