import Speaker from "speaker"
import {
  saw,
  silence,
  sine,
  square,
  triangle, 
} from "../src"
import {
  Player, PlayerConfig, 
} from "../src/player"
import stream from "stream"

const player = new class extends Player {
  speaker: Speaker
  
  constructor() {
    super({
      sampleRate: 44100,
      channels: 1,
      bitDepth: 16,
      samplesPerFrame: 256,
      volume: 1,
    })

    this.speaker = new Speaker({
      channels: this.channels,
      bitDepth: this.bitDepth,
      sampleRate: this.sampleRate,
    })
  }
}

// const channel1 = Buffer.alloc()

const tracks: Buffer[] = []

const s = new stream.Readable()

let T = 0

const F = player.sampleRate / 440.0

s._read = (n) => {
  const chunk = Buffer.alloc(n)

  // tracks.forEach(track => {
  //   for (let i = 0; i < n; i++) {
  //     chunk[i] += track[i]
  //   }
  // })

  for (let i = 0; i < n; i++) {
    // chunk[i] = Math.sin(T / (F / (Math.PI * 2))) * 20

    T++
  }

  s.push(chunk)
}

s.push(sine("A4", 10)(player))

// s.push(Buffer.from(silence(5, player)))

s.pipe(player.speaker)

setInterval(() => null, 1000)
