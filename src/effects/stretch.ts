export const stretch = (buffer: number[], factor: number) => {
  const stretchedBuffer: number[] = []

  buffer.forEach((sample, index) => {
    for (let i = 0; i < factor; i++) {
      stretchedBuffer[Math.floor(index * factor) + i] = sample
    }
  })

  return stretchedBuffer
}
