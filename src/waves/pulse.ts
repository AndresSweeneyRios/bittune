import {
  generateWave,
} from '../utils'

export const pulse = (pulseWidth = 1/2) => generateWave(
  (T, F, config) => {
    const width = pulseWidth * F

    T %= F

    if (T < 0) T += F
    if (T <= width) return config.envelope.volume! * 1.5
    
    return 0
  },
)
