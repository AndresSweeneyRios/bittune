import {
  player,
} from '../player'

export const beat = (beats: number) => (): Promise<void> => new Promise(resolve => {
  setTimeout(resolve, 1000 * (beats / (player.tempo / 60)))
})
