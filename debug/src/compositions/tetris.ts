import {
  Audio,
  Note,
  Track,
  square,
  triangle,
  pulse,
  saw,
} from '../../../src'

export const tetris: Track[] = [
  function *track1 (): Audio {
    const instrument = pulse(5/6)

    // 1
    yield instrument('E4', 1)
    yield 1
    yield instrument('B3', 1/2)
    yield 1/2
    yield instrument('C4', 1/2)
    yield 1/2
    yield instrument('D4', 1)
    yield 1
    yield instrument('C4', 1/2)
    yield 1/2
    yield instrument('B3', 1/2)
    yield 1/2

    // 2
    yield instrument('A3', 3/2)
    yield 3/2
    yield instrument('C4', 1/2)
    yield 1/2
    yield instrument('E4', 1)
    yield 1
    yield instrument('D4', 1/2)
    yield 1/2
    yield instrument('C4', 1/2)
    yield 1/2

    //  3
    yield instrument('B3', 3/2)
    yield 3/2
    yield instrument('C4', 1/2)
    yield 1/2
    yield instrument('D4', 1)
    yield 1
    yield instrument('E4', 1)
    yield 1

    // 4
    yield instrument('C4', 1)
    yield 1
    yield instrument('A3', 1)
    yield 1
    yield instrument('A3', 3/2)
    yield 5/2

    // 5
    yield instrument('D4', 3/2)
    yield 3/2
    yield instrument('F4', 1/2)
    yield 1/2
    yield instrument('A4', 1)
    yield 1
    yield instrument('G4', 1/2)
    yield 1/2
    yield instrument('F4', 1/2)
    yield 1/2

    // 6
    yield instrument('E4', 3/2)
    yield 3/2
    yield instrument('C4', 1/2)
    yield 1/2
    yield instrument('E4', 1)
    yield 1
    yield instrument('D4', 1/2)
    yield 1/2
    yield instrument('C4', 1/2)
    yield 1/2

    //  7
    yield instrument('B3', 3/2)
    yield 3/2
    yield instrument('C4', 1/2)
    yield 1/2
    yield instrument('D4', 1)
    yield 1
    yield instrument('E4', 1)
    yield 1

    // 8
    yield instrument('C4', 1)
    yield 1
    yield instrument('A3', 1)
    yield 1
    yield instrument('A3', 3/2)
    yield 3/2
  },

  function *track2 (): Audio {
    const instrument = triangle

    function *loop (p1: Note, p2: Note, times: number): Audio {
      for (let i = 0; i < times; i++) {
        yield instrument(p1, 1/2)
        yield 1/2
        yield instrument(p2, 1/2)
        yield 1/2
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

      // 5
      ...loop('D1', 'D2', 4),
      
      // 6
      ...loop('C1', 'C2', 4),
      
      // 7
      ...loop('G1', 'G2', 2),
      ...loop('E1', 'E2', 2),

      // 8
      ...loop('A1', 'A2', 2),
    ]) yield sound

    yield instrument('A1', 1)
    yield 1
  },
]
