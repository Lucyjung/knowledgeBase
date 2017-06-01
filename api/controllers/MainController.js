/**
 * MainController
 *
 * @description :: Server-side logic for managing Mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index : function(req,res){
        

        return res.view('homepage',{
            locals : {
                createType : sails.config.createType,
                userRole : sails.config.userRole,
                defaultMsg : sails.config.defaultMsg
            }
        });

    }
};

