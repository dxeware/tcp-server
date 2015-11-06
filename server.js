var net = require('net');
var fs = require('fs');

function saveToFile(string, callback) {

  var time = new Date().toTimeString();
  var outputDir = __dirname + '/files/';
  fileName = 'req.timestamp' + time.replace(/ /g, '');

  // If output directory doesn't exist, create
  if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir,0744);
  }

  fs.writeFile(outputDir+fileName, string, function(err) {
    if (err) throw err;

    console.log("File was saved!");
    callback(fileName);
  });

}

var server = net.createServer(function (socket) {
  socket.on('data', function(data) {
    var fileName;

    console.log('==== Connection Started=====');
    console.log(data.toString());

    saveToFile(data.toString(), function(file) {
      fileName = file;
      console.log("returned fileName = " + fileName);
      socket.write(fileName);
    });

  });
  socket.on('end', function() {
    console.log('==== Connection Ended=====');
  });
});

server.listen(3000);
