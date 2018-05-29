var express = require('express');
var router = express.Router();
var pgControl = require('../public/javascripts/pgControl');
var pg = require('pg');
var conString = "postgres://postgres:123456@127.0.0.1:5432/demo";
/* GET users listing. */
router.get('/', function(req, res, next) {

    var client = new pg.Client(conString);
    client.connect(function (isErr) {
        if (isErr) {
            console.log('connect error:' + isErr.message);
            client.end();
            return;
        }
        client.query('select * from student', [], function (isErr, rst) {
            if (isErr) {
                console.log('query error:' + isErr.message);
            } else {
                console.log('query success, data is: ' + rst.rows[0].name);
                var str = JSON.stringify(rst.rows[0]);
                res.send(str);

            }
            client.end();
        })
    });

});
router.get('/student', function(req, res, next) {

    var str = JSON.stringify(pgControl);
    res.send(str);
});
module.exports = router;
