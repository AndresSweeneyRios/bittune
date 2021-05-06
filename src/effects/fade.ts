export const fade = (buffer: number[], sampleRate: number, attack: number, release: number): number[] => {
  const attackX = sampleRate * attack 
  const releaseX = buffer.length - sampleRate * release 

  buffer.forEach((_, T) => {
    if (T < attackX) {
      buffer[T] *= T / attackX
    }

    if (T > releaseX) {
      buffer[T] *= (buffer.length - T) / (buffer.length - releaseX)
    }
  })

  return buffer
}
