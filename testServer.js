var express = require('express');
var path = require('path');
var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/'));
app.get('/', function(req, res){
    res.render('testRunner',{
        createType : {
            new : 'NEW',
            add_case : 'CASE',
            update_param : 'UPDATE-PARAM',
            delete : 'DELETE'
        },
        userRole : {
            user : 'ROLE-USER',
            admin : 'ROLE-ADMIN'
        },
        defaultMsg : {
            ecmVar : 'This variable can be directly adjusted by ECM Monitor'
        }
    });
});
app.use(express.static(__dirname + '/'));
app.listen(3000, function () {
    console.log('Run Jasmine testing on port 3000')
})
