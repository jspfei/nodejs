/**
 * Created by admin on 2018/5/24.
 */
var process_kill = function () {
    process.on('SIGHUP', function () {
        console.log('Got SIGHUP signal.');
    });
    setTimeout(function () {
        console.log('Exiting.');
        process.exit(0);
    }, 100);
    process.kill('SIGHUP');
};
var platform = function () {
    var sys = require('sys');
    console.log(sys.inspect(process.memoryUsage()));
};

var umask = function () {
    var oldmask, newmask = 0644;
    oldmask = process.umask(newmask);
    console.log('Changed umask from: ' +                 oldmask.toString(8) +
        ' to ' + newmask.toString(8));
};
umask();
// process_kill();
platform();