import { 
  arp,
} from "../../src/compositions/arp"
import {
  initPlayer,
} from "../../src/player"

initPlayer({
  tempo: 100,
}).playComposition(arp)
