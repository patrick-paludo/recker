const os = require('os');
const isDev = require("electron-is-dev"); 
const fs = require('fs');
const path = require('path');

console.log(os.homedir());

let userDir = null;
if (isDev === true){
    userDir = path.join(__dirname, "../ultimasGravacoes");
} else {
    userDir = path.join(os.userdir(), 'Recker/ultimasGravacoes')
}

if (!fs.existsSync(userDir)) {
  fs.mkdirSync(userDir,  { recursive: true });
}

let ultimasGravacoes = path.join(userDir, "ultimasGravacoes.json");


const salvarUltimaGravacao = (nomeArquivo) => {
    fs.readFile(ultimasGravacoes, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); //now it an object
        obj.gravacoes.push({nome: nomeArquivo}); //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile(ultimasGravacoes, json, 'utf8', function(err) {
            if (err) throw err;
            console.log('complete');
            }); // write it back 
    }});
}

const getUltimasGravacoes = () => {
    let arrayGravacoes = [];
    const content = fs.readFileSync(ultimasGravacoes, 'utf8');
    var obj = JSON.parse(content).gravacoes
    obj.forEach(element => {
        arrayGravacoes.push(element.nome);
    });
    return arrayGravacoes;
}


module.exports = {
    salvarUltimaGravacao, getUltimasGravacoes
}