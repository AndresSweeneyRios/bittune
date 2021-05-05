import { 
  arp,
} from "./compositions/arp"
import {
  initPlayer,
} from "../../src"

initPlayer({
  tempo: 100,
}).playComposition(arp)
