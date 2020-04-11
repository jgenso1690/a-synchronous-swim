const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const Messages = require('./messageQueue');
const FS = require('fs');
// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  if(req.method === "GET" && req.url.length > 2){
    var img = path.join('.',`${req.url}`);
    FS.readFile(`${img}`,function(err,content){
      if(err){
        res.writeHead(404,headers)
        console.log(err);
        res.end('Image does not exist');
        next();
      }
      else{
        res.writeHead(200,headers);
        res.end(content);
        next();
      }
    })
  }
  else{
    if(req.method === "GET"){
      var mes = Messages.dequeue();
      var _data = {
        directions: mes
      }
      res.writeHead(200, headers);
      res.write(JSON.stringify(_data));
      res.end();
      next();
    }
  }
  if(req.method === "POST" && req.url === "/background.jpg"){
    var fileData = Buffer.alloc(0);

    req.on('data', (chunk) => {
      fileData = Buffer.concat([fileData,chunk]);
    });

    req.on('end', () => {
      var file = multipart.getFile(fileData);
      console.log(file);
      FS.writeFile(module.exports.backgroundImageFile,file.data,(err)=>{
        res.writeHead(err ? 400 :201,headers);
        res.end();
        next();
      })
    });
  }
  // invoke next() at the end of a request to help with testing!
};

// if(req.method === 'GET'){
//   if(req.url.length > 2){
//     var img = path.join('.', `${req.url}`);
//     FS.readFile(`${img}`,function(err,content){
//       if(err){
//         res.writeHead(404,{"Content-type":"text/html"});
//         console.log(err);
//         res.end('No image exist');
//       }
//       else{
//         res.writeHead(200,{"Content-type":"image/jpg"});
//         res.end(content);
//       }
//     })
//   }
//   else{
//     res.writeHead(200, headers);
//     res.write(JSON.stringify(_data));
//     res.end();
//     next();
//   }
// }
// else{
//   console.log('Serving request type ' + req.method + ' for url ' + req.url);
//   res.writeHead(200, headers);
//   res.write();
//   res.end();
//   next();
// }