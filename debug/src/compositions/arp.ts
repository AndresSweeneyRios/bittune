import {
  Audio,
  Note, 
  Track, 
  notes, 
  square,
  sine,
  saw,
  Player,
  effects, 
} from "../../../src"
import {
} from "../../../src/effects"

export const arp: Track[] = [
  function *track (): Audio {
    const instrument = (note: Note, beat: number) => {
      return (player: Player) => {
        const buffer = square(note, beat, {
          volume: 3,
          release: 1/16,
        }, {
          pre (T, config) {
            config.frequency += T / config.sampleRate
          },
        })(player)
        
        //return effects.stretch(buffer, 2)

        return buffer
      }
    }

    const dMajor: Note[] = [
      'D3', 'E3', 'F#3', 'G3', 'A3', 'B3', 'C#4', 'D4',
      "C#4", "B3", "A3", "G3", "F#3", "E3",
    ]

    for (const note of [
      ...dMajor,
      // ...dMajor,
      // ...['D3', 'E3', 'F#3', 'G3', 'A3', 'B3', 'C#4'] as Note[],
    ]) {
      yield instrument(note, 1/8)

      yield 1/16
    }

    // yield instrument(notes['D4'], 1/8)
  },
]
