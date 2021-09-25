import {
  fade, 
} from "."

export const reverb = (buffer: number[], sampleRate = 44100, delay = 0.05, decay = 1, hits = 15, volume = 1) => {
  let sampleDelay = delay * sampleRate

  const newBuffer = new Array(buffer.length * 20).fill(0)

  for (let hit = 1; hit < hits + 1; hit++) {
    const nLocalDecay = decay / (hit + 1)
    const localDecay = nLocalDecay * nLocalDecay

    buffer.forEach((value, index) => {
      const T = Math.ceil(index + (hit * sampleDelay))

      newBuffer[T] += value * localDecay * volume
    })

    sampleDelay *= 1.2
  }

  buffer.forEach((value, index) => {
    newBuffer[index] += value
  })

  return newBuffer
}
