import {
  Track, 
} from "./@types"
import {
  silence, 
} from "./waves"

export interface PlayerConfig {
  volume: number
  sampleRate: number
  tempo: number
}

export class Player {
  context: AudioContext

  sampleRate = 44100
  volume = 0.1
  tempo = 125

  constructor (config: Partial<PlayerConfig> = {}) {
    Object.assign(this, config)

    this.context = new AudioContext({
      sampleRate: this.sampleRate,
    })
  }

  play (source: number[]): void {
    const float32Array = new Float32Array(source)

    const buffer = this.context.createBuffer(1, float32Array.length, this.context.sampleRate)
    buffer.copyToChannel(float32Array, 0)

    const audioNode = this.context.createBufferSource()
    audioNode.buffer = buffer
    audioNode.connect(this.context.destination)
    audioNode.start(0)
  }

  mixTrack (track: Track): number[] {
    const mixedTrack: number[] = []
    const buffer: number[] = []

    for (const f of track()) {
      if (typeof f === "function") {
        f(this).forEach((sample, index) => {
          if (buffer[index]) buffer[index] += sample
          else buffer[index] = sample
        })
      } else {
        buffer.push(...silence(f, this))
        mixedTrack.push(...buffer)
        buffer.splice(0)
      }
    }

    return mixedTrack
  }

  mixComposition (composition: Track[]): number[] {
    const mixedComposition: number[] = []

    composition.forEach(track => {
      const mixedTrack = this.mixTrack(track)

      mixedTrack.forEach((sample, index) => {
        if (mixedComposition[index]) mixedComposition[index] += sample
        else mixedComposition[index] = sample
      })
    })

    return mixedComposition
  }
  
  playComposition (composition: Track[]): void {
    this.play(this.mixComposition(composition))
  }
}
