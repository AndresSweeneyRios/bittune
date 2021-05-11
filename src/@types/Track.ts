import {
  Player, 
} from "../player"

export type Audio = Generator<((player: Player) => number[]) | number, void, unknown>

export type Track = () => Audio
