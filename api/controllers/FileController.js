/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  upload: function  (req, res) {
    req.file('csv').upload({
	  dirname: require('path').resolve(sails.config.appPath, 'assets/csv')
	},function (err, uploadedFiles) {
	  if (err || (uploadedFiles[0] == undefined) ) return res.json({
                status : false,
		message: 'file(s) uploaded fail!'
	  });
          var fileName = uploadedFiles[0].fd.replace(/.*[\/\\]/, ''); // clean up file name  
	  return res.json({
                status : true,
		message: uploadedFiles.length + ' file(s) uploaded successfully!',
		fileName: fileName
	  });
	});
  }
	
};

