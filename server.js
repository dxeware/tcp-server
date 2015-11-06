'use strict';

var net = require('net');
var fs = require('fs');

function saveToFile(string, callback) {

  // Set up directory
  // Set up file name to be unique -- using timestamp string
  var time = new Date().toTimeString();
  var outputDir = __dirname + '/files/';
  var fileName = 'req.timestamp' + time.replace(/ /g, '');

  // If output directory doesn't exist, create
  if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
  }

  // Write file with string as content
  fs.writeFile(outputDir+fileName, string, function(err) {
    if (err) throw err;

    console.log("File was saved!");

    //Send file name back
    callback(fileName);
  });

}

var server = net.createServer(function (socket) {
  socket.on('data', function(data) {

    console.log('==== Connection Started=====');
    console.log(data.toString());

    // If data received, write sting to file
    saveToFile(data.toString(), function(file) {
      // Send filename back to client
      socket.write(file);
    });

  });
  socket.on('end', function() {
    console.log('==== Connection Ended=====');
  });
});

server.listen(3000);
