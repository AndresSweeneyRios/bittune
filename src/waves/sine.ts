import {
  generateWave,
} from '../utils'

const P2 = Math.PI * 2

export const sine = generateWave(
  (T, { sampleFrequency: F }) => Math.sin(T / (F / P2)),
)
