import {
  generateWave,
} from '../utils'

export const triangle = generateWave(
  (T, F) => {
    return 0.015 * (F - Math.abs(-2 * (T % F) + F))
  },
)
