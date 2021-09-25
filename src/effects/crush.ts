export const crush = (buffer: number[], Q: number) => {
  const high = 1 / Math.max(...buffer)

  return buffer.map(V => Math.round(V * high / Q) * Q / high)
}
