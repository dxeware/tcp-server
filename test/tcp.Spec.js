"use strict";

var expect = require('chai').expect;
var net = require('net');
var fs = require('fs');

describe('TCP server', function() {

  var path = __dirname + '/..' + '/files';

  beforeEach(function() {
    fs.readdirSync(path).forEach(function(fileName) {
      //console.log(fileName);
      if ( -1 !== fileName.indexOf('req.timestamp') ) {
          fs.unlinkSync(path + '/' + fileName);
      }
    });
  });

  it('should connect to server', function(done) {

    var client = net.connect(3000, function() {
      console.log('connected to TCP server');
    });
    client.write('Something');

    //expect(array).to.deep.equal(["blue", 3, "green", 10, "red", 55]);
    //expect(array.length).to.equal(6);
    client.on('data', function(data) {
      console.log(data.toString());
      client.end();

      fs.readdir(path, function(err, files) {
        console.log("files = " + files);
        expect(files[0]).to.equal(data.toString());
        done();
      })


    });
  });

});
