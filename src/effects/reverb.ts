export const reverb = (buffer: number[], sampleRate = 44100, delay = 0.25, decay = 0.3) => {
  const sampleDelay = delay * sampleRate

  buffer.forEach((_, index) => {
    buffer[index + sampleDelay] += buffer[index] * decay
  })

  return buffer
}
