import {
  generateWave,
} from '../utils'

export const sine = generateWave(
  (x, { sampleFrequency }) => Math.sin(x / (sampleFrequency / (Math.PI * 2))),
)
