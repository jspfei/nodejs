/**
 * Created by admin on 2018/5/28.
 */
var express = require('express');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});


router.get('/a',function (req,res) {
    res.send('Hello from A!');
});
router.get('/b', function (req, res, next) {
    console.log('response will be sent by the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from B!');
});


var cb0 = function (req, res, next) {
    console.log('CB0');
    next();
};

var cb1 = function (req, res, next) {
    console.log('CB1');
    next();
};

var cb2 = function (req, res) {
    res.send('Hello from C!');
};

router.get('/c', [cb0, cb1, cb2]);

router.get('/d', [cb0, cb1], function (req, res, next) {
    console.log('response will be sent by the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from D!');
});

//链式路由句柄
router.route('/book')
    .get(function (req,res) {
        res.send('Get a random book');
    })
    .post(function (req,res) {
        res.send('Add a book');
    })
    .put(function (req,res) {
        res.send('Update the book');
    });

module.exports = router;