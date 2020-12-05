export type Audio = Generator<() => Promise<void> | Float32Array, void, unknown>
export type Track = () => Audio
