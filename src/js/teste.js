const byteArrayConverter = require("./byteArrayConverter");
const path = require("path");
const os = require("os");
const recorder = require("./recorder");

console.log(byteArrayConverter.getAsByteArray(path.join(os.tmpdir(), 'recker/temp-recordings/gravacao-temporaria.wav')));