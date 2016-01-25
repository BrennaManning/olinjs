/*function start() {
console.log("Request handler 'start' was called.");
function sleep(milliSeconds) {
var startTime = new Date().getTime();
while (new Date().getTime() < startTime + milliSeconds);
}
sleep(10000);
return "Hello Start";
}
function upload() {
console.log("Request handler 'upload' was called.");
return "Hello Upload";
}
exports.start = start;
exports.upload = upload;*/


var exec = require("child_process").exec;
function start() {
console.log("Request handler 'start' was called.");
var content = "empty";
exec("ls -lah", function (error, stdout, stderr) {
content = stdout;
});
return content;
}
function upload() {
console.log("Request handler 'upload' was called.");
return "Hello Upload";
}
exports.start = start;
exports.upload = upload;var exec = require("child_process").exec;
function start(response) {
console.log("Request handler 'start' was called.");
exec("ls -lah", function (error, stdout, stderr) {
response.writeHead(200, {"Content-Type": "text/plain"});
response.write(stdout);
response.end();
});
}
function upload(response) {
console.log("Request handler 'upload' was called.");
response.writeHead(200, {"Content-Type": "text/plain"});
response.write("Hello Upload");
response.end();
}
exports.start = start;
exports.upload = upload;