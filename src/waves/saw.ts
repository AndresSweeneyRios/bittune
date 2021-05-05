import {
  generateWave,
} from '../utils'

const P2 = Math.PI * 2

export const saw = generateWave(
  (T, { sampleFrequency: F }) => {
    return Math.sin(T / (F / P2))
  },
)
