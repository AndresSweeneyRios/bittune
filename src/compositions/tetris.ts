import {
  Audio,
  Note,
  Track,
} from '@types'
import {
  beat,
} from '../utils'
import {
  // sine, 
  square,
} from '../waves'

export const tetris: Track[] = [
  function *track1 (): Audio {
    const instrument = square

    // 1
    yield instrument('E4', 1)
    yield beat(1)
    yield instrument('B3', 1/2)
    yield beat(1/2)
    yield instrument('C4', 1/2)
    yield beat(1/2)
    yield instrument('D4', 1)
    yield beat(1)
    yield instrument('C4', 1/2)
    yield beat(1/2)
    yield instrument('B3', 1/2)
    yield beat(1/2)

    // 2
    yield instrument('A3', 1.5)
    yield beat(1.5)
    yield instrument('C4', 1/2)
    yield beat(1/2)
    yield instrument('E4', 1)
    yield beat(1)
    yield instrument('D4', 1/2)
    yield beat(1/2)
    yield instrument('C4', 1/2)
    yield beat(1/2)

    //  3
    yield instrument('B3', 1.5)
    yield beat(1.5)
    yield instrument('C4', 1/2)
    yield beat(1/2)
    yield instrument('D4', 1)
    yield beat(1)
    yield instrument('E4', 1)
    yield beat(1)

    // 4
    yield instrument('C4', 1)
    yield beat(1)
    yield instrument('A3', 1)
    yield beat(1)
    yield instrument('A3', 1.5)
    yield beat(1.5)
  },

  function *track2 (): Audio {
    const instrument = square

    function *loop (p1: Note, p2: Note, times: number): Audio {
      for (let i = 0; i < times; i++) {
        yield instrument(p1, 1/2)
        yield beat(1/2)
        yield instrument(p2, 1/2)
        yield beat(1/2)
      }
    }

    for (const sound of [
      // 1
      ...loop('E1', 'E2', 4),

      // 2
      ...loop('A1', 'A2', 4),

      // 3
      ...loop('G1', 'G2', 2),
      ...loop('E1', 'E2', 2),

      // 4
      ...loop('A1', 'A2', 4),

      // // 5
      // ...loop('D1', 'D2', 4),
      
      // // 6
      // ...loop('C1', 'C2', 4),
      
      // // 7
      // ...loop('G1', 'G2', 2),
      // ...loop('E1', 'E2', 2),

      // // 8
      // ...loop('A1', 'A2', 4),
    ]) yield sound
  },
]
