/**
 * Variables.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    revision: {
      type: 'integer',
    },
    name: {
      type: 'string',
      required: true
    },
    status:{
      type: 'boolean',
      required: true,
      defaultsTo : true
    }
  },
  beforeCreate: function (data, cb) {

    if (data.revision)
    {
        data.revision++;
    }
    else{
        data.revision = 1;
    }
    data.tag = data.name.substring(0,1);
    cb();
  }

};

