"use strict";

var expect = require('chai').expect;
var net = require('net');
var fs = require('fs');

describe('TCP server', function() {

  var path = __dirname + '/..' + '/files/';

  // If output directory doesn't exist, create
  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
  }

  beforeEach(function() {
    fs.readdirSync(path).forEach(function(fileName) {
      //console.log(fileName);
      if ( -1 !== fileName.indexOf('req.timestamp') ) {
          fs.unlinkSync(path + '/' + fileName);
      }
    });
  });

  it('should connect to server and file should match contents and filename returned', function(done) {

    var writeStr = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex iusto ut inventore alias, placeat, voluptatibus recusandae minima molestiae. Consequuntur repudiandae libero, a. Dolores assumenda repellendus nostrum esse, impedit earum!\n';

    var client = net.connect(3000, function() {
      console.log('connected to TCP server');
    });
    client.write(writeStr);

    client.on('data', function(data) {
      console.log(data.toString());
      client.end();

      var files = fs.readdirSync(path);

      var contents = fs.readFileSync(path + files[0]).toString();

      expect(files[0]).to.equal(data.toString());
      expect(contents).to.equal(writeStr);
      done();

    });
  });

});
