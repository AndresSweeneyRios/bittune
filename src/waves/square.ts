import {
  generateWave,
} from '../utils'

export const square = generateWave(
  (x, { sampleFrequency }) => Math.ceil(Math.sin(x / (sampleFrequency / (Math.PI * 2)))),
)
