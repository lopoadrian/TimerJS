let inputs, clock, alarm, hours, minutes, seconds, repeater;

window.addEventListener('load', () => {
    inputs = Array.from(document.getElementsByClassName('number'));
    clock = document.querySelector('.reloj');
    alarm = new Audio('/sonido/alarma.mp3');
})

function startTimer(){
    //Leer los inputs
    parseTime();
    //Actualizar la vista
    setTimer();
    //arrancar el timer
    countdown();


}

function parseTime() {
    hours = Number(inputs[0].value);
    minutes = Number(inputs[1].value);
    seconds = Number(inputs[2].value);
}

function setTimer() {
    clock.innerHTML = `
        <p class="number"> ${hours > 9 ? hours : ('0' + hours)}</p><span>hs</span> 
        <p class="number"> ${minutes > 9 ? minutes : ('0' + minutes)}</p><span>min</span>
        <p class="number"> ${seconds > 9 ? seconds : ('0' + seconds)}</p><span>seg</span>
        `;
    document.title = `
        ${hours > 9 ? hours : ('0' + hours)}:      
        ${minutes > 9 ? minutes : ('0' + minutes)}:
        ${seconds > 9 ? seconds : ('0' + seconds)}
        `;

}

function countdown () {
    repeater = setInterval(runner, 750);
}


function runner() {
    // Si Tengo mas de 0 segundos, resta segundos
    // Si tengo 0 segundos pero tengo mas de 0 minutos, pone segundos en 59 y resta 1 a minutos
    // Si tengo 0 segundos, 0 minutos pero tengo mas de 0 horas, pone segundos en 59, minutos en 59 y restale 1 a horas
    // Sino arranca la alarma

    if(seconds > 0) {
      seconds --;  
    } else {
        if (minutes > 0) { 
            seconds = 59;
            minutes--;
        } else {
            if (hours > 0) { 
                seconds = 59;
                minutes = 59;
                hours--;
        } else{
            alarm.duration = 2;
            alarm.volume = 0.030;
            alarm.play();
            }
        }
    }

    setTimer();
}

function stopTimer() {
    clearInterval(repeater);
    location.reload();
}