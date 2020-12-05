export const fade = (sample: Float32Array, sampleRate: number, attack: number, release: number): Float32Array => {
  const attackX = sampleRate * attack 
  const releaseX = sample.length - sampleRate * release 

  for (const i in sample) {
    const x = Number(i)

    if (x < attackX) {
      sample[x] *= x / attackX
    }

    if (x > releaseX) {
      sample[x] *= (sample.length - x) / (sample.length - releaseX)
    }
  }

  return sample
}
