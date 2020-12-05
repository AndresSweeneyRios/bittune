import {
  Track, 
} from "@types"

export interface Player {
  volume: number
  sampleRate: number
  tempo: number

  play (buf: Float32Array): Promise<void>
  playTrack (track: Track): Promise<void>
  playComposition (composition: Track[]): Promise<void>
}

export let player: Player
export let context: AudioContext

export interface PlayerConfig {
  volume?: number
  sampleRate?: number
  tempo?: number
}

export const initPlayer = ({
  volume,
  sampleRate,
  tempo,
}: PlayerConfig = {}): Player => {
  context = new AudioContext({
    sampleRate: sampleRate || 44100,
  })

  player = {
    volume: volume || 0.1,
    sampleRate: context.sampleRate,
    tempo: tempo || 125,

    async play (buf: Float32Array): Promise<void> {
      const buffer = context.createBuffer(1, buf.length, context.sampleRate)
      buffer.copyToChannel(buf, 0)
      const source = context.createBufferSource()
      source.buffer = buffer
      source.connect(context.destination)
      source.start(0)
    },

    async playTrack (track: Track): Promise<void> {
      console.log(`Playing ${track.name}..`)

      for (const f of track()) {
        const sample = await f()

        if (sample) player.play(sample).catch(console.error)
      }
    },

    async playComposition (composition: Track[]): Promise<void> {
      await Promise.all(Object.values(composition).map(track => player.playTrack(track)))
    },
  }

  return player
}

import {
  tetris,
} from './compositions/tetris'

initPlayer({
  
}).playComposition(tetris)
