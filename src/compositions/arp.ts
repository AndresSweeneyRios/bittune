import {
  Audio,
  Note, 
  Track, 
} from "@types"
import {
  beat, notes, 
} from "../utils"
import {
  sine, 
  square,
} from "../waves"

export const arp: Track[] = [
  function *track (): Audio {
    const instrument = (note: Note, beat: number) => {
      return square(note, beat, {}, {
        // pre (_x, config) {
        //   config.envelope.volume = 0.1
        // },
      })
    }

    const dMajor: Note[] = [
      'D3', 'E3', 'F#3', 'G3', 'A3', 'B3', 'C#4', 'D4',
      "C#4", "B3", "A3", "G3", "F#3", "E3",
    ]

    for (const note of [
      ...dMajor,
      ...dMajor,
      ...dMajor,
      ...dMajor,
      ...['D3', 'E3', 'F#3', 'G3', 'A3', 'B3', 'C#4'] as Note[],
    ]) {
      yield instrument(note, 1/8)
      yield beat(1/8)
    }

    yield instrument(notes['D4'], 1)

    yield beat(1)
  },
]
