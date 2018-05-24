
/**
 * Created by admin on 2018/5/24.
 */
var express = require('express');
var app = express();
app.get('/',function (req,res) {
    res.send('Hello World');
});

app.listen(3000,function () {
    console.log('app is listeing at port 3000')
});