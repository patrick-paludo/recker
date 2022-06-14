// Importações e declarações de variáveis
const fs = require('fs');

// Recebe o caminho do arquivo e transforma em um array de bytes
function getAsByteArray(fileName){
    var buffer = fs.readFileSync(fileName);
    return buffer;
}

module.exports = {
  getAsByteArray
}
