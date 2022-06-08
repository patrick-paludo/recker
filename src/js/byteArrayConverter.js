// write a function that converts a audio file to byte array
function getAsByteArray(fileName){
    var fs = require('fs');
    var path = require('path');
    var filePath = path.join(__dirname, fileName);
    var buffer = fs.readFileSync(filePath);
    return buffer;
}

module.exports = {
  getAsByteArray
}
