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
  square,
  sine,
  triangle,
  pulse,
} from "../../src"

const player = new Player({
  tempo: 300,
  // sampleRate: 8000,
})

const buffer = player.mixComposition(tetris)

player.play(
  // effects.reverb(
  buffer,
  // player.sampleRate, 0.1, 0.4,
  // ),
)

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')!

const wave = pulse(2/6)(440, 1/16, {
  release: 0,
  attack: 0,
})(player)

canvas.width = wave.length
canvas.height = 100
canvas.style.width = "100%"
canvas.style.height = "400px"
canvas.style.imageRendering = "pixelated"

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

  // context.fillRect(x, y, 1, 1)

  lastX = x
  lastY = y
})

console.log(wave)

document.body.appendChild(canvas)
