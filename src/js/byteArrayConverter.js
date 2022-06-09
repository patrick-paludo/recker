const fs = require('fs');
const path = require('path');

function getAsByteArray(fileName){
    var filePath = path.join(__dirname, fileName);
    var buffer = fs.readFileSync(filePath);
    return buffer;
}

module.exports = {
  getAsByteArray
}
