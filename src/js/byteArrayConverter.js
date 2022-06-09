const fs = require('fs');

function getAsByteArray(fileName){
    var buffer = fs.readFileSync(fileName);
    return buffer;
}

module.exports = {
  getAsByteArray
}
