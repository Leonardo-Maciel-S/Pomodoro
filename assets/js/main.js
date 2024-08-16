const body = document.querySelector('body')
const main = document.querySelector('main')
const h1 = document.querySelector('.description')
const timer = document.querySelector('.timer')
const timerId = document.getElementById('timer')
const title = document.querySelector('title')

const play = document.querySelector('.play')
const pause = document.querySelector('.pause')
const restart = document.querySelector('.restart')


let timeNow;
let time;
let timeOut

let started = false;
let inFocus = true
let paused = false

let lastTime;
let timeFocus = 0;
let timeRest = 0;

let twentyFiveMinuts = 60 * 25 * 1000 // 25 min
let fiveMinuts = 60 * 5 * 1000 // 5 min

let opacity = 100
let varOpacity;

let weight = 900
let varWeigth;

const audio = new Audio('./assets/audios/notification.mp3')


function updateTime() {
    let date0 = new Date(timeNow)
    timeNow -= 1000

    const hour = date0.toLocaleTimeString('pt-BR', {
        timeZone: 'UTC',
        hour12: false
    })
    
    title.innerText = hour.slice(3)

    return hour
}

function getTime() {
    const inputs = document.querySelectorAll('.timer input')

    const hour = inputs[0].value * 60 * 60 * 1000
    const min = inputs[1].value * 60 * 1000
    const sec = inputs[2].value * 1000
    const time = hour + min + sec

    return time
}

function playTime() {

    

    varOpacity = 100 / (timeNow / 1000);

    varWeigth = 900 / (timeNow / 1000);

    time = setInterval(() => {
        changeTimerWeight()
        timer.innerHTML = updateTime()
        // changeTheme()
        
    }, 1000)

    started = true

    timeOut = setTimeout(() => {
        clearInterval(time)
        
        play.classList.remove('display-none')
        pause.classList.add('display-none')
        restart.classList.add('display-none')

        timeNow = inFocus ? timeRest || fiveMinuts : timeFocus || twentyFiveMinuts
         
        inFocus = !inFocus

        started = false
        
        main.style.opacity = 1

        opacity = 100
        
        resetTimer(timeNow)
        
        h1.innerHTML = inFocus ? 'Foco' : 'Descanso'
        title.innerText = inFocus ? 'Foco' : 'Descanso'

        audio.volume = 0.5
        audio.play()
    }, timeNow + 1100)
}

function pauseTimer() {
    clearInterval(time)
    clearTimeout(timeOut)
}

function resetTimer(lastTime) {
    
    timer.innerHTML = ''
    
    let date = new Date(lastTime).toLocaleTimeString('pt-Br', {
        timeZone: 'UTC',
        hour12: false
    }).split(':')

    

    for (let i = 0; i < 3; i++) {
        let time = date[i]
        let input = `<input type="number" name="hour" id="hour" value="${time}"   
        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
        maxlength = "2">
        `
        timer.innerHTML += input

        if (i < 2) {
            timer.innerHTML += '<span>:</span>'
        }

    }

}

function changeTheme() {

    main.style.opacity = `${opacity}%`
    opacity -= varOpacity - 5
}



function roleBy3(time) {
    let cem = time
    let fontCem = 900
    let div = (timeNow * 100) / cem

    return div
}


function changeTimerWeight() {

    if (inFocus) {
        weight = (roleBy3(timeFocus) / 100) * 900
   
        timerId.style.fontWeight = `${weight}`
        return
    }

    
    weight = (roleBy3(timeRest) / 100) * 900 

    timerId.style.fontWeight = `${900 - weight}`
}

function changeBackground() {
    body.style.background = inFocus ?  '#dedede': '#1b1b1b'
    
}

h1.addEventListener('click', () => {


    pauseTimer()

    inFocus = inFocus ? false : true
    changeBackground()

    h1.innerHTML = inFocus ? 'Foco' : 'Descanso'
    title.innerText = inFocus ? 'Foco' : 'Descanso'

    timeNow = inFocus ? timeFocus || twentyFiveMinuts : timeRest || fiveMinuts

    started = false
    
    console.log(timeNow, 'timeNow')
    console.log(lastTime, 'LastTime')

    resetTimer(timeNow)

    
})

play.addEventListener('click', () => {

    changeBackground()

    if (!started) {

        timeNow = getTime()
        lastTime = getTime()

        if (inFocus) {
            timeFocus = getTime()

        } else {
            timeRest = getTime()
        }

    }

    h1.classList.remove('hidden')

    play.classList.add('display-none')
    pause.classList.remove('display-none')
    restart.classList.remove('display-none')
    
    playTime()
    
})

pause.addEventListener('click', () => {

    if (paused) {
        pause.innerHTML = 'Pausar'
        playTime()
        paused = false
        return
    }

    
    pause.innerHTML = 'Iniciar'
    pauseTimer()
    paused = true

})

restart.addEventListener('click', () => {
    pause.innerHTML = 'Pausar'

    started = false
    paused = false
    timeNow = lastTime


    const time = new Date(timeNow)
    const hour = time.toLocaleTimeString('pt-BR', {
        timeZone: 'UTC',
        hour12: false
    })

    title.innerHTML = hour.slice(3)



    play.classList.remove('display-none')
    pause.classList.add('display-none')
    restart.classList.add('display-none')


    pauseTimer()
    resetTimer(lastTime)

    main.style.opacity = 1

})


