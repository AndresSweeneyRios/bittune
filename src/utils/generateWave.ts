import {
  player,
} from '../player'
import {
  Note, 
} from "@types"
import {
  notes,
} from '../utils'
import {
  fade,
} from '../effects'

export interface WaveConfig {
  seconds: number
  sample: Float32Array
  sampleRate: number
  frequency: number
  sampleFrequency: number
  envelope: WaveEnvelope
}

export type WaveHook = (
  x: number,
  config: WaveConfig,
  currentSampleX: number
) => number | void

export type WaveFunction = (
  note: Note,
  beats?: number,
  options?: WaveEnvelopeConfig,
  hooks?: {
    pre?: WaveHook
    post?: WaveHook
  }
) => () => Float32Array 

export interface WaveEnvelopeConfig {
  volume?: number
  attack?: number
  release?: number
}

export interface WaveEnvelope {
  volume: number
  attack: number
  release: number
}

export const generateWave = (callback: WaveHook): WaveFunction => {
  return (
    note,
    beats = 1,
    envelope = {},
    hooks?,
  ) => () => {
    envelope.volume = envelope.volume || 1
    envelope.attack = envelope.attack || 0.0075
    envelope.release = envelope.release || 0.0075

    const seconds = beats / (player.tempo / 60)

    const frequency = typeof note === 'number' ? note : notes[note]

    const config: WaveConfig = {
      seconds,
      sample: new Float32Array(player.sampleRate * seconds),
      sampleRate: player.sampleRate,
      frequency,
      sampleFrequency: player.sampleRate / frequency,
      envelope: envelope as WaveEnvelope,
    }

    for (let x = 0; x < player.sampleRate * seconds; x++) {
      if (hooks?.pre) {
        hooks.pre(x, config, config.sample[x])
      }

      config.sample[x] = callback(x, config, 0) as number
      
      if (hooks?.post) {
        const nx = hooks.post(x, config, config.sample[x])

        if (nx !== undefined) config.sample[x] = nx
      }

      config.sample[x] = config.sample[x] * envelope.volume * player.volume
    }

    return fade(config.sample, player.sampleRate, envelope.attack, envelope.release)
  }
}

export const generateSilence = (
  beats = 1,
): 0[] => {
  const seconds = beats / (player.tempo / 60)
  const sample: 0[] = []
  
  for (let i = 0; i < player.sampleRate * seconds; i++) {
    sample[i] = 0
  }

  return sample
}
