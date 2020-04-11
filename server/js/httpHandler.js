const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const Messages = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  var mes = Messages.dequeue();
var _data = {
  directions: mes
}
  if(req.method === 'GET'){
    res.writeHead(200, headers);
    res.write(JSON.stringify(_data));
    res.end();
    next();
  }
  else{
    console.log('Serving request type ' + req.method + ' for url ' + req.url);
    res.writeHead(200, headers);
    res.write();
    res.end();
    next();
  }
  // invoke next() at the end of a request to help with testing!
};

