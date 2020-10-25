const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $gameTime = document.querySelector('#game-time')
const $time = document.querySelector('#time')
const $timeHeader = document.querySelector('#time-header')
const $result = document.querySelector('#result')
const $resultHeader = document.querySelector('#result-header')

let score
let gameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', nextBox)
$gameTime.addEventListener('input', setGameTime)

function show(el){
    el.classList.remove('hide')
}

function hide(el){
    el.classList.add('hide')
}

function setGameTime(){
    const time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function startGame(){
    score = 0
    hide($start)
    gameStarted = true
    $gameTime.setAttribute('disabled', 'true')
    $game.style.backgroundColor = '#fff'
    setGameTime()
    changeTime()
    renderBox()
}

function renderBox(){
    $game.innerHTML = ''
    const box = document.createElement('div')
    const boxSize = randomSize(30, 100)
    const gameSize = $game.getBoundingClientRect()
    const maxTop = gameSize.height - boxSize
    const maxLeft = gameSize.width - boxSize
    box.setAttribute('data-box', 'true')
    box.style.cursor = 'pointer'
    box.style.position = 'absolute'
    box.style.width = box.style.height = boxSize + 'px'
    box.style.backgroundColor = '#000'
    box.style.left = randomSize(0,maxLeft) + 'px'
    box.style.top = randomSize(0, maxTop) + 'px'
    $game.insertAdjacentElement('afterbegin', box)
}

function changeTime(){
   const interval = setInterval( () =>{
       const time = +$time.textContent
       if (time <= 0){
           clearInterval(interval)
           endGame()
       } else {
           $time.textContent = (time - 0.1).toFixed(1)
       }
   },100)
}

function nextBox(event){
    if(gameStarted){
        if(event.target.dataset.box){
            score++
            renderBox()
        }
    } else {
        return
    }
}

function endGame(){
    gameStarted = false
    hide($timeHeader)
    show($resultHeader)
    $result.textContent = score.toString()
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    show($start)
    $gameTime.removeAttribute('disabled')
}

function randomSize(min,max){
    return Math.floor(Math.random()*(max - min) + min)
}