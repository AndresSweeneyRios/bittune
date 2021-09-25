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
  silence,
  pulse, 
} from "../../../src"
import {
} from "../../../src/effects"

export const pi: Track[] = [
  function *track (player): Audio {
    const instrument = (note: Note, beat: number) => {
      return (player: Player) => {
        return sine(note, beat, {
          attack: 0.01,
          release: 0.01,
        })(player)
      }
    }

    for (let i = 0; i < 1000; i++) {
      const beat = 1/4

      yield instrument(440 + (Math.PI * i * 10), beat)
      yield beat
    }

    // yield 10
  },
]
