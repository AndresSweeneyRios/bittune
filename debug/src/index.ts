import { 
  arp,
} from "./compositions/arp"
import {
  tetris, 
} from "./compositions/tetris"
import {
  Player, 
  saw,
  effects,
} from "../../src"

const player = new Player({
  tempo: 275,
})

const buffer = player.mixComposition(tetris)
player.play(effects.reverb(buffer))

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')!

const wave = saw(400, 1/8, {
  release: 0,
  attack: 0,
})(player)

canvas.width = wave.length
canvas.height = 250
canvas.style.width = "100%"
canvas.style.height = "400px"
canvas.style.imageRendering = "pixelated"
// canvas.style.backgroundColor = "black"

// context.fillStyle = "white"

let lastX = 0
let lastY = 0

wave.forEach((value, index) => {
  const x = index
  const y = canvas.height - (value * 200 + 50)

  if (index !== 0) {
    context.beginPath()
    context.moveTo(lastX, lastY)
    context.lineTo(x, y)
    context.stroke()
  }

  lastX = x
  lastY = y
})

console.log(wave)

document.body.appendChild(canvas)
