import {
  generateWave,
} from '../utils'

const P2 = Math.PI * 2

export const square = generateWave(
  (T, { sampleFrequency: F }) => Math.ceil(Math.sin(T / (F / P2))),
)
