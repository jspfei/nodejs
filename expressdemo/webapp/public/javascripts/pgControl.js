/**
 * Created by admin on 2018/5/29.
 */
var pg = require('pg');
var conString = "postgres://postgres:123456@127.0.0.1:5432/demo";
/*
 * 使用连接池
 * */
function connectPgWithPool() {
    var pgConfig = {
        user: 'postgres',
        database: 'postgres',
        password: '123456',
        host: '192.168.1.234',
        port: '5432',
        poolSize: 5,
        poolIdleTimeout: 30000,
        reapIntervalMillis: 10000
    };
    var pgPool = new pgOpt.Pool(pgConfig);
    // var pgPool = new pgOpt.pools.getOrCreate(pgConfig);// 低版本的pg模块需要这样来创建连接池

    pgPool.connect(function (isErr, client, done) {
        if (isErr) {
            console.log('connect query:' + isErr.message);
            return;
        }
        client.query('select now();', [], function (isErr, rst) {
            done();
            if (isErr) {
                console.log('query error:' + isErr.message);
            } else {
                console.log('query success, data is: ' + rst.rows[0].now);
            }
        })
    });
}
/** 不使用连接池* */
function connectPgWithoutPool() {
    var conStr = "postgres://postgres:123456@127.0.0.1:5432/demo";
    var client = new pg.Client(conStr);
    client.connect(function (isErr) {
        if (isErr) {
            console.log('connect error:' + isErr.message);
            client.end();
            return;
        }
        client.query('select now();', [], function (isErr, rst) {
            if (isErr) {
                console.log('query error:' + isErr.message);
            } else {
                console.log('query success, data is: ' + rst.rows[0].now);
            }
            client.end();
        })
    })
}
var myPgTest = function () {
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
                return rst.rows[0];
            }
            client.end();
        })
    });
}


module.exports =myPgTest ;
