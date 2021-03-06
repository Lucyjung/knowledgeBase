/**
 * XlsController
 *
 * @description :: Server-side logic for managing xls
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    parse: function (req, res) {
        if (req.body.name === undefined)
        {
            return res.json({
                  status : false,
                  message: 'Parameter [name] is required'
            });
        }
        req.file('xls').upload({
          // don't allow the total upload size to exceed ~50MB
          maxBytes: 50000000
	},function (err, uploadedFiles) {
           
            var extension = uploadedFiles[0].fd.split('.').pop();
            if(extension != 'xls'){
                return res.json({
                    status : false,
                    message: 'Uploaded file is not xls'
                });
            }
            if (err) return res.json({
                  status : false,
                  message: 'Upload file error'
            });
            var fs = require('fs');
            var XLS = require('xlsjs');
            
            try{
                var workbook = XLS.readFile(uploadedFiles[0].fd);

                // delete file for saving space
                fs.unlinkSync(uploadedFiles[0].fd);
                if (workbook.Sheets['RAM'] == undefined) return res.json({
                      status : false,
                      message: 'File is invalid'
                });
                var ramSheet = workbook.Sheets['RAM'];


                ddParser.getMinMaxElevel(ramSheet,req.body.name,function (err, value){
                    return res.json({
                      status : err,
                      message: value
                    });
                });
            }catch(e){
                return res.json({
                      status : err,
                      message: 'File is invalid'
                    });
            }
	});
    }
};

