export type Audio = Generator<() => Promise<void> | Float32Array, void, unknown>
export type Track = (helpers: {
  beat: (beats: number) => () => Promise<void>
}) => Audio
