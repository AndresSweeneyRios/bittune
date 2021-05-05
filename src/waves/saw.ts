import {
  generateWave,
} from '../utils'

export const saw = generateWave(
  (T, { sampleFrequency: F }) => {
    T %= F

    if (T < 0) T += 1

    return 0.01 * T
  },
)
