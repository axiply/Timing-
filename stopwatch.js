let [seconds, minutes, hours] = [0,0,0];
let displayTime = document.getElementById("displayTime");
let timer = null;

let isMuted = false;

const files = [
    new Audio('../assets/ticks/1.wav'),
    new Audio('../assets/ticks/2.wav'),
    new Audio('../assets/ticks/3.wav'),
    new Audio('../assets/ticks/4.wav'),
    new Audio('../assets/ticks/5.wav'),
    new Audio('../assets/ticks/6.wav'),
    new Audio('../assets/ticks/7.wav'),
    new Audio('../assets/ticks/8.wav'),
    new Audio('../assets/ticks/9.wav'),
    new Audio('../assets/ticks/10.wav')
];

let currentFile = 0;

 function getRandomAudio() {
    let val = Math.floor(Math.random() * files.length);

    if (val == currentFile) {
        return getRandomAudio()
    }

    currentFile = val;
    return val;
 }

 function mute() {
    isMuted = !isMuted;

    files.forEach((audio) => {
        audio.volume = +!isMuted;
    });
    document.getElementById('mute-button').src = isMuted
    ? '../assets/muted.svg'
    : '../assets/unmuted.png';
 }

 function stopwatch(){
    seconds++;

    if(seconds == 60){
        seconds++;
        if (seconds == 60){
            seconds = 0;
            minutes++;
            if (minutes == 60){
                minutes = 0
                hours++;
                
            }
        }

        let h=hours < 10 ? "0" + hours : hours;
        let m = minutes < 10 ? "0" + minutes : minutes;
        let s = seconds < 10 ? "0" + seconds : seconds;
        displayTime.innerHTML = h + ":" + m + ":" + s;
        files[getRandomAudio()].play();
        

    }

 }

 function watchStart(){
    if (timer !== null) {
        clearInterval(timer);
    }
    files.forEach((audio) => {
        audio.volume = 0;
        audio.play();
        setTimeout(() => {
            if (!isMuted) audio.volume = 1;
        }, 500);
    });
    setTimeout(() => {
        timer = setInterval(stopwatch, 1000);
    }, 100);
    buttonClick.play();
}

function watchStop(){
    clearInterval(timer);
    timer = null;
    buttonClick.play();
}

function resetWatch(){
    clearInterval(timer);
    [seconds,minutes,hours] = [0,0,0];
    displayTime.innerHTML = "00:00:00";
    buttonClick.play();

}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById('timerStart').addEventListener('click', () => {
        watchStart();
    });
    document.getElementById('timerPause').addEventListener('click', () => {
        watchStop();
    });
    document.getElementById('timerReset').addEventListener('click', () => {
        resetWatch();
    });
    document.getElementById('mute-button').addEventListener('click', () => {
        mute();
    });
})
