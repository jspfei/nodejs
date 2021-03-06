/**
 * Created by admin on 2018/5/24.
 */

var ss = function () {
    var sys = require('sys'),
        spawn = require('child_process').spawn,
        ps = spawn('ps', ['ax']),
        grep = spawn('grep', ['ssh']);
    ps.stdout.on('data', function (data) {
        grep.stdin.write(data);
    });
    ps.stderr.on('data', function (data) {
        sys.print('ps stderr: ' + data);
    });
    ps.on('exit', function (code) {
        if (code !== 0) {
            console.log('ps process exited with code ' + code);
        }
        grep.stdin.end();
    });
    grep.stdout.on('data', function (data) {
        sys.print(data);
    });
    grep.stderr.on('data', function (data) {
        sys.print('grep stderr: ' + data);
    });
    grep.on('exit', function (code) {
        if (code !== 0) {
            console.log('grep process exited with code ' + code);
        }
    });
};

ss();
