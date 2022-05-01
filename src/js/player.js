const {Howl, Howler} = require('howler');

var tempRec = new Howl({
    src: ['./beep.mp3']
});

const playTempRec = () => {
    tempRec.play();
}

const pauseTempRec = () => {
    tempRec.pause();
}

tempRec.once('load', function(){
    tempRec.play();
  });

module.exports = {
    playTempRec, pauseTempRec
}

process.stdin.resume();