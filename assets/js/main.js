let timeNow;
const timer = document.querySelector('.timer')
const inputs = document.querySelectorAll('.timer input')

const play = document.querySelector('.play')
const pause = document.querySelector('.pause')
const restart = document.querySelector('.restart')

const h1 = document.querySelector('.description')


let time;
let timeOut
let started = false;
let focus = false

function updateTime() {
    let date0 = new Date(timeNow)
    timeNow -= 1000
    console.log(date0.toLocaleTimeString('pt-BR', {
        timeZone: 'UTC',
        hour12: false
    }))

    return date0.toLocaleTimeString('pt-BR', {
        timeZone: 'UTC',
        hour12: false
    })
}

function getTime() {
    const hour = inputs[0].value * 60 * 60 * 1000
    const min = inputs[1].value * 60 * 1000
    const sec = inputs[2].value * 1000
    const time = hour + min + sec
    return time
}

function playTime() {

    time = setInterval(() => {
        timer.innerHTML = updateTime()
    }, 1000)

    timeOut = setTimeout(() => {
        clearInterval(time)
        alert("Tempo Acabou")
        resetTimer()

        play.classList.remove('display-none')
        pause.classList.add('display-none')
        restart.classList.add('display-none')

        started = false
        
    }, timeNow + 1100)
}

function pauseTimer() {
    clearInterval(time)
    clearTimeout(timeOut)
}

function resetTimer() {
    timer.innerHTML = ''

    for (let index = 0; index < 3; index++) {

        inputs[index].value = index === 1 ? '05' : '00'

        timer.appendChild(inputs[index])

        if (index < 2) {
            timer.innerHTML += '<span>:</span>'

        }
    }
}


play.addEventListener('click', () => {
    if (!started) {
        timeNow = getTime()
        started = true
    }
    h1.classList.remove('hidden')

    play.classList.add('display-none')
    pause.classList.remove('display-none')
    restart.classList.remove('display-none')

    playTime()
})

pause.addEventListener('click', () => {
    pauseTimer()
})

restart.addEventListener('click', () => {
    if (!started) {
        timeNow = getTime()
        started = true
    }
    h1.classList.remove('hidden')

    play.classList.add('display-none')
    pause.classList.remove('display-none')
    restart.classList.remove('display-none')

    playTime()
})


