/**
 * Case.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        name: {
            type: 'string',
            required: true
        },
        status:{
            type: 'boolean',
            required: true,
            defaultsTo : true
        },
        approve_status:{
            type: 'boolean',
            required: true,
            defaultsTo : false
        },
        owner:{
            type: 'string',
            required: true
        },
        softVersion:{
            type: 'string',
            required: true
        },
        minValue:{
            type: 'string',
            required: true
        },
        maxValue:{
            type: 'string',
            required: true
        },
        eLevel:{
            type: 'string',
            required: true
        },
        description:{
            type: 'string',
            required: true
        },
        param:{
            type: 'json',
            required: true
        }
    }
};

