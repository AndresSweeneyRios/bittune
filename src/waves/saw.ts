import {
  generateWave,
} from '../utils'

export const saw = generateWave(
  (T, F) => {
    T %= F

    return T / F * 2
  },
)
