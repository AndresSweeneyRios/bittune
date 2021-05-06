import {
  Player,
} from '../player'
import {
  Note, 
} from "../@types"
import {
  notes,
} from '../utils'
import {
  fade,
} from '../effects'

export interface WaveConfig {
  seconds: number
  sample: number[]
  sampleRate: number
  frequency: number
  envelope: Partial<WaveEnvelope>
}

export interface WaveEnvelope {
  volume: number
  attack: number
  release: number
}

export const generateWave = (
  callback: (t: number, sampleFrequency: number, config: WaveConfig, currentSampleT: number) => number,
) => {
  return (
    note: Note,
    beats = 1,
    envelope: Partial<WaveEnvelope> = {},
    hooks: Partial<{
      init: (config: WaveConfig) => void
      pre: (t: number, config: WaveConfig, currentSampleT: number) => void
      post: (t: number, sampleFrequency: number, config: WaveConfig, currentSampleT: number) => number
    }> = {},
  ) => (player: Player) => {
    Object.assign(envelope, {
      volume: 1,
      attack: 0.0075,
      release: 0.0075,
    }, envelope)

    const seconds = beats / (player.tempo / 60)

    const frequency = typeof note === 'number' ? note : notes[note]

    const config: WaveConfig = {
      seconds,
      sample: new Array<number>(Math.floor(player.sampleRate * seconds)),
      sampleRate: player.sampleRate,
      frequency,
      envelope,
    }

    hooks.init?.(config)

    for (let x = 0; x < config.sampleRate * seconds; x++) {
      hooks.pre?.(x, config, config.sample[x])

      config.sample[x] = callback(x, config.sampleRate / config.frequency, config, 0)
      
      if (hooks.post) {
        const nx = hooks.post(x, config.sampleRate / config.frequency, config, config.sample[x])

        if (nx !== undefined) config.sample[x] = nx
      }

      config.sample[x] = config.sample[x] * envelope.volume! * player.volume
    }

    return fade(config.sample, player.sampleRate, envelope.attack!, envelope.release!)
  }
}

export const generateSilence = (
  beats = 1,
  player: Player,
): 0[] => {
  const seconds = beats / (player.tempo / 60)
  const sample: 0[] = []
  
  for (let i = 0; i < Math.floor(player.sampleRate * seconds); i++) {
    sample[i] = 0
  }

  return sample
}
